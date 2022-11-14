import { StatusBar } from 'expo-status-bar'
import { React, useState, useEffect } from 'react'
import { Alert, StyleSheet, View, Text } from 'react-native'
import { Video } from 'expo-av'
import * as FileSystem from 'expo-file-system';
import {
    CreateDirectory, DeleteDirectory,
    DeleteVideoByName,
    DownloadAndStoreVideo,
    ReadDirectory
} from "../../services/DirectoryService";

import {downloadCourse} from "../../services/StorageService"

let testUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4';

export default function TestComponent() {
    useEffect(() => {
        downloadCourse('test');
        //CreateDirectory('test');
        //ReadDirectory('test');
        //DeleteDirectory('test');
      }
    );

    return (
        <Video
            source={{
                uri: ''
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            useNativeControls
            isLooping
            style={styles.backgroundVideo}
        />
    );
}

const styles = StyleSheet.create({

    backgroundVideo: {
        height: '100%'
    }

})
