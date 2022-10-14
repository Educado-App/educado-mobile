import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import CourseScreen from '../../screens/Courses/CourseScreen'
import { NavigationContainer } from '@react-navigation/native'
const Tab = createBottomTabNavigator()

export default function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={CourseScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
