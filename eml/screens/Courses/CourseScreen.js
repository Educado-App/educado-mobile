import React from 'react'
import CourseHeader from '../../components/courses/CourseHeader'
import CourseBody from '../../components/courses/CourseBody'
import { View } from 'react-native'
export default function CourseScreen() {
  return (
    <View style={{flex: 1}}>
      <CourseHeader></CourseHeader>
      <CourseBody></CourseBody>
    </View>

  )
}
