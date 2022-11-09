/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

import Course from './Course'
import json from './jsonData.json'

export default function Courses({ activeCoursesToShow }) {
    const [views, setViews] = useState([]);
    useEffect(() => {
        async function loadViews() {
            var x = 0;
            const course = json.data.notactive.map(({ data }, index) => {
                return (
                    <Course key={index} {...data}></Course>
                )
            });


            Promise.all(course).then(setViews);
        }

        loadViews();
    }, [activeCoursesToShow]);
    return (

        <ScrollView style={{}}>

            <View style={{ flexDirection: 'row', height: 90, marginBottom: 30, flexWrap: 'wrap' }}>
                {views}
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    courses: {
        backgroundColor: 'gray',
        alignItems: 'center',
        width: 300,
        borderRadius: 15,
    },
    coursesTitle: {
        alignSelf: 'center',
        fontSize: 20
    }
})
