import React from 'react'
import { View, StyleSheet } from 'react-native'
import CourseTitleIcon from './courseHeader/CourseTitleIcon'
import PropTypes from 'prop-types'

export default function CourseHeader({ courseTitle, courseIcon }) {
  CourseHeader.propTypes = {
    courseTitle: PropTypes.string.isRequired,
    courseIcon: PropTypes.string.isRequired
  }

  return (
    <View className="items-center pt-8" >
      <CourseTitleIcon
        title={courseTitle}
        courseIcon={courseIcon}
      ></CourseTitleIcon>
    </View>
  )
}
