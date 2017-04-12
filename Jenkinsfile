pipeline {
  agent any

  parameters {
    choice(
      // choices are a string of newline separated values
      // https://issues.jenkins-ci.org/browse/JENKINS-41180
      choices: 'dev\ntest\nlive',
      description: 'The stage to deploy to.',
      name: 'deploy_stage'
    )
    choice(
      // choices are a string of newline separated values
      // https://issues.jenkins-ci.org/browse/JENKINS-41180
      choices: 'point\nminor',
      description: 'Increment the minor release or the point release',
      name: 'version_incr'
    )
  }

  stages {
    stage('prebuild') {
      steps {
        echo 'In the pre-build step. Install dependencies, run pre-build tests, etc. here.'
      }
    }
    stage('dev') {
      when {
        expression { params.deploy_stage == 'dev' }
      }
      steps {
        sh 'echo $HOME'
        echo 'In the dev build step.'
        // sh "serverless deploy --stage devs"
      }
    }
    stage('test') {
      when {
        expression { params.deploy_stage == 'test' }
      }
      steps {
        echo 'In the test build step.'
        sh "./build/testCaller.sh test ${params.version_incr}"
        // From https://jenkins.io/doc/pipeline/steps/ssh-agent/
        sshagent (credentials: ['GVT Robot']) {
          sh 'git push --tags'
        }
        // sh "serverless deploy --stage testing"
      }
    }
    stage('live') {
      when {
        expression { params.deploy_stage == 'live' }
      }
      steps {
        echo 'In the live build step.'
        // sh "serverless deploy --stage living"
      }
    }
  }
  post {
    success {
      slackSend (color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' ")
    }

    failure {
      slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }

    always {
       slackSend (color: '#00FF00', message: "COMPLETE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }
  }

}