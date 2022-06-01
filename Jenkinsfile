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
                    sh "scp /build staging_server@174.129.120.240"
                }
            }
        }
    }
}