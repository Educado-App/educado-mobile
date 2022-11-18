import React from 'react'
import { View, StyleSheet } from 'react-native'
import CourseTitleIcon from './courseHeader/CourseTitleIcon'
import PropTypes from 'prop-types'
export default function CourseHeader({courseTitle, courseIcon }) {
  CourseHeader.propTypes = {
    courseTitle: PropTypes.string.isRequired,
    courseIcon: PropTypes.string.isRequired
  }

  return (
    <View className="items-center pt-10 bg-lime-200">
      <CourseTitleIcon
        title={courseTitle}
        courseIcon={courseIcon}
      ></CourseTitleIcon>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '8%',
    alignItems: 'center'
  }
})
