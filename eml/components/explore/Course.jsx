import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'


export default function Courses({ title, courseId }) {
    const navigation = useNavigation()
    return (

        <View>
            <Pressable className="bg-[#c6cdc8] w-9/12 rounded-md item-center"
                onPress={() => navigation.navigate('Course', { courseId: courseId })}>
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
