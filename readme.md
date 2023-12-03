# Readme 


## Getting Started

### Mac
**Recommended: using android studio for emulator**
*Since the app is designed for android, using an android emulator is strongly recommended*

- Download android studio
- On the welcome page, click on the three dots in the right corner, and then click "Virtual device manager"
- A new screen will open, click on "Create device"
- Chose the phone model you want, click next, chose an API level that is minimum 33 (Tiramisu is recommended), click on next and then finish.
- Now the phone you created is on your device manager, click on the play symbol (launch this AVD in the emulator)

- You can now go back to your project in VS and open the root of the project (eml)
- Run the following in the terminal: 
```
npm i
```
```
expo start
```
- Now press "a" to launch the android emulator when prompted
- Wait for the emulator to start (this can take a lot of time)
- Press "r" to restart, sometimes this is a good idea if the app won’t bundle. 


**Alternative: using xcode for IOS emulato**
*Since the app is designed for android, this is not recommended*

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

### Use own phone as emulator with Expo Go (Android)
- Go to your phones system settings and find the "About device" button and press it.
<img src="https://github.com/Educado-App/educado-mobile/assets/100210077/c54c651b-8f2a-45cc-86ff-0e5191ca7e7d" width="250">

- In "About device" find the "build-number", the location can vary from phone to phone, it can be under "Version"
<img src="https://github.com/Educado-App/educado-mobile/assets/100210077/1ec176c8-226e-4b28-8131-5d0006019896" width="250">

- When you have located the "build-number" press it 7-10 times and you should get a message that you have unlocked dev mode.
<img src="https://github.com/Educado-App/educado-mobile/assets/100210077/48f2e0cd-4f00-4a32-932f-6e65bc282483" width="250">

- Now you should be able to find "developer options" somewhere in your settings, again this can vary, it could be under "Additional settings".
<img src="https://github.com/Educado-App/educado-mobile/assets/100210077/d9ed6bbb-88d1-46f5-ad3b-7192f6fe21ab" width="250">
<img src="https://github.com/Educado-App/educado-mobile/assets/100210077/eebde1a7-3ae6-48fa-914a-8b80e89999b2" width="250">

- When you have found the "developer settings" you have to find and enable "USB Debugging".
<img src="https://github.com/Educado-App/educado-mobile/assets/100210077/84c02c79-72f1-4073-a39c-491a9e841fb5" width="250">

- Now your phone can download files and/or apps properly through USB.
- Connect your phone to your computer through USB and you should get a notification on your phone, select file transfer on the notification.
- Now you open educado-mobile on your IDE and run it as usual with "npm start".
- When you get the QR-code and other options press "shift+a" to view all available android devices.
- Select your own device and it should begin downloading the Expo Go app on your phone.
- When it has been downloaded, you should go and stop the Expo Go app from trying to update to avoid future issues, here is a link on how: (https://www.makeuseof.com/disable-auto-update-android-apps/)
- With the app downloaded you can turn off the USB debugging option if you want, but you should be ready to use your own phone wirelessly as an emulator with Expo Go.
- To use your phone wirelessly you have to be on the same wifi/internet as your computer and scan the QR code with the Expo Go app when you run your code.

## Images

<img src="https://github.com/Educado-App/educado-mobile/assets/94057594/b1d8231d-e038-4f58-b67d-472f66c2f019" width="250">
<img src="https://github.com/Educado-App/educado-mobile/assets/94057594/9fac55c8-21a1-4bd0-8d7e-a45b96b222c2" width="250">
<img src="https://github.com/Educado-App/educado-mobile/assets/94057594/1454a49f-5ac2-4849-91e8-0f5b8c6800e2" width="250">
<img src="https://github.com/Educado-App/educado-mobile/assets/94057594/2e5809a4-2612-4fa1-918a-f83d9badb511" width="250">
<img src="https://github.com/Educado-App/educado-mobile/assets/94057594/7387da95-1a24-4e50-86f1-e2c51ad7745e" width="250">
<img src="https://github.com/Educado-App/educado-mobile/assets/94057594/a7bc5655-44c6-4d73-9d01-18f1e1332fa2" width="250">
<img src="https://github.com/Educado-App/educado-mobile/assets/94057594/ce70dd3d-7a5d-410c-ac27-609a774df2d0" width="250">











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

