import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import { Icon } from '@rneui/base'
export default function CourseView({ title }) {
    return (
        <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Pressable style={styles.courses}>
                <Icon // icon
                    size={90}
                    name="plus-thick"
                    type="material-community"
                    color="darkgray"
                />
            </Pressable>
            <Text style={styles.coursesTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    courses: {
        backgroundColor: '#C7CDC6',
        alignItems: 'center',
        width: '75%',
        borderRadius: 15,
    },
    coursesTitle: {
        alignSelf: 'center',
        fontSize: 20
    }
})
