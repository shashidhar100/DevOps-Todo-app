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
                    copyArtifacts filter: 'build/', fingerprintArtifacts: true, projectName: env.JOB_NAME, selector: specific(env.BUILD_NUMBER)
                    sh "scp -r build/ staging_server@3.228.80.13:"
                }
            }
        }

        stage("Build Image"){
            steps{
                    script { 
                    dockerImage = docker.build registry + ":latest" 
                }
            }
        }

        stage("Publish Image"){
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
            steps{
                sh "sudo docker swarm init"
                sh "sudo docker stack deploy --compose-file docker-compose.yml appstack"
            }
            
        }

    }
}