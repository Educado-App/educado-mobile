import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

export default function ActiveCourse({ title }) {
    function Hello() {
        console.log("Hello1")
    }
    const navigation = useNavigation()
    return (
        <View className="flex-col flex-1 items-center">
            <Pressable className="bg-[#267326] w-[75%] rounded-[15%] items-center border-4 border-[#3D9C19] active:bg-[#fff]" onPressOut={Hello}>
                <Icon // icon
                    size={90}
                    name="plus-thick"
                    type="material-community"
                    color="#D00A0A"
                />
            </Pressable>
            <Text className="self-center text-xl">{title}</Text>
        </View>

    )
}