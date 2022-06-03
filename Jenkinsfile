def build="fail"

pipeline{
    agent any
    environment { 
        registry = "shashi100/todoapp" 
        registryCredential = 'dockerhub_id' 
        dockerImage = '' 
    }

    stages{

        stage("Sonarcube Analysis"){
            steps{
                nodejs('Node_16_15_0'){
                    sh "npm install"
                    withSonarQubeEnv("sonar"){
                        sh "npm install sonar-scanner"
                        sh "npm run sonar"
                    }
                }
            }
        }

        stage("Build Project"){
            steps{
                nodejs('Node_16_15_0') {
                    sh "npm install"
                    sh 'npm run build'
                }
                archiveArtifacts artifacts: 'build/', followSymlinks: false
            }
            post{
                success{
                    script{
                        env.build = "success"
                    }

                }
            }
        }

        stage("Build Docker Image"){
            when{
                expression{
                    env.build == "success"
                }
            }
            steps{
                    script { 
                    dockerImage = docker.build registry + ":latest" 
                    sh "echo ${env.build} helllo"
                }
            }
        }

        stage("Publish Image on Dockerhub"){
            when{
                expression{
                    env.build == "success"
                }
            }
            steps{
                script { 
                    docker.withRegistry( '', registryCredential ) { 
                        dockerImage.push() 
                    }
                } 
            }
            
        }

        stage("Deploy on Staging Server"){
            agent{
                label 'staging'
            }
            when{
                expression{
                    env.build == "success"
                }
            }
            steps{
                sh "sudo docker stack deploy --compose-file docker-compose.yml appstack"
            }
            
        }

        stage("Deploy on the Production Server"){
            agent{
                label "prod"
            }
            when{
                expression{
                    env.build == "success"
                }
            }
            input{
                message "Do you want to proceed for production deployment?"
            }
            steps{
                sh "sudo docker stack deploy --compose-file docker-compose.yml appstack"
            }
            cleanWs()

        }

    }
}