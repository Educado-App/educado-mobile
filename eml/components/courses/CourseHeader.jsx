import React from 'react'
import { View, StyleSheet } from 'react-native'
import CourseTitleIcon from './courseHeader/CourseTitleIcon'
import PropTypes from 'prop-types'
import DownloadCourseButton from "./DownloadCourseButton";

export default function CourseHeader({ courseTitle, courseIcon, courseId, downloadState }) {

  CourseHeader.propTypes = {
    courseTitle: PropTypes.string,
    courseIcon: PropTypes.string,
    courseId: PropTypes.string,
    downloadState: PropTypes.object
  };

  return (
    <View className="items-center pt-8" >
      <CourseTitleIcon
        title={courseTitle}
        courseIcon={courseIcon}
      ></CourseTitleIcon>
      <DownloadCourseButton downloadStateSignal={downloadState} courseId={courseId} style={styles.downloadButton}></DownloadCourseButton>
    </View>
  )
}


const styles = StyleSheet.create({
  downloadButton: {
    marginLeft: '75%'
  }
})
