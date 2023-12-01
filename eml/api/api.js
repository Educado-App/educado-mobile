import axios from 'axios';

const timeoutInMs = 1200;

const url = 'https://educado-backend-staging-x7rgvjso4a-ew.a.run.app/';// Change this to your LOCAL IP address when testing.

const certificateUrl = 'http://172.30.245.212:8080';

/* Commented out for avoiding linting errors :))
 * TODO: move IP address to .env file !!!
const testUrl = 'http://localhost:8888';
const testExpo = 'http://172.30.211.57:8888'; 
const digitalOcean = 'http://207.154.213.68:8888';
*/

/*** COURSE, SECTIONS AND EXERCISES ***/

// Get components for a specific section
export const getComponents = async (sectionId) => {
	try {
		const res = await axios.get(url + '/api/courses/sections/' + sectionId + '/components');
		return res.data;
	} catch (e) {
		if (e?.response?.data != null) {
			throw e.response.data;
		} else {
			throw e;
		}
	}
};

export const getSectionById = async (sectionId) => {
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

// Get specific course

export const getCourse = async (courseId) => {
	try {
		const res = await axios.get(url + '/api/courses/' + courseId, {timeout: timeoutInMs});
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
		const res = await axios.get(url + '/api/courses/' + courseId + '/sections', {timeout: timeoutInMs});
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
// ************* same as getSectionById *************
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


// Get all lectures in a specific section:
export const getLecturesInSection = async (sectionId) => {
	try {
		const res = await axios.get(
			url + '/api/lectures/section/' + sectionId
			, {timeout: timeoutInMs});
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

// Get user subscriptions
export const getSubscriptions = async (userId) => {
	try {
		// maybe not best practise to pass user ID as request query
		// but this is the only format where it works
		// passing user ID as request body for get request gives error
		const res = await axios.get(
			url + '/api/students/' + userId + '/subscriptions',
			{timeout: 1200});

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

// Unsubscribe to course
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


// Get certificates from student
export const fetchCertificates = async (userId) => {
	try {
		if (userId == null) {
			throw 'User ID is null';
		}
		const res = await axios.get(certificateUrl + '/api/student-certificates/student/' + userId);
		return res.data;
	}  catch (e) {
		if (e?.response?.data != null) {
			throw e.response.data;
		} else {
			throw e;
		}
	}
};

//CREATED BY VIDEO STREAM TEAM
/*This will be improved in next pull request to handle getting different resolutions properly 
with our new video streaming service in go.
*/

export const getVideoStreamUrl = (fileName, resolution) => {

	let resolutionPostfix;
	switch (resolution) {
	case '360':
		resolutionPostfix = '_360x640';
		break;
	case '480':
		resolutionPostfix = '_480x854';
		break;
	case '720':
		resolutionPostfix = '_720x1280';
		break;
	case '1080':
		resolutionPostfix = '_1080x1920';
		break;
	default:
		resolutionPostfix = '_360x640';
	}

	return `${url}/api/bucket/stream/${fileName}${resolutionPostfix}.mp4`;
};

export const getLectureById = async (lectureId) => {
	try {
		const res = await axios.get(url + '/api/lectures/' + lectureId);
		return res.data;
	} catch (err) {
		if (err?.response?.data != null) {
			throw err.response.data;
		} else {
			throw err;
		}
	}

};


export const getBucketImage = async (fileName) => {
	try {
		const res = await axios.get(
			`${url}/api/bucket/${fileName}`
			, {timeout: timeoutInMs});
		return `data:image/png;base64,${res.data}`;
	} catch (err) {
		if (err?.response?.data != null) {
			throw err.response.data;
		} else {
			throw err;
		}
	}
};

