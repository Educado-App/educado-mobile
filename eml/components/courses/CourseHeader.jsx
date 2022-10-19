import React from 'react'
import { View, StyleSheet } from 'react-native'
import CourseProgress from './courseHeader/CourseProgress'
import CourseTitleIcon from './courseHeader/CourseTitleIcon'
import PropTypes from 'prop-types'
export default function CourseHeader({ nrArr }) {
  CourseHeader.propTypes = {
    nrArr: PropTypes.array.isRequired
  }
  const fraqTop = nrArr[0][0] + nrArr[1][0] + nrArr[2][0] + nrArr[3][0]
  const fraqBot = nrArr[0][1] + nrArr[1][1] + nrArr[2][1] + nrArr[3][1]
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
      <CourseProgress fracTop={fraqTop} fracBot={fraqBot}></CourseProgress>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '8%',
    alignItems: 'center'
  }
})
