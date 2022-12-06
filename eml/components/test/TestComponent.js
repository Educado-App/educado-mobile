import { React, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StorageService from "../../services/StorageService";
import * as DirectoryService from "../../services/DirectoryService";
import {getAuthToken, getCourse} from "../../api/api";

const testUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4';
const TEST_COURSE = '@testCourse';
const COURSE_LIST = '@courseList';

export default function TestComponent() {
    //Shuffle Tests
    async function test() {
        console.log(await AsyncStorage.getAllKeys());
    }
    async function clear() {
        console.log(await AsyncStorage.getAllKeys());
        console.log(await AsyncStorage.clear());
        console.log(await AsyncStorage.getAllKeys());
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

    async function tryDeleteDirectory() {
        const element = await StorageService.downloadCourse('635fb5b9b2fb6c4f49084682')

        if (element == null) {
            return null;
        }

        console.log(element);

        const beforeDelete = AsyncStorage.getItem('635fb5b9b2fb6c4f49084682');
        console.log(beforeDelete)

        await StorageService.deleteElementFromLocalStorage(element.id);

        const afterDelete = await AsyncStorage.getItem('635fb5b9b2fb6c4f49084682')

        if (afterDelete != null) {
            console.log(afterDelete);
        }
    }

    useEffect(() => {
        //readDir("");
        //clear();
    }
    );

}
