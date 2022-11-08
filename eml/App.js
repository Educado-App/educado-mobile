import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import CourseScreen from './screens/courses/CourseScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/themed'
import ProfileComponent from './screens/profile/Profile'
import LoginScreen from './screens/login/Login';
import RegisterScreen from "./screens/register/Register";

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SessionScreen from './screens/excercise/ExerciseScreen'
import WrongAnswerComponent from './screens/excercise/WrongAnswerScreen'
import Explore from './screens/explore/Explore'
import TestScreen from "./screens/test/TestScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CourseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Course"
        component={CourseScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Exercise"
        component={SessionScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="WrongAnswer"
        component={WrongAnswerComponent}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

function LoginStack(){
    return(
        <Stack.Navigator initialRouteName={"Login"}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

function HomeStack(){
    return(
        <Tab.Navigator initialRouteName={"Home"}>
            <Tab.Screen
                name="Home"
                component={CourseStack}
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
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileComponent}
                options={{
                    headerShown: false,
                    tabBarIcon: () => {
                        return (
                            <Icon
                                size={30}
                                name="account-circle"
                                type="material-community"
                                color="black"
                            />
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Explore"
                component={Explore}
                options={{
                    headerShown: false,
                    tabBarIcon: () => {
                        return (
                            <Icon
                                size={30}
                                name="magnify"
                                type="material-community"
                                color="black"
                            />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

//Change InitialRouteName to HomeStack if you want to skip Login Screen

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={"TestScreen"}>
            <Stack.Screen name={"TestScreen"} component={TestScreen} options={{headerShown: false}}/>
            <Stack.Screen name={"LoginStack"} component={LoginStack} options={{headerShown: false}}/>
            <Stack.Screen name={"HomeStack"} component={HomeStack} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}
