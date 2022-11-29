import React from 'react'
import { Layout, Button, ListItem } from '@ui-kitten/components'
import { Icon } from '@rneui/base'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SectionItem from '../courses/courseBody/SectionItem'

export default function easyDynamicList({ course }) {

    const navigation = useNavigation()

    const courseSections = course.sections;

    course




    return (
        <View className="flex-auto grow pb-40 h-full">
            <ScrollView>
                {courseSections.map((item, index) => {
                    return (
                        <SectionItem
                            sectionId={item.id}
                            key={index}
                            courseId={course.id}
                            title={item.title}
                            index={index + 1}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}
