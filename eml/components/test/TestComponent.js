import { React, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Video } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StorageService from "../../services/StorageService";
import * as DirectoryService from "../../services/DirectoryService";
import { getAuthToken, getCoursesWithAuth } from "../../api/api";

const testUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4';
const TEST_COURSE = '@testCourse';
const COURSE_LIST = '@courseList';

export default function TestComponent() {

    let text = "Hello"

    async function test() {
        console.log(JSON.parse(await AsyncStorage.getItem(COURSE_LIST)))
    }

    async function test2() {
        const course = await StorageService.getCourseById("635fb5b9b2fb6c4f49084682");
        console.log(course.data);
    }

    async function test3() {
        const course = await StorageService.getCourseList();
        console.log(course);
    }

    async function test4() {
        const course = await getCoursesWithAuth();
        console.log(course);
    }

    async function test5() {
        const auth = await getAuthToken();
        console.log(auth.data.accessToken);
    }

    async function test6(x) {
        if (x === 1) {
            console.log("this is ");
        } else {
            console.log("that is ");
        }

        console.log("nice!");
    }


    async function test7() {
        const course = await StorageService.getTestCourseFromApi();
        console.log(course.data.sections[0].exercises[0]);
    }

    async function readDir(name) {
        return await DirectoryService.ReadDirectory(name);
    }

    async function createDir(name) {
        return await DirectoryService.CreateDirectory(name);
    }

    async function deleteDir(name) {
        return await DirectoryService.DeleteDirectory(name);
    }

    const checkNewGetCourseById = useCallBack(async (courseId) => {
        const arrayFromCourse = await StorageService.getCourseById(courseId);
        setData(arrayFromCourse);
    }, [])

    const updateExercise = useCallBack(async (sid, eid) => {
        const updateStatus = await StorageService.updateCompletionStatus(sid, eid);
        setData(updateStatus)
    }, [])

    const getNextExercise = useCallBack(async(id) => {
        const ex = await StorageService.getNextExercise(id);
        setData(ex);
    }, [])

    useEffect(() => {
        (async () => {
            checkNewGetCourseById("635fb5b9b2fb6c4f49084682");
        })();
        (async () => {
            updateExercise('63679d8119dd0a38a4673fd4', '637609e627a91f4ba637f98e');
        })();
        (async () => {
            getNextExercise('63679d8119dd0a38a4673fd4');
        })();
        //test4();
        //CreateDirectory('test');
        //ReadDirectory('test');
        //DeleteDirectory('test');
    }
    );

    // declare the async data fetching function
    const fetchData = useCallback(async () => {
        const data = await fetch('https://yourapi.com');

        setData(data);
    }, [])

    // the useEffect is only there to call `fetchData` at the right time
    useEffect(() => {
        fetchData()
            // make sure to catch any error
            .catch(console.error);;
    }, [fetchData])

    return (
        <View>
            <Text style={{ fontSize: 50, paddingTop: 100 }}>{text}</Text>
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
