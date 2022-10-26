import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
export default function FilteringOptions() {
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
                <Text style={{ fontSize: 30, paddingLeft: 30 }}>Hej</Text>
            </TouchableOpacity>
        </View>
    )
}
