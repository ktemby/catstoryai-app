## Build System Expo EAS
Using Expo EAS for as much as possible. For regular dev, just use expo and launch via expo in the simulator.

    npx expo start -c

#### iOS Binaries
To create an actual iOS binary, use the iOS preview build (creates a local build and gives the option to install on the simulator).

    eas build -p ios --profile preview

#### iOS Submission to Testflight
Once the preview binary looks good, create the prod binary and send it to testflight (requires login to the org account, may implement CICD for this later as a git Workflow).

    eas build --platform ios
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
