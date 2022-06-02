def build="fail"

pipeline{
    agent any
    environment { 
        registry = "shashi100/todoapp" 
        registryCredential = 'dockerhub_id' 
        dockerImage = '' 
    }

    stages{
        stage("Build"){
            steps{
                // cleanWs()
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

        stage("Build Image"){
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

        stage("Publish Image"){
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

        stage("Orchestration"){
            agent{
                label 'staging'
            }
            when{
                expression{
                    env.build == "success"
                }
            }
            steps{
                // sh "sudo docker swarm init"
                sh "sudo docker stack deploy --compose-file docker-compose.yml appstack"
            }
            
        }

    }
}