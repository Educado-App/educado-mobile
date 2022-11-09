import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import ActiveCourse from './ActiveCourse'
import json from './jsonData.json'

export default function ActiveCourses({ activeCoursesToShow }) {
    const [views, setViews] = useState([]);
    useEffect(() => {
        async function loadViews() {
            const componentPromises = json.data.active.map(({ data }, index) => {
                return <ActiveCourse key={index}{...data} />;
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
const styles = StyleSheet.create({
    courses: {
        backgroundColor: 'green',
        alignItems: 'center',
        width: '75%',
        borderRadius: 15,
        borderWidth: 5,
        borderColor: '#3D9C19',
    },
    coursesTitle: {
        alignSelf: 'center',
        fontSize: 20
    }
})