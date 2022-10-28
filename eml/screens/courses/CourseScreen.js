import React from 'react'
import CourseHeader from '../../components/courses/CourseHeader'
import CourseBody from '../../components/courses/CourseBody'
import { View } from 'react-native'

export default function CourseScreen() {
  return (
    <View style={{ flex: 1 }}>
      <CourseHeader
        nrArr={[
          [1, 3],
          [2, 3],
          [3, 3],
          [0, 3]
        ]}
      ></CourseHeader>
      <CourseBody></CourseBody>
    </View>
  )
}
