# Styling Guide
A short read me about how to use the styles in this project

## NativeWind 
NativeWind comes with a default theme where most css is embedded. The theme is located in tailwind.config.js and it is extended so it has the styleguide's properties. For example, the colors has been added with the same name as in the styleguide:
```javascript
theme: {
      colors: {
        primary: '#5ECCE9',
        secondary: '#C9E5EC',
        white: '#FFFFFF',
        black: '#383838',
        gray: '#A1ACB2',
        error: '#CF6679',
        success: '#00897B',
        disable: '#4AA04A',
        disabled: '#E4F2F5',
        red: '#FFE4E4',
        green: '#E4F1E4',
      },
```
To use a color on a JSX element, then use 
```javascript
className="bg-primary" 
```
instead of 
```javascript
styles={}
```
The syntax for the css elements can be found on https://www.nativewind.dev/, and tip: add the extension Tailwind CSS IntelliSense to VSC.
Also, NativeWind properties are only available in the specified locations in this section of the config file:
```javascript
content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
```
so if more locations are needed, add them here.

## Fonts
In the file constants/Fonts.js, a function is created to import the font which has to called in every file (ideally only once) where it is used. 

Quick guide:
Import the Fonts.js file
```javascript
import { isFontsLoaded } from "../../constants/Fonts.js";
```
Then use the function (nice to do this in an if-statement)
```javascript
if (!isFontsLoaded) {
    return null;
}
```
If there is an error then try to install the library
```javascript
npx expo install expo-font
```

## Background Linear Gradient
The primary background has been created by using the library expo-linear-gradient. It is placed in the file constants/BgLinearGradient.js and it is imported with:
```javascript
import { BgLinearGradient } from "../../constants/BgLinearGradient";
```
The background takes the parameter children, so it is possible to place JSX elements inside it
```javascript
<BgLinearGradient>
    <SafeAreaView>
        <Text>Example</Text>
    </SafeAreaView>
</BgLinearGradient>
```
Also side note, please use SafeAreaView instead of View since it displays within safe areas of the device like rounded corners etc.

## Merging
If pull request is weird on github web, then use 
```git
git merge styling
```
while standing on the branch, you want to merge styling into.