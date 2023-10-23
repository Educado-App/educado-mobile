import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation } from '@react-navigation/native';

const ProgressTopBar = ({ progressPercent, className = "", color = "white" }) => {

    const navigator = useNavigation();
    return (
        <View className={"flex-row w-full justify-between items-center pt-[15%] " + className} >
            <Pressable onPress={() => navigator.goBack()}>
                <MaterialCommunityIcons name="chevron-left" size={28} color={color} />
            </Pressable>
            <View
                className="h-2 px-5 flex-grow  rounded-full"
            >
                <View
                    className=" flex-grow relative"
                >
                    {/* Background Bar */}
                    <View className="w-full h-2 top-0 absolute bg-disabled rounded-full" />

                    {/* Active Progress Bar */}
                    <View className={`absolute h-2 top-0 bg-primary rounded-full`}
                        style={{ width: `${progressPercent}%` }}
                    />
                </View>
            </View>
            <Text className="font-bold" style={{ color: color }} >{progressPercent}%</Text>
        </View>
    );
}

export default ProgressTopBar;