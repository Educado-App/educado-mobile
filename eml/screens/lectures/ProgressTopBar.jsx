import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const ProgressTopBar = ({ progressPercent = 0, lectureType, className = ""   }) => {

    const navigator = useNavigation();
    const animatedWidth = useRef(new Animated.Value(progressPercent)).current;
    const [displayedPercent, setDisplayedPercent] = useState(progressPercent); // Initializing state with prop

    const color = lectureType === 'video' ? 'white' : 'black';

    useEffect(() => {
        const listener = animatedWidth.addListener(({ value }) => {
            setDisplayedPercent(Math.round(value));
        });

        Animated.timing(animatedWidth, {
            toValue: progressPercent,
            duration: 500,
            useNativeDriver: false
        }).start();

        return () => {
            animatedWidth.removeListener(listener);
        };
    }, [progressPercent]);

    return (
        <View className={"flex-row w-full justify-between  items-center pt-[15%] px-4"}>
            <Pressable onPress={() => navigator.goBack()}>
                <MaterialCommunityIcons name="chevron-left" size={28} color={color} />
            </Pressable>
            <View className="h-2 px-5 flex-grow rounded-full">
                <View className="flex-grow relative">
                    {/* Background Bar */}
                    <View className={`w-full h-2 top-0 absolute rounded-full bg-disabled `} />

                    {/* Active Progress Bar */}
                    <Animated.View className={`absolute h-2 top-0 bg-primary rounded-full`}
                        style={{ width: animatedWidth.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: ['0%', '100%']
                                }) }}
                    />
                </View>
            </View>
            <Text className="font-bold" style={{ color: color }}>{displayedPercent}%</Text>
        </View>
    );
}

export default ProgressTopBar;
