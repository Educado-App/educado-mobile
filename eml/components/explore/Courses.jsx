/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import ExploreCard from './ExploreCard'
import StorageController from '../../assets/controller/storageController'

export default function Courses({ activeCoursesToShow }) {
    const [views, setViews] = useState([]);
    const courseList = StorageController.getCourseList()
    useEffect(() => {
        async function loadViews() {
            // eslint-disable-next-line array-callback-return
            const course = courseList.map(({ title, iconPath, isDownloaded, courseId }, index) => {
                if (!isDownloaded) {
                    return <ExploreCard key={index} title={title} courseId={courseId}></ExploreCard>
                }
            });


            Promise.all(course).then(setViews);
        }

        loadViews();
    }, [activeCoursesToShow]);
    return (

        <ScrollView style={{}}>

            <View style={{ flexDirection: 'row', height: '100%', marginBottom: 30, flexWrap: 'wrap' }}>
                {views}
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    courses: {
        backgroundColor: 'gray',
        width: 300,
        borderRadius: 15,
    },
    coursesTitle: {
        fontSize: 20
    }
})
