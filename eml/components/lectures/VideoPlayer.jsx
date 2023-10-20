import React, { forwardRef, useEffect, useState } from 'react';

import { View, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';

import axios from 'axios';


import tailwindConfig from '../../tailwind.config';

const CustomExpoVideoPlayer = forwardRef(({ onStatusUpdate, videoUrl, isMuted = false, isPlaying = true }, ref) => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: tailwindConfig.theme.colors.black,
        },
        video: {
            alignSelf: 'center',
            width: screenWidth,
            height: screenHeight + screenHeight / 10,
        },
    });




    return (
        <View style={styles.container}>
            <Video
                ref={ref}
                useNativeControls={false}
                source={{
                    uri: videoUrl
                }}
                volume={1.0}
                rate={1.0}
                isMuted={isMuted}
                resizeMode="cover"
                shouldPlay={isPlaying}
                isLooping={true}
                onPlaybackStatusUpdate={onStatusUpdate}
                style={styles.video}
            />
        </View>
    );
});

export default CustomExpoVideoPlayer;