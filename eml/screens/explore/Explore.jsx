import React from 'react'
import { View, Text, Platform } from 'react-native'
import ActiveCourses from '../../components/explore/ActiveCourses'
import Courses from '../../components/explore/Courses'
import FilteringOptions from '../../components/explore/FilteringOptions'
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'
import { AppLoading } from 'expo-app-loading'

export default function Explore() {
    let [fontsLoaded] = useFonts({
        VarelaRound_400Regular
    })
    if (!fontsLoaded) {
        return AppLoading
    } else {
        return (
            <View style={{ flex: 1 }} className="bg-babyBlue">
                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', marginTop: 50, paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
                    <Text style={{ fontSize: 30, fontFamily: 'VarelaRound_400Regular' }}> Explorar Novos Cursos </Text>
                </View>
                <View style={{ flex: 0.5 }}>
                    {/* <FilteringOptions></FilteringOptions> */}
                </View>
                <View style={{ flex: 5 }}>
                    <View style={{ flex: 1 }}>
                        <ActiveCourses></ActiveCourses>
                    </View >
                    <View style={{ flex: 3, flexDirection: 'column' }}>
                        <Courses></Courses>
                    </View>
                </View>
            </View>
        )
    }
}
