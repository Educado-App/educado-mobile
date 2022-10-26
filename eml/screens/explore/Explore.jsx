import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Explore() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
                <Text style={{ fontSize: 30 }}> Explorar Novos Cursos </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                <TouchableOpacity>
                    <Text style={{ fontSize: 20, paddingLeft: 20 }}> All</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ fontSize: 20, paddingLeft: 20 }}> Finance </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 5, backgroundColor: 'red', alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}> Courses </Text>
            </View>
        </View>
    )
}
