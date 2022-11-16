import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

export default function ActiveCourse({ title, courseId }) {
    const navigation = useNavigation()
    return (
        <View className="flex-col flex-1 items-center">
            <Pressable className="bg-[#267326] w-9/12 items-center rounded-md border-[#3D9C19] active:bg-[#fff]"
                onPress={() => navigation.navigate('Course', { courseId: courseId })}>
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