import React from 'react'
import { Layout, Button, ListItem } from '@ui-kitten/components'
import { Icon } from '@rneui/base'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SectionItem from '../courses/courseBody/SectionItem'

const SectionNumber = (index) => <Text>{index}</Text>

export default function easyDynamicList({ courseData }) {
  const navigation = useNavigation()

  const courseSections = courseData.sections
  const courseId = courseData.courseId

  return (
    <ScrollView style={styles.scrollView} 
    overScrollMode='always'>
      {courseSections.map((item, index) => {
        return (
            <SectionItem
              onPress={() => {
                navigation.navigate('Exercise', {
                  sectionId: item.sectionId,
                  courseId: courseId
                })
              }}
              key={index}
              title={item.title}
              index = {index}
            />
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    height: '83%',
  },
})
