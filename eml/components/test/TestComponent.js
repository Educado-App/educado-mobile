import { StatusBar } from 'expo-status-bar'
import { React, useState, useEffect } from 'react'
import { Alert, StyleSheet, View, Text } from 'react-native'
import { Video } from 'expo-av'
import * as FileSystem from 'expo-file-system';


const TestVideo = () => {
    return (
        <Video
            source={{
                uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4'
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            useNativeControls
            isLooping
            style={styles.backgroundVideo}
        />
    )
}


export default function TestComponent() {

    useEffect(() => {

        }
    );

    return (
        <TestVideo></TestVideo>
    );
}

const styles = StyleSheet.create({

    backgroundVideo: {
        height: '100%'
    }

})
