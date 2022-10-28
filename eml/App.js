import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import CourseScreen from '../eml/screens/Courses/CourseScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/themed'
import ProfileComponent from './screens/Profile/Profile'
import LoginScreen from './screens/Login/Login';
import RegisterScreen from "./screens/Register/Register";

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SessionScreen from './screens/excercise/ExerciseScreen'
import WrongAnswerComponent from './screens/excercise/WrongAnswerScreen'
import Explore from './screens/explore/Explore'

const Tab = createBottomTabNavigator();
const CourseStack = createNativeStackNavigator();

function CourseStackNavigator() {
  return (
    <CourseStack.Navigator>
      <CourseStack.Screen
        name="Course"
        component={CourseScreen}
        options={{
          headerShown: false
        }}
      />
      <CourseStack.Screen
        name="Exercise"
        component={SessionScreen}
        options={{
          headerShown: false
        }}
      />
      <CourseStack.Screen
        name="WrongAnswer"
        component={WrongAnswerComponent}
        options={{
          headerShown: false
        }}
      />
      <CourseStack.Screen
        name="Explore"
        component={Explore}
        options={{
          headerShown: false
        }}
      />
      <CourseStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
            headerShown: false
        }}
      />
      <CourseStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
            headerShown: false
        }}
      />
    </CourseStack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={CourseStackNavigator}
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
    </NavigationContainer>
  )
}
