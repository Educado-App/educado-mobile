import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import CourseTitleIcon from './courseHeader/CourseTitleIcon'
import PropTypes from 'prop-types'
import DownloadCourseButton from "./DownloadCourseButton";
import CourseProgress from './courseHeader/CourseProgress';

export default function CourseHeader({ courseTitle, courseIcon, courseCategory, courseProgress, courseId, downloadState }) {

  CourseHeader.propTypes = {
    courseTitle: PropTypes.string.isRequired,
    courseIcon: PropTypes.string,
  }

  return (
      <View className="items-center pt-4" >
        <CourseTitleIcon
          title={courseTitle}
          courseIcon={courseIcon}
          category={courseCategory}
          progress={courseProgress}
        >
        </CourseTitleIcon>
        {/*<DownloadCourseButton downloadStateSignal={downloadState} courseId={courseId} style={styles.downloadButton}></DownloadCourseButton>*/}
      </View>
  )
}


const styles = StyleSheet.create({
  downloadButton: {
    marginLeft: '5%'
  }
})
