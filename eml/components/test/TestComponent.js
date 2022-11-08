import { StatusBar } from 'expo-status-bar'
import { React, useState, useEffect } from 'react'
import { Alert, StyleSheet, View, Text } from 'react-native'
import { Video } from 'expo-av'
import * as FileSystem from 'expo-file-system';

const TestVideo = () => {
    return (
        <Video
            source={{
                uri: 'file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540anonymous%252Feml-77258e33-dee5-4533-87eb-ffc39b19a9d3/ForBiggerMeltdowns.mp4'
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            useNativeControls
            isLooping
            style={styles.backgroundVideo}
        />
    )
}

async function DownloadAndStoreVideo(url){

    let localUri;

    await FileSystem.downloadAsync(url,
        FileSystem.documentDirectory + url.substring(url.lastIndexOf('/') + 1)
    )
        .then(({ uri }) => {
            console.log('Finished downloading to ', uri);
            localUri = uri;
        })
        .catch(error => {
            console.error(error);
        });

    return localUri;
}

async function DeleteVideo () {

}

export default function TestComponent() {

    useEffect(() => {

    });

    return (
        <TestVideo></TestVideo>
    );
}

const styles = StyleSheet.create({

    backgroundVideo: {
        height: '100%'
    }
})
