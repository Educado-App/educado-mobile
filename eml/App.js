import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import WrongAnswerComponent from './screens/Session/WrongAnswerScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RecoilRoot } from 'recoil'
import CourseScreen from '../eml/screens/Courses/CourseScreen'
import CourseMenu from './components/courses/courseHeader/CourseMenu'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Session">
          <Stack.Screen
            name="Session"
            component={CourseMenu}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WrongAnswer"
            component={WrongAnswerComponent}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}
