import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import ActiveCourse from './ActiveCourse'
import StorageController from '../../assets/controller/storageController'

export default function ActiveCourses({ activeCoursesToShow }) {
    const [views, setViews] = useState([]);


    const courseList = StorageController.getCourseList()

    useEffect(() => {
        async function loadViews() {
            const componentPromises = courseList.map(({ title, iconPath, isDownloaded, courseId }, index) => {
                if (isDownloaded) {
                    return <ActiveCourse key={index} title={title} courseId={courseId} />;
                }
            });

            Promise.all(componentPromises).then(setViews);
        }

        loadViews();
    }, [activeCoursesToShow]);

    return (
        <View style={{ flexDirection: 'row', height: 100, marginBottom: 30 }}>
            {views}
        </View>
    )
}