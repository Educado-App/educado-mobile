import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

export default function ActiveCourse({ title }) {
    const navigation = useNavigation()
    return (
        <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Pressable style={styles.courses}>
                <Icon // icon
                    size={90}
                    name="plus-thick"
                    type="material-community"
                    color="#D00A0A"

                />
            </Pressable>
            <Text style={styles.coursesTitle}>{title}</Text>
        </View>

    )
}
const styles = StyleSheet.create({
    courses: {
        backgroundColor: '#267326',
        alignItems: 'center',
        width: '75%',
        borderRadius: 15,
        borderWidth: 5,
        borderColor: '#3D9C19',
        borderRadius: 15
    },
    coursesTitle: {
        alignSelf: 'center',
        fontSize: 20
    }
})