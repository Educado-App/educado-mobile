# Readme 


## Getting Started

### Mac
- Download Xcode and run it once (make sure to select and install the iPhone emulator if prompted during installation)
- Open the repository in your editor (all of the commands below should be executed in the root folder)
- Run the following in the terminal: 
```
sudo npm install expo-cli
```
- Run the following in the terminal:
```
expo start
```
- You will be prompted if you have any missing/outdated packages. In this case, follow the instructions in the terminal
- Run: "expo start" and press "i" to launch the iOS emulator when prompted
- Wait for the emulator to start

[MAC FIX: IF XCODE IS INSTALLED BUT IS NOT SEEN BY THE APP]
- Run the following in the terminal: "sudo xcode-select -s /Applications/Xcode.app/Contents/Developer"

### Windows
- Download and install Android Studio following this guide (https://docs.expo.dev/workflow/android-studio-emulator/)
- Open Environment Variable settings in Windows
- Find the "Path" variable under system variables and click edit, then add "C:\Users\<your_username_here>\AppData\Local\Android\Sdk\platform-tools"
- Clone the educado-mobile repo from github
- Make sure the educado-backend is running, to use functionalities (eg. logging in)
- in `eml/api/userApi.js` and `eml/api/api.js` remember to change the urls to your local IP when testing. eg:
```javascript

const url = 'http://172.30.245.212:8888'; // change to lcd ip when testing
const certificateUrl = 'http://172.30.245.212:8080';

```
- Open the directory eml in terminal
- Write and run the following in the terminal:
  ```
  npm start
  ```
- When given a QR code and some options like -a for android, -r for restart: press "a"
- Wait until the app starts on the device
- If you receive errors, make sure to run `npm i` to install missing dependencies and try running again

## Images

<img src="https://github.com/Educado-App/educado-mobile/assets/92527083/6d6b4714-c7f2-43eb-9987-045d9e1c85d7" width="250">
<img src="https://github.com/Educado-App/educado-mobile/assets/92527083/3fac1c6a-7b73-409e-9e6e-de6ece72f7b3" width="250">
<img src="https://github.com/Educado-App/educado-mobile/assets/92527083/54b25a6e-6c97-4e4d-ac66-a68e9ed77c25" width="250">
<img src="https://github.com/Educado-App/educado-mobile/assets/92527083/a2880c10-b22b-45ea-9943-6a85d82de002" width="250">
<img src="https://github.com/Educado-App/educado-mobile/assets/92527083/b681ade2-32e5-46c0-9796-113367414d53" width="250">
<img src="https://github.com/Educado-App/educado-mobile/assets/92527083/b3995d0e-90d9-42b5-be12-21f6e820f59a" width="250">


## Development notes


### Linking course with content 


Course:
- page with sectioncontainers
sectioncontainers:
- when clicked, direct to section.js page with section param
section:
- on render, getAllComponents from api 
- until finished just render dummy text component 
- when finished, save length of components array to create progression flow
- render section.tite in top left of screen

