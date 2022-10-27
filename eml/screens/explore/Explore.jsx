import React from 'react'
import { View, Text, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ActiveCourses from '../../components/explore/ActiveCourses'
import Courses from '../../components/explore/Courses'
import FilteringOptions from '../../components/explore/FilteringOptions'

export default function Explore() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'baseline', marginTop: 50, paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
                <Text style={{ fontSize: 30 }}> Explorar Novos Cursos </Text>
            </View>
            <View style={{ flex: 1 }}>
                <FilteringOptions></FilteringOptions>
            </View>
            <View style={{ flex: 5 }}>
                <ActiveCourses></ActiveCourses>
                <Courses></Courses>
            </View>
        </View>
    )
}
