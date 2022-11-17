import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import ActiveExploreCard from './ActiveExploreCard'
import StorageController from '../../assets/controller/storageController'

export default function ActiveCourses({ activeCoursesToShow }) {
    const [views, setViews] = useState([]);


    const courseList = StorageController.getCourseList()

    useEffect(() => {
        async function loadViews() {
            const componentPromises = courseList.map(({ title, iconPath, isDownloaded, courseId }, index) => {
                if (isDownloaded) {
                    return <ActiveExploreCard key={index} title={title} courseId={courseId} uri={iconPath} />;
                }
            });

            Promise.all(componentPromises).then(setViews);
        }

        loadViews();
    }, [activeCoursesToShow]);

    return (
        <View className="flex-wrap flex-row flex-1 justify-evenly">
            {views}
        </View>
    )
}