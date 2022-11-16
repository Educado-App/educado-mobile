import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

export default function Courses({ title }) {
    const navigation = useNavigation()
    return (

        <View className="flex-col items-center w-[50%]">
            <Pressable className="bg-[#C7CDC6] w-[75%] rounded-[15%] item-center">
                <Icon // icon
                    size={90}
                    name="plus-thick"
                    type="material-community"
                    color="darkgray"
                />
            </Pressable>
            <Text className="items-center text-xl">{title}</Text>
        </View>

    )
}
