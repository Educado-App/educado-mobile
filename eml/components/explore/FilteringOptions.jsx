import React from 'react'
import { View, Text, Pressable } from 'react-native'
export default function FilteringOptions() {

    return (
        <View style={{ flexDirection: 'row' }}>
            <Pressable>
                {/* All */}
                <Text style={{ fontSize: 24, paddingLeft: 10 }}>{'\u29BF'} Todos </Text>
            </Pressable>
            <Pressable>
                {/* Finance */}
                <Text style={{ fontSize: 24, paddingLeft: 10 }}>{'\u29BF'} Finança  </Text>
            </Pressable>
            <Pressable>
                {/* Health */}
                <Text style={{ fontSize: 24, paddingLeft: 10 }}>{'\u29BF'} Saúde</Text>
            </Pressable>
        </View>
    );
}

