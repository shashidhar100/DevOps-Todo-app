pipeline{
    agent none
    stages{
        stage("Build"){
            steps{
                nodejs('Node_16_15_0') {
                    npm run build
                }
                archiveArtifacts artifacts: '**/build/*', followSymlinks: false
                cleanWs()
            }
        }
    }
}