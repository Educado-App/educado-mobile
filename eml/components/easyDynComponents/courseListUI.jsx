import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import EasyDynamicList from './EasyDynamicList';
import CourseHeader from '../courses/CourseHeader';
import CourseBody from '../courses/CourseBody';

export default function CourseListUI({ course, downloadState }) {

    return (
        <View>
            <CourseHeader
                downloadState={downloadState}
                courseTitle={course}
                courseIcon={'../../../assets/icon.png'}
                courseId={0}
                courseCategory={"category"}
                courseProgress={"progress"}
            >
            </CourseHeader>
            {/*<EasyDynamicList course={course} ></EasyDynamicList>*/}
        </View>
    );
};
