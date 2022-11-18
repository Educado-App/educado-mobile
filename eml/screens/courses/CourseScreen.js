import { useRoute, useNavigation } from '@react-navigation/native'
import React from 'react'
import CourseListUI from '../../components/easyDynComponents/courseListUI'
import { View } from 'react-native'
import StorageController from '../../assets/controller/storageController'

export default function CourseScreen() {
  const route = useRoute()

  const navigation = useNavigation()

  let course = null;

  if (route.params !== undefined) {
    course = StorageController.getCourseById(route.params.courseId)    
  }

  return (
    <View className="bg-lime-200">
      {course !== null ? (
        <CourseListUI course={course}></CourseListUI>
      ) : (
        navigation.navigate('Explore')
      )}
    </View>
  )
}
