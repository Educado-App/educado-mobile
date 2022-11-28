import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import EasyDynamicList from './EasyDynamicList';
import CourseHeader from '../courses/CourseHeader';

export default function CourseListUI({ course }) {

    return (
        <View>
            <CourseHeader
                courseTitle={course.title}
                courseIcon={course.iconPath}
            ></CourseHeader>
            <EasyDynamicList courseData={course} ></EasyDynamicList>
        </View>
    );
};
