import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Layout } from '@ui-kitten/components';
import EasyDynamicList from './EasyDynamicList';
import CourseHeader from '../courses/CourseHeader';
const JSONData = require('../../assets/file/testCourse.json');
const ActiveCourse = require('../../assets/file/activeCourse.json')



export default function CourseListUI() {

    return (
        <SafeAreaView style={styles.mainContainer}>
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

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

});
