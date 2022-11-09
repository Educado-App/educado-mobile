import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Layout } from '@ui-kitten/components';
import EasyDynamicList from './EasyDynamicList';
import CourseHeader from '../courses/CourseHeader';
import StorageController from '../../assets/controller/storageController';
const JSONData = require('../../assets/file/testCourse.json');
const ActiveCourse = require('../../assets/file/activeCourse.json')

export default function CourseListUI({ courseId }) {
    const CourseView = StorageController.getCourseById()
    return (
        <SafeAreaView>
            <CourseHeader
                nrArr={[
                    [1, 3],
                    [2, 3],
                    [3, 3],
                    [0, 3]
                ]}
                courseTitle={JSONData[ActiveCourse.ActiveCourse].title}
            ></CourseHeader>
            <Layout>
                <EasyDynamicList JSONData={JSONData[ActiveCourse.ActiveCourse].sections} ></EasyDynamicList>
            </Layout>
        </SafeAreaView>
    );
};