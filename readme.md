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
- Open the directory eml in terminal
- Write and run the following in the terminal:
  ```
  npm start
  ```
- When given a QR code and some options like -a for android, -r for restart: press "a"
- Wait until the app starts on the device

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

