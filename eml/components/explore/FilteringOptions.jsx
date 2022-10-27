<<<<<<< HEAD
import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-navigation'



=======
import React from 'react'
import { View, Text, Pressable } from 'react-native'
>>>>>>> cbf347d4edf60667ea4c06289f562ef04b38e73b
export default function FilteringOptions() {

    return (
        <View style={{ flexDirection: 'row' }}>
<<<<<<< HEAD
            <TouchableOpacity>
                <Text style={{ fontSize: 24, paddingLeft: 10 }}>{'\u29BF'} All </Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ fontSize: 24, paddingLeft: 10 }}>{'\u29BF'} Finance  </Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ fontSize: 24, paddingLeft: 10 }}>{'\u29BF'} Health</Text>
            </TouchableOpacity>
=======
            <Pressable>
                <Text style={{ fontSize: 30, paddingLeft: 30 }}>All</Text>
            </Pressable>
            <Pressable>
                <Text style={{ fontSize: 30, paddingLeft: 30 }}>Finance</Text>
            </Pressable>
            <Pressable>
                <Text style={{ fontSize: 30, paddingLeft: 30 }}>Health</Text>
            </Pressable>
>>>>>>> cbf347d4edf60667ea4c06289f562ef04b38e73b
        </View>
    );
}

