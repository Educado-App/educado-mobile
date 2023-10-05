import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import CourseScreen from './screens/courses/CourseScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import ProfileComponent from './screens/profile/Profile';
import LoginScreen from './screens/login/Login';
import RegisterScreen from './screens/register/Register';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import RightAnswerScreen from './screens/excercise/RightAnswerScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExerciseScreen from './screens/excercise/ExerciseScreen';
import WrongAnswerComponent from './screens/excercise/WrongAnswerScreen';
import Explore from './screens/explore/Explore';
import { TailwindProvider } from 'tailwindcss-react-native';
import ErrorScreen from './screens/errors/ErrorScreen';
import SectionCompleteScreen from './screens/excercise/SectionCompleteScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isFontsLoaded } from './constants/Fonts';
import NavBar from './components/navBar/NavBar'; // Import the NavBar component

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const checkLogin = () => {
  if (AsyncStorage.getItem("@login_token") === null) {
    useNavigation().navigate('Login');
  }
}

function CourseStack() {
  checkLogin();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Course"
        component={CourseScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WrongAnswer"
        component={WrongAnswerComponent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RightAnswer"
        component={RightAnswerScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SectionComplete"
        component={SectionCompleteScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
function LoginStack() {
  return (
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

// Change InitialRouteName to HomeStack if you want to skip Login Screen
export default function App() {
  return (

    <TailwindProvider>
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={'HomeStack'}>
              <Stack.Screen
                name={'LoginStack'}
                component={LoginStack}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={'HomeStack'}
                component={NavBar} // Use the NavBar component here
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    </TailwindProvider>
  ) ; null;
}
