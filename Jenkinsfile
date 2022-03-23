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

/**
      agent {
        docker {
          image 'ssafit:latest'
        }
      }
*/
      steps {
        dir('./spring'){
          // sh 'chmod +x gradlew'
          // sh './gradlew build'
          sh 'gradlew.bat build'
          sh 'cd build/libs/java -jar spring-0.0.1-SNAPSHOT.jar'
          // sh 'docker build --tag=ssafit .'
          // sh 'docker rm -f $(docker ps -a --filter "name=ssafit" -q)'
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

  }
}
