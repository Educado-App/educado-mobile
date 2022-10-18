import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import WrongAnswerComponent from './screens/Session/WrongAnswerScreen'
import CourseScreen from '../eml/screens/Courses/CourseScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/themed'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SessionScreen from '../eml/screens/Session/SessionScreen'
const Tab = createBottomTabNavigator()

const CourseStack = createNativeStackNavigator()

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
          component={WrongAnswerComponent}
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
        {/*         <Tab.Screen
          name="Exercise"
          component={SessionScreen}
          options={{
            headerShown: false
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>

    /*    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Session">
          <Stack.Screen
            name="Session"
            component={CourseScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WrongAnswer"
            component={WrongAnswerComponent}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot> */
  )
}
