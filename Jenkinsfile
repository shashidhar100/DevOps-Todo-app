pipeline{
    agent any
    environment { 
3
        registry = "shashi100/todoapp" 
4
        registryCredential = 'dockerhub_id' 
5
        dockerImage = '' 
6
    }

    stages{
        stage("Build"){
            steps{
                cleanWs()
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
                    dockerImage = docker.build registry + ":$BUILD_NUMBER" 
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

    }
}