import React from 'react'
import { View, Text, Pressable } from 'react-native'
export default function FilteringOptions() {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Pressable>
                <Text style={{ fontSize: 30, paddingLeft: 30 }}>All</Text>
            </Pressable>
            <Pressable>
                <Text style={{ fontSize: 30, paddingLeft: 30 }}>Finance</Text>
            </Pressable>
            <Pressable>
                <Text style={{ fontSize: 30, paddingLeft: 30 }}>Health</Text>
            </Pressable>
        </View>
    )
}

