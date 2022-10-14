import React from 'react'
import { View, StyleSheet } from 'react-native'
import CourseProgress from './courseHeader/CourseProgress'
import CourseTitleIcon from './courseHeader/CourseTitleIcon'

export default function CourseHeader() {
  const color = '#006622'
  const type = 'material-community'
  const name = 'cash'
  return (
    <View style={styles.container}>
      <CourseTitleIcon
        color={color}
        name={name}
        type={type}
        title={'Personal Finance'}
      ></CourseTitleIcon>
      <CourseProgress fracTop={45} fracBot={100}></CourseProgress>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '8%',
    flex: 1,
    alignItems: 'center'
  }
})
