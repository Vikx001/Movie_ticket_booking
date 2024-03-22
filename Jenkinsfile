def stages = [
    'admin_frontend',
    'backend/gateway',
    'backend/users',
    'backend/customers',
    'backend/courses',
    'backend/enrollment',
    'frontend/studio_ghibli'
]

pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'aneeshrp' // Replace with your DockerHub username
        //SONAR_HOST = 'your_sonarqube_server_url' // Replace with your SonarQube server URL (if using)
        //SONAR_PROJECT_KEY = '<project_key_for_admin_frontend>' // Replace with appropriate project keys
        // Define project keys for other backend/frontend services if using SonarQube
    }

    tools {
        docker "docker" // Assuming Docker is installed and available on the Jenkins machine
    }

    stages {
        for (stage in stages) {
            stage(stage) {
                steps {
                    script {
                        // Checkout the Git repository
                        git branch: 'development', // Adjust if using a different branch
                           credentialsId: 'fb103d21-0302-4a4d-969d-f3dec615847c', // Replace with your Git credentials ID if needed
                           url: 'https://github.com/Vikx001/Studio-Ghibli.git' // Replace with your repository details

                        // Build Docker image with proper naming convention
                        def imageName = "${DOCKER_REGISTRY}/${stage}:latest"
                        docker.build(imageName: imageName, dockerfile: "${stage}/Dockerfiles/Dockerfile")

                        // Run SonarQube analysis (optional)
                        // if (env.SONAR_HOST) {
                        //     sh "sonar-scanner -Dproject.key=${env.SONAR_PROJECT_KEY} -Dsonar.host.url=${env.SONAR_HOST}"
                        // }

                        // Push Docker image to DockerHub
                        docker.push(imageName)
                    }
                }
            }
        }
    }
}
