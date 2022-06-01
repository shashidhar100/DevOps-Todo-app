pipeline{
    agent any
    stages{
        stage("Build"){
            steps{
                nodejs('Node_16_15_0') {
                    sh "npm install"
                    sh 'npm run build'
                }
                archiveArtifacts artifacts: 'build/', followSymlinks: false
                cleanWs()
            }
            post{
                success{
                    copyArtifacts filter: 'build/', fingerprintArtifacts: true, projectName: env.JOB_NAME, selector: specific(env.BUILD_NUMBER)
                    sh "scp -r build/ staging_server@174.129.120.240:"
                }
            }
        }

        stage("Build Image"){
            steps{
                    script{
                        dockerImage = docker.build "appserver" + ":$BUILD_NUMBER"
                    }
            }
        }


    }
}