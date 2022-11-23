import {React, useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Video} from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetCourseById, GetCourseList, GetTestCourseFromApi} from "../../services/StorageService";
import {getCourse} from "../../api/api";

let testUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4';

const TEST_COURSE = '@testCourse';

export default function TestComponent() {

    /*
    const [course, setCourse] = useState('some')

    async function getCourse (){
        const course = await getTestCourseFromApi();
        setCourse(course);
    }
    */

    async function test () {
        console.log(JSON.parse(await AsyncStorage.getItem('@courseList')))
    }

    async function test2 () {
        const course = await GetCourseById("635fb5b9b2fb6c4f49084682");
        console.log(course.data.sections[0].exercises[0].content);
    }

    async function test3 () {
        const course = await GetCourseList();
        console.log(course);
    }


    useEffect(() => {
            // console.log(getTestCourseFromApi());
            // console.log("hello")
            // CreateDirectory('test');
            // ReadDirectory('test');
            // DeleteDirectory('test');
            // let obj = Promise.resolve(getTestCourseFromApi());
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