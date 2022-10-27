import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

export default function ActiveCourses() {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', height: 90, marginBottom: 30 }}>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses}>
                            <Icon // icon
                                size={90}
                                name="plus-thick"
                                type="material-community"
                                color="gold"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Health 1</Text>
                    </View>

                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Pressable style={styles.courses} onPress={() => navigation.navigate('Course')} >
                            <Icon // icon
                                size={90}
                                name="cash"
                                type="material-community"
                                color="gold"
                            />
                        </Pressable>
                        <Text style={styles.coursesTitle}>Finance 1</Text>
                    </View>
                </View>
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    courses: {
        backgroundColor: 'green',
        alignItems: 'center',
        width: 143,
    },
    coursesTitle: {
        alignSelf: 'center',
        fontSize: 20
    }
})