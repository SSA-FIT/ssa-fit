pipeline {
  agent any
  stages {
    stage('Prepare') {
      steps {
        git(url: 'https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22A104.git', branch: 'backend', credentialsId: 'gitlab_id')
      }
    }

  }
}