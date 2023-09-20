import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
import TestScreen from './screens/test/TestScreen';
import ErrorScreen from './screens/errors/ErrorScreen';
import SectionCompleteScreen from './screens/excercise/SectionCompleteScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CourseStack() {
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
function HomeStack() {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarActiveBackgroundColor: '#5ECCE9',
        tabBarStyle: { backgroundColor: 'hsl(0, 0%, 92%)' }, //Oneplus menubar color
      }}
    >
      <Tab.Screen
        //Home
        
        name="Casa"
        component={CourseStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            // Define the active and inactive colors for the icon
            const iconColor = focused ? 'white' : 'gray';

            return (
              <Icon
                size={20}
                name="home-outline"
                type="material-community"
                color={iconColor}
              />
            );
          },
        }}
      />
      <Tab.Screen
      // Explore
        name="Explorar"
        component={Explore}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            // Define the active and inactive colors for the icon
            const iconColor = focused ? 'white' : 'gray';

            return (
              <Icon
                size={20}
                name="compass-outline"
                type="material-community"
                color={iconColor}
              />
            );
          },
        }}
      />
      <Tab.Screen
        //Perfil
        name="Perfil"
        component={ProfileComponent}
        options={{
          headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              // Define the active and inactive colors for the icon
              const iconColor = focused ? 'white' : 'gray';
  
              return (
                <Icon
                  size={20}
                  name="account-circle"
                  type="material-community"
                  color={iconColor}
                />
              );
          },
        }}
      />
      {/*       <Tab.Screen
        name="TestScreen"
        component={TestScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <Icon
                size={30}
                name="home"
                type="material-community"
                color="black"
              />
            );
          },
        }}
      /> */}
    </Tab.Navigator>
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
                component={HomeStack}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    </TailwindProvider>
  );
}
