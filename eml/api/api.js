import axios from 'axios';

/* Commented out for avoiding linting errors
 * TODO: move IP address to .env file !!!
const testUrl = 'http://localhost:8888';
const testExpo = 'http://172.30.211.57:8888'; 
const digitalOcean = 'http://207.154.213.68:8888';
*/

const url = 'http://localhost:8888'; // change to lcd ip when testing

/*** COURS, SECTIONS AND EXERCISES ***/

export const getCourseByid = async (courseId) => {
	try {
		const res = await axios.get(url + '/api/courses/' + courseId);
		return res.data;
	} catch (e) {
		if (e?.response?.data != null) {
			throw e.response.data;
		} else {
			throw e;
		}
	}
};

export const getSectionByid = async (sectionId) => {
	try {
		const res = await axios.get(url + '/api/sections/' + sectionId);
		return res.data;
	} catch (e) {
		if (e?.response?.data != null) {
			throw e.response.data;
		} else {
			throw e;
		}

	}
};

export const getExerciseByid = async (exerciseId) => {
	try {
		const res = await axios.get(url + '/api/exercises/' + exerciseId);
		return res.data;
	} catch (e) {
		if (e?.response?.data != null) {
			throw e.response.data;
		} else {
			throw e;
		}
	}
};

// Get specific course

export const getCourse = async (courseId) => {
	try {
		const res = await axios.get(url + '/api/courses/' + courseId);
		return res.data;
	} catch (e) {
		if (e?.response?.data != null) {
			throw e.response.data;
		} else {
			throw e;
		}
	}
};

// Get all courses
export const getCourses = async () => {
	try {
		const res = await axios.get(url + '/api/courses');
		return res.data;
	} catch (e) {
		if (e?.response?.data != null) {
			throw e.response.data;
		} else {
			throw e;
		}
	}
};

// Get all sections for a specific course
export const getAllSections = async (courseId) => {
	try {
		const res = await axios.get(url + '/api/courses/' + courseId + '/sections');
		return res.data;
	} catch (e) {
		if (e?.response?.data != null) {
			throw e.response.data;
		} else {
			throw e;
		}
	}
};

// Get specific section
export const getSection = async (courseId, sectionId) => {
	try {
		const res = await axios.get(
			url + '/api/courses/' + courseId + '/sections/' + sectionId
		);
		return res.data;
	} catch (e) {
		if (e?.response?.data != null) {
			throw e.response.data;
		} else {
			throw e;
		}
	}
};

// Get all exercises in a specific section:
export const getExercisesInSection = async (courseId, sectionId) => {
	try {
		const res = await axios.get(
			url + '/api/courses/' + courseId + '/sections/' + sectionId + '/exercises'
		);
		return res.data;
	} catch (e) {
		if (e?.response?.data != null) {
			throw e.response.data;
		} else {
			throw e;
		}
	}
};

/*** SUBSCRIPTION ***/

// Get user subsribtions
export const getSubscriptions = async (userId) => {
	try {
		// maybe not best practise to pass user ID as request query
		// but this is the only format where it works
		// passing user ID as request body for get request gives error
		const res = await axios.get(
			url + '/api/users/' + userId + '/subscriptions'
		);

		return res.data;
	} catch (e) {
		if (e?.response?.data != null) {
			throw e.response.data;
		} else {
			throw e;
		}
	}
};

// Subscribe to course
export const subscribeToCourse = async (userId, courseId) => {
	try {
		await axios.post(
			url + '/api/courses/' + courseId + '/subscribe',
			{
				user_id: userId,
			}
		);
	} catch (e) {
		if (e?.response?.data != null) {
			throw e.response.data;
		} else {
			throw e;
		}
	}
};

// Unubscribe to course
export const unSubscribeToCourse = async (userId, courseId) => {
	try {
		await axios.post(
			url + '/api/courses/' + courseId + '/unsubscribe',
			{
				user_id: userId,
			}
		);
	} catch (e) {
		if (e?.response?.data != null) {
			throw e.response.data;
		} else {
			throw e;
		}
	}
};

export const ifSubscribed = async (userId, courseId) => {
	try {
		// maybe not best practise to pass user ID as request query
		// but this is the only format where it works
		// passing user ID as request body for get request gives error
		const res = await axios.get(
			url +
        '/api/users/subscriptions?user_id=' +
        userId +
        '&' +
        'course_id=' +
        courseId
		);

		return res.data;
	} catch (e) {
		if (e?.response?.data != null) {
			throw e.response.data;
		} else {
			throw e;
		}
	}
};
