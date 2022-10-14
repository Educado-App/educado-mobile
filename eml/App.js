import React from 'react'
import SessionComponent from './screens/Session/SessionScreen'
import { NavigationContainer } from '@react-navigation/native'
import WrongAnswerComponent from './screens/Session/WrongAnswerScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RecoilRoot } from 'recoil'
import CourseBody from './components/courses/CourseBody'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <CourseBody></CourseBody>
  )
}
