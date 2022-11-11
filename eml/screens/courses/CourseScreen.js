import { useRoute, useNavigation } from '@react-navigation/native'
import React from 'react'
import CourseListUI from '../../components/easyDynComponents/courseListUI'
import { View } from 'react-native'
import { useEffect } from 'react'
import StorageController from '../../assets/controller/storageController'

export default function CourseScreen() {
  const route = useRoute()

  const navigation = useNavigation()

  const [course, setCourse] = React.useState(null)

  useEffect(() => {
    if (route.params !== undefined) {
      setCourse(StorageController.getCourseById(route.params.courseId))
    }
  }, [route.params])

  return (
    <View>
      {course !== null ? (
        <CourseListUI course={course}></CourseListUI>
      ) : (
        navigation.navigate('Explore')
      )}
    </View>
  )

  // if(route.params == "undefined"){
  //   emptyCourseList();
  // }
  // return <CourseListUI></CourseListUI>

  // (<View>
  //   <CourseListUI></CourseListUI>
  //   {route.params == "undefined"
  //     ? <CourseListUI></CourseListUI>
  //     : navigation.navigate('Explore')
  //   }
  // </View>
  // )
}
