import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import EasyDynamicList from './EasyDynamicList';
import CourseHeader from '../courses/CourseHeader';

export default function CourseListUI({ course, downloadState }) {

    return (
        <View>
            <CourseHeader
                downloadState={downloadState}
                courseTitle={course}
                courseIcon={'../../../assets/icon.png'}
                courseId={0}
            >
            </CourseHeader>
            {/*<EasyDynamicList course={course} ></EasyDynamicList>*/}
        </View>
    );
};
