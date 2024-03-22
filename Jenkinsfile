pipeline {
    agent any
    
    stages {
        stage('Build and Test') {
            steps {
                // Iterate over folders and build Docker images
                script {
                    def folders = ['admin_frontend', 'backend/gateway', 'backend/users', 'backend/customers', 'backend/courses', 'backend/enrollment', 'frontend']
                    for (folder in folders) {
                        // Build Docker image
                        sh "docker build -f ./${folder}/Dockerfiles/Dockerfile -t aneeshrp/${folder}:latest"
                        // Run SonarQube analysis
                        // Example:
                        sh "sonar-scanner -Dsonar.projectKey=${folder} -Dsonar.sources=./${folder}"
                    }
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    def folders = ['admin_frontend', 'backend/gateway', 'backend/users', 'backend/customers', 'backend/courses', 'backend/enrollment', 'frontend']
                    for (folder in folders) {
                        // Push Docker image to Docker Hub
                        sh "docker push your-dockerhub-username/${folder}:latest"
                    }
                }
            }
        }
    }
}
