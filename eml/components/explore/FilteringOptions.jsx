import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
export default function FilteringOptions() {
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
                <Text style={{ fontSize: 30, paddingLeft: 30 }}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ fontSize: 30, paddingLeft: 30 }}>Finance</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ fontSize: 30, paddingLeft: 30 }}>Health</Text>
            </TouchableOpacity>
        </View>
    )
}
