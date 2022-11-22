/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import ExploreCard from './ExploreCard'

export default function Courses({ courseList, filter }) {
    const [views, setViews] = useState([]);
    
    useEffect(() => {
        async function loadViews() {
            // eslint-disable-next-line array-callback-return
            const course = courseList.map(({ title, iconPath, isDownloaded, courseId, category }, index) => {
                if (!(isDownloaded) && category === filter) {
                    return <ExploreCard key={index} title={title} courseId={courseId}></ExploreCard>
                } else if(!(isDownloaded) && filter === -1){
                    return <ExploreCard key={index} title={title} courseId={courseId} uri={iconPath} />;
                }
            });


            Promise.all(course).then(setViews);
        }

        loadViews();
    }, [filter]);
    return (

        <ScrollView>
            <View className="flex-wrap flex-row flex-1 justify-evenly">
                {views}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    courses: {
        backgroundColor: 'grey',
        width: 300,
        borderRadius: 15,
    },
    coursesTitle: {
        fontSize: 20
    }
})
