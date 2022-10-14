import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import WrongAnswerComponent from './screens/Session/WrongAnswerScreen'
import CourseScreen from '../eml/screens/Courses/CourseScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/themed'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={CourseScreen}
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
