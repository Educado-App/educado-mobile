import { React, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Video } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StorageService from "../../services/StorageService";
import * as DirectoryService from "../../services/DirectoryService";
import {getAuthToken, getCourse, getCoursesWithAuth} from "../../api/api";
import {downloadCourse} from "../../services/StorageService";

const testUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4';
const TEST_COURSE = '@testCourse';
const COURSE_LIST = '@courseList';

export default function TestComponent() {
    //Shuffle Tests
    async function test() {
        console.log(await AsyncStorage.getAllKeys());
    }
    async function clear() {
        console.log(await AsyncStorage.clear());
    }
    async function test2() {
        const course = await StorageService.getCourseById("637b9c65c4e8874614ff3bb2");
        console.log(course.data);
    }
    async function test3() {
        const course = await StorageService.getCourseList();
        console.log(course);
    }
    async function list() {
        const list = await AsyncStorage.getItem(COURSE_LIST);
        console.log(list);
    }
    async function test5() {
        const auth = await getAuthToken();
        console.log(auth.data.accessToken);
    }

    async function test6() {
        let y = 10

        let x = {
            number : y,
        }
        console.log(x);
    }

    async function test7() {
        const course = await StorageService.getTestCourseFromApi();
        console.log(course.data.sections[0].exercises[0]);
    }

    //DirectoryService Tests
    async function readDir(name) {
        return await DirectoryService.ReadDirectory(name);
    }
    async function createDir(name) {
        return await DirectoryService.CreateDirectory(name);
    }
    async function deleteDir(name) {
        return await DirectoryService.DeleteDirectory(name);
    }

    //StorageService Tests
    async function checkNewGetCourseById(courseId) {
        const arrayFromCourse = await StorageService.getCourseById(courseId);
        console.log(arrayFromCourse);
    }
    async function updateExercise(sid, eid) {
        await StorageService.updateCompletionStatus(sid, eid);
    }
    async function getNextExercise(id) {
        const ex = await StorageService.getNextExercise(id);
        console.log(ex);
    }

    async function makeTestCourse(){

        const course = await getCourse('635fb5b9b2fb6c4f49084682');
        course.data.category.icon = "http://cdn-icons-png.flaticon.com/512/2783/2783925.png";
        for(const section of course.data.sections){
            for (const exercise of section.exercises){
                exercise.content = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
            }
        }

        await AsyncStorage.setItem('@testKev', JSON.stringify(course));

        for(const section of course.data.sections){
            for (const exercise of section.exercises){
                console.log(exercise.content);
            }
        }
    }

    useEffect(() => {
        //test()
        //test3()
        //test2()
        //clear()
        //makeTestCourse();
        //readDir('635fb5b9b2fb6c4f49084682');
        //downloadTest();
        //checkNewGetCourseById("635fb5b9b2fb6c4f49084682");
        //updateExercise('637b9c65c4e8874614ff3bb2', '637b87706af7d5d52cd27504'); // set exercise 1 as complete
        //updateExercise('637b9c65c4e8874614ff3bb2', '637b9bdf4868f03e24dcb097'); // set exercise 2 as complete
        //getNextExercise('6385d6f6ca2ade86fca55f33'); // get first exercise of this sectionId where isComplete = false
        //test4();
        //CreateDirectory('test');
        //ReadDirectory('test');
        //DeleteDirectory('test');
    }
    );

}

const styles = StyleSheet.create({

    backgroundVideo: {
        height: '100%'
    }

})
