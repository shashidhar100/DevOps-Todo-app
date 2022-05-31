pipeline{
    agent any
    stages{
        stage("Build"){
            steps{
                nodejs('Node_16_15_0') {
                }
                sh pwd
                cleanWs()
            }
        }
    }
}