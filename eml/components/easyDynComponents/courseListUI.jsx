import React from 'react';
import { SafeAreaView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import EasyDynamicList from './EasyDynamicList';
import CourseHeader from '../courses/CourseHeader';

export default function CourseListUI({ course }) {

    return (
        <SafeAreaView>
            <CourseHeader
                nrArr={[
                    [1, 3],
                    [2, 3],
                    [3, 3],
                    [0, 3]
                ]}
                courseTitle={course[0].title}
            ></CourseHeader>
            <Layout>
                <EasyDynamicList courseData={course[0]} ></EasyDynamicList>
            </Layout>
        </SafeAreaView>
    );
};