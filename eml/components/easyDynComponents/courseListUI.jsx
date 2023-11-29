import React from 'react';
import { View } from 'react-native';
import EasyDynamicList from './EasyDynamicList';
import CourseHeader from '../courses/CourseHeader';
import PropTypes from 'prop-types';

export default function CourseListUI({ course, downloadState }) {

	return (
		<View>
			<CourseHeader
				downloadState={downloadState}
				courseTitle={course.title}
				courseIcon={course.icon}
				courseId={course.id}
			></CourseHeader>
			<EasyDynamicList course={course} ></EasyDynamicList>
		</View>
	);
}

CourseListUI.propTypes = {
	course: PropTypes.object,
	downloadState: PropTypes.object,
};