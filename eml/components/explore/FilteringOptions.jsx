import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-navigation'



export default function FilteringOptions() {

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
                <Text style={{ fontSize: 24, paddingLeft: 10 }}>{'\u29BF'} All </Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ fontSize: 24, paddingLeft: 10 }}>{'\u29BF'} Finance  </Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ fontSize: 24, paddingLeft: 10 }}>{'\u29BF'} Health</Text>
            </TouchableOpacity>
        </View>
    );
}

