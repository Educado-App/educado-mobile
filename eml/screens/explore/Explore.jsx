import React from 'react'
import { View, Text } from 'react-native'

export default function Explore() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 50, backgroundColor: 'blue' }}>
                <Text style={{ fontSize: 30 }}> Some Title Text </Text>
            </View>
            <View style={{ flex: 1, backgroundColor: 'green', alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}> Filtering Options </Text>
            </View>
            <View style={{ flex: 5, backgroundColor: 'red', alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}> Courses </Text>
            </View>
        </View>
    )
}
