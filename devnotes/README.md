## Build System Expo EAS
Using Expo EAS for as much as possible. For regular dev, just use expo and launch via expo in the simulator.

    npx expo start -c

#### iOS Binaries
To create an actual iOS binary, use the iOS preview build (creates a local build and gives the option to install on the simulator).

    eas build -p ios --profile preview

#### iOS Builds and Submission to Testflight
Once the preview binary looks good, create the prod binary and send it to testflight (requires login to the org account, may implement CICD for this later as a git Workflow).

    eas build --platform ios
    
Note - annoyingly EAS Expo servers are usually overloaded and fail to build during the day - so we can build locally instead. Requires some basic installs 
    brew install cocoapods
    brew install fastlane
    
Now we can build local:

    eas build --platform ios --local
    
#### Finally, submitting to Apple:    
    
    eas submit -p ios   

### Feature dev and Git cheatsheet

Feature development should be on branches. To start a new feature, first checkout main, then make a branch. Some useful commands:

Checking local state

    git status
    git branch

    git switch <branch e.g., main>

New feature branches:

    git checkout -b <feature-branch-name>
    git commit -m '<what the code changes message>'     
    git push origin <feature-branch-name>

Returning to a remote branch:

    git fetch
    git checkout -t <feature-branch-name>
    
    
After merge, delete it

    git branch -d <featre-branch-name>
    
    


# Android (nightmares)

Need to download a JDK to be able to build locally. I used Amazon Coretto (OpenJDK) https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/macos-install.html Check with

    java -version
    
If it's not showing the latest version, add it to the shell rc (e.g., ~/.zshrc), also need ANDROID_HOME

    export JAVA_HOME=/Library/Java/JavaVirtualMachines/amazon-corretto-17.jdk/Contents/Home
    export ANDROID_HOME=$HOME/Library/Android/sdk
    
Run the build locally

    eas build -p android --local
