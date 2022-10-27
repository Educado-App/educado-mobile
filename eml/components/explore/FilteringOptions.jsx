import React from 'react'
import { View, Text, Pressable } from 'react-native'
export default function FilteringOptions() {

    return (
        <View style={{ flexDirection: 'row' }}>
            <Pressable>
                <Text style={{ fontSize: 24, paddingLeft: 10 }}>{'\u29BF'} All </Text>
            </Pressable>
            <Pressable>
                <Text style={{ fontSize: 24, paddingLeft: 10 }}>{'\u29BF'} Finance  </Text>
            </Pressable>
            <Pressable>
                <Text style={{ fontSize: 24, paddingLeft: 10 }}>{'\u29BF'} Health</Text>
            </Pressable>
        </View>
    );
}

