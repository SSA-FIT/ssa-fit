pipeline {
  agent any
  stages {
    stage('Prepare') {
      steps {
        git(url: 'https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22A104.git', branch: 'backend', credentialsId: 'gitlab_id')
      }
    }

    stage('Build') {
      steps {
        dir('./backend/spring') {
        }
      }

      steps {
        sh 'chmod +x gradlew'
      }

      steps {
        sh ./gradlew build
      }
        
      steps {
        sh docker build --tag=ssafit .
      }

      steps {
        sh docker rm -f $(docker ps -a --filter "name=ssafit" -q)
      }
    }
  }
}
