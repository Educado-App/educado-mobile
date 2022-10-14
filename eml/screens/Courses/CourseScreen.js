import React from 'react'
import { View, StyleSheet } from 'react-native'
import CourseTitleIcon from '../../components/courses/courseHeader/CourseTitleIcon'
import CourseProgress from '../../components/courses/courseHeader/CourseProgress'
import CourseMenu from '../../components/courses/courseHeader/CourseMenu'

export default function CourseScreen() {
  const color = '#006622'
  const type = 'material-community'
  const name = 'cash'

  return (
    <View style={styles.container}>
      <View>
        <CourseMenu />
      </View>
      <View>
        <CourseTitleIcon
          color={color}
          name={name}
          type={type}
          title={'Personal Finance'}
        ></CourseTitleIcon>
      </View>
      <CourseProgress fracTop={45} fracBot={100}></CourseProgress>
    </View>
  )
}

const styles = StyleSheet.create({})
