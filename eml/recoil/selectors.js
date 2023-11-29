import { selector } from 'recoil';

import { getCourses } from './../api/api';

export const activeCourse = selector({
	key: 'activeCourse',
	get: async () => {
		const response = await getCourses();
		return response[1];
	},
});

export const allCourses = selector({
	key: 'allCourses',
	get: async () => {
		const response = await getCourses();
		return response;
	},
});