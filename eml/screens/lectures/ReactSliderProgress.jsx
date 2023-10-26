import React, { useState, useEffect, StyleSheet } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { forwardRef } from 'react';



const ReactSliderProgress = forwardRef(({ elapsedMs = 10000, totalMs = 20000,   }, ref) => {

    const convertMsToTime = (ms) => {
        let seconds = Math.floor((ms / 1000) % 60);
        let minutes = Math.floor((ms / (1000 * 60)) % 60);

        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${minutes}:${seconds}`;
    }

    const [sliderValue, setSliderValue] = useState(elapsedMs);



    useEffect(() => {
        setSliderValue(elapsedMs);
    }, [elapsedMs]);

    const onSlidingComplete = async (value) => {
        if (ref.current) {
            try {
                await ref.current.setStatusAsync({
                    positionMillis: value,
                });
            } catch (error) {
                console.error('Error seeking:', error);
            }
        }
    };



    return (
        <View className="w-full flex-row justify-between items-center h-8">
            {/* Start Time */}
            <Text className="text-projectWhite">{convertMsToTime(sliderValue)}</Text>

            {/* Slider for Progress Bar */}
            <Slider
                style={{ flex: 1, marginHorizontal: 10, height: 10 }}  // height here adjusts the track height
                minimumValue={0}
                maximumValue={totalMs}
                value={sliderValue}
                onValueChange={value => setSliderValue(value)}
                onSlidingComplete={onSlidingComplete}
                minimumTrackTintColor="#5ECCE9"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#5ECCE9"


            />


            {/* End Time */}
            <Text className=" text-projectWhite">{convertMsToTime(totalMs)}</Text>
        </View>
    );


});

export default ReactSliderProgress;