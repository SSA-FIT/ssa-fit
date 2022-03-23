pipeline {
  agent any
  stages {
    stage('Prepare') {
      steps {
        git(url: 'https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22A104.git', branch: 'backend', credentialsId: 'gitlab_id')
      }
    }
/**
    stage('Build') {
      steps {
        sh cd /var/lib/jenkins/workspace/ssafit-backend/backend/spring/
        sh 'chmod +x gradlew'
        sh ./gradlew build
        sh docker build --tag=ssafit .
        sh docker rm -f $(docker ps -a --filter "name=ssafit" -q)
      }  
    }
*/
  }
}
