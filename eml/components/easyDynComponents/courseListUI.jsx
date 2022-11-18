import React from 'react';
import { View } from 'react-native';
import EasyDynamicList from './EasyDynamicList';
import CourseHeader from '../courses/CourseHeader';

export default function CourseListUI({ course }) {

    return (
        <View>
            <CourseHeader
                courseTitle={course.title}
                courseIcon={course.iconPath}
            ></CourseHeader>
            <View>
                <EasyDynamicList courseData={course} ></EasyDynamicList>
            </View>
        </View>
    );
};