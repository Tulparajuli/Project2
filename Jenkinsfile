node('master'){
    stage('Import'){
        try{
            git url: 'https://github.com/Psteinhart/Project2.git'
           slackSend message:"started ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)", color:'danger'

        } catch (error){
            //SlackSend message: color:'danger'
        }
    }
    stage('Build'){
        try{
            // dir('Chatbot'){
            //     bat 'nuget restore'
            //     //bat 'msbuild /t:clean,build JenkinsMVC.csproj'
            //     bat 'dotnet build'
                
            //     //for angular
            //     dir('Chatbot.AngularClient'){//folder name
            //         bat 'npm install'
            //         bat 'ng build'
            //     }
            // }

        } catch(error){
             //SlackSend message: color:'danger'
        }
    }

    stage ('Analyze'){
        try{
            //  dir('Chatbot'){
            //     bat 'C:\\Tools\\SonarQube\\SonarQube.Scanner.MSBuild.exe begin /k:jkinsmvc'
            //     //bat 'msbuild /t:build JenkinsMVC.csproj'
            //     bat 'dotnet build'
            //     bat 'C:\\Tools\\SonarQube\\SonarQube.Scanner.MSBuild.exe end'
            // }
            
            //                 //for angular
            //     dir('Chatbot/Chatbot.AngularClient'){//angular folder
            //     bat 'C:\\Tools\\SonarQube\\sonar-scanner-3.0.3.778\\lib\\sonar-scanner-cli-3.0.3.778.jar /k:angular'//have to have new key
            //     }


        } catch(error){
             //SlackSend message: color:'danger'
        }
    }

    stage('Test'){
        try{
            // dir('JenkinsMVC.Test')
            // {
            //     bat 'dotnet restore'
            //     bat 'msbuild /t:build JenkinsMVC.Test.csproj'
            //     bat 'dotnet test'
            // }
            
            //angular
           // dir('Chatbot/Chatbot.AngularClient')
            //{
             //   bat 'ng test'
            //}

        } catch(error){
             //SlackSend message: color:'danger'
        }
    }

    stage('Package'){
        try{
            // dir('JenkinsMVC')
            // {
            //     bat 'dotnet publish JenkinsMVC.csproj --output ../Package'
            //     //bat 'msbuild /t:pack JenkinsMVC.csproj'
            // }
            
            dir('Chatbot/Chatbot.AngularClient')//angular folder
            {
               
				bat 'ng build --base-href /Chatbot.AngularClient/'
				bat 'copy /y ..\\..\\web.config dist'
			
            }

        } catch(error){
             //SlackSend message: color:'danger'
        }
    }

    stage('Deploy'){
        try{
            bat 'dotnet build ./JenkinsMVC/JenkinsMVC.csproj /p:DeployOnBuild=true /p:PublishProfile=publish'
			bat '"C:\\Program Files (x86)\\IIS\\Microsoft Web Deploy V3\\msdeploy.exe" -verb:sync -source:iisapp="C:\\Program Files (x86)\\Jenkins\\workspace\\Jenkinops\\Chatbot\\Chatbot.angularClient\\dist" -dest:iisapp="Default Web Site/Spotbot",wmsvc=ec2-54-152-165-243.compute-1.amazonaws.com,username=Administrator,password=Pizza1234 -allowUntrusted -enableRule:AppOffline"'
    } catch(error) {
      //slackSend message: color:'danger'
    }
  }
}

