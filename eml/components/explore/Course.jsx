import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'


export default function Courses({ title, courseId }) {
    const navigation = useNavigation()
    return (

        <View style={{ flexDirection: 'column', alignItems: 'center', width: '50%' }}>
            <Pressable style={styles.courses}
                onPress={() => navigation.navigate('Course', { courseId: courseId })}>
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
        borderRadius: 15,
        width: '75%'
    },
    coursesTitle: {
        alignSelf: 'center',
        fontSize: 20
    }
})
