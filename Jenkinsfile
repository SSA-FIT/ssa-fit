pipeline {
  agent any
  stages {
    stage('Prepare') {

      steps {

      echo 'Clonning Repository'
        
        git(url: 'https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22A104.git', branch: 'backend', credentialsId: 'gitlab_id')
      
      }

      post {
        success {
          echo 'Successfully Pulled Repository'
        }
      }
    }

    stage('Build backend') {
      steps {
        dir('/var/lib/jenkins/workspace/ssafit-backend/backend/spring'){
          sh 'chmod +x gradlew'
          sh './gradlew init'
          sh './gradlew clean'
          sh './gradlew build --exclude-task test'
        }
        
      }

      post {
        success {
          echo 'Successfully Building spring'
        }

        failure {
          echo 'Failed Building backend'
        }
      }
    }

    stage('Deploy backend') {
      steps {

        dir('/var/lib/jenkins/workspace/ssafit-backend/backend/spring/build/libs'){
          sh 'nohup java -jar spring-0.0.1-SNAPSHOT.jar &'
          //sh 'exit'
        }

        //dir('/var/lib/jenkins/workspace/ssafit-backend/backend/spring'){

        //  sh 'docker build --tag=ssafit-backend .'
        //  sh 'docker rm -f $(docker ps -a --filter "name=ssafit-backend" -q)'
        //  sh 'docker run -d --name ssafit-backend -p 8081:8081 -v /var/webapps/upload/:/var/webapps/upload/ ssafit-backend:latest'
          //sh 'exit'
        //}        
      }

      post {
        success {
          echo 'Successfully Deploying spring'
          //sh 'exit'
        }

        failure {
          echo 'Failed Deploying backend'
        }
      }
    }

  }
}
