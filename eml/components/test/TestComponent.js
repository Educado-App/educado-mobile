import {React, useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Video} from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCourseById, getCourseList, getTestCourseFromApi} from "../../services/StorageService";
import {getCourse} from "../../api/api";

let testUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4';

const TEST_COURSE = '@testCourse';

export default function TestComponent() {

    async function test () {
        console.log(JSON.parse(await AsyncStorage.getItem('@courseList')))
    }

    async function test2 () {
        const course = await getCourseById("635fb5b9b2fb6c4f49084682");
        console.log(course);
    }

    async function test3 () {
        const course = await getCourseList();
        console.log(course);
    }


    useEffect(() => {
        //test();
        //CreateDirectory('test');
        //ReadDirectory('test');
        //DeleteDirectory('test');
        }
    );

    return (
        <View>
            <Text style={{fontSize: 50, paddingTop: 100}}>HELLO</Text>
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
        </View>

    );
}

const styles = StyleSheet.create({

    backgroundVideo: {
        height: '100%'
    }

})
