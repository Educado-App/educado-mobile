import { useRoute, useNavigation } from '@react-navigation/native'
import React from 'react'
import CourseListUI from '../../components/easyDynComponents/courseListUI'
import { View} from 'react-native'
import { useEffect } from 'react';


export default function CourseScreen() {
  const route = useRoute();

  const navigation = useNavigation();

  const [course, setCourse] = React.useState(false);

  useEffect(() => {

    if(route.params != undefined){
      setCourse(true)
    }
  }, [route.params])

  return (
    <View>
      {course == true ? <CourseListUI courseId={route.params.courseId}></CourseListUI> : navigation.navigate('Explore')}
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
