import React, { useState, useEffect, useRef } from 'react';
import { View, Text, PanResponder } from 'react-native';

import tailwindConfig from '../../tailwind.config';
// THIS DOES NOT WORK YET
const VideoProgressBar = ({ elapsedMs = 10000, totalMs = 20000, color, height, videoRef }) => {
    const convertMsToTime = (ms) => {
        let seconds = Math.floor((ms / 1000) % 60);
        let minutes = Math.floor((ms / (1000 * 60)) % 60);

        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${minutes}:${seconds}`;
    }

    const [percent, setPercent] = useState((elapsedMs / totalMs) * 100);
    const [progressBarWidth, setProgressBarWidth] = useState(0);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                // handle touch down
            },
            onPanResponderMove: (evt, gestureState) => {
                // Calculate the percentage change
                const _prograssBarWith = progressBarWidth == 0 ? 1 : progressBarWidth;
                console.log("_prograssBarWith", _prograssBarWith);
                console.log("gestureState.dx", gestureState.dx);
                const percentageChange = (gestureState.dx / _prograssBarWith) * 100;
                let newPercent = percent + percentageChange;
                newPercent = Math.max(0, Math.min(newPercent, 100));  // Ensure the percentage is between 0 and 100

                console.log("newPercent", newPercent);
                console.log("percent", percent);
                console.log("percentChange", percentageChange);
                // Convert the new percentage to milliseconds
                const newElapsedMs = (newPercent / 100) * totalMs;

                console.log("newElapsedMs", newElapsedMs);
                // Set the video time (assuming videoRef.current has a setPositionAsync method)
                if (videoRef.current && videoRef.current.setPositionAsync) {
                    videoRef.current.setPositionAsync(newElapsedMs);
                }

                // Update the percentage state
                setPercent(newPercent);
            },
            onPanResponderRelease: (evt, gestureState) => {
                // handle touch release
            },
        })
    ).current;

    useEffect(() => {
        console.log("Video Ref is now set:");
        setPercent((elapsedMs / totalMs) * 100);
    }, [elapsedMs]);




    return (
        <View className="w-full flex-row justify-between items-center h-8">
            {/* Start Time */}
            <Text style={{color: tailwindConfig.theme.colors.white}}>{convertMsToTime(elapsedMs)}</Text>

            {/* Progress Bar Container */}
            <View
                className="flex-grow h-2 px-5"
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setProgressBarWidth(width);
                }}
            >
                <View
                    className=" flex-grow relative"
                    {...panResponder.panHandlers}
                >
                    {/* Background Bar */}
                    <View className="w-full h-full bg-white rounded-full" />

                    {/* Active Progress Bar */}
                    <View className={`absolute h-full bg-primary rounded-full`}
                        style={{ width: `${percent}%` }}
                    />
                </View>
            </View>

            {/* End Time */}
            <Text style={{color: tailwindConfig.theme.colors.white}}>{convertMsToTime(totalMs)}</Text>
        </View>
    )
};

export default VideoProgressBar;
