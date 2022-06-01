pipeline{
    agent any
    stages{
        stage("Build"){
            steps{
                nodejs('Node_16_15_0') {
                    sh "npm install"
                    sh 'npm run build'
                }
                archiveArtifacts artifacts: '**/build/', followSymlinks: false
                cleanWs()
            }
        }
    }
}