import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const testUrl = 'http://localhost:8888';
const testExpo = 'http://172.30.245.130:8888'; //Change to local expo ip
const digitalOcean = 'http://207.154.213.68:8888';

const url = testUrl;

// TODO: Find a solution to refresh auth-token
const authToken = '';
const authBody = {
  email: 'demo@gmail.com',
  password: 'Demo1234',
};
const config = {
  headers: {
    Authorization: 'Bearer ' + authToken,
  },
};


export const getAuthToken = async () => {
  const res = await axios.post(url + '/auth/jwt', authBody)
    .then(response => {
      console.log("Success", response)
    })
    .catch(error => {
      console.log("Error" + error)
    })
  return res.data;
};
/*

export const getTestCourse = async () => {
  const res = await axios.get(
    url + '/api/public/courses/635fb5b9b2fb6c4f49084682'
  );
  return res.data;
};

//This function is never called. Is it needed? -Stefan 8/10/23
export const getCoursesWithAuth = async () => {
  const res = await axios.get(url + '/api/courses', config)

  .then(response => {
    console.log("Success", response)
  })
  .catch(error => {
    console.log("Error" + error)
  })
  return res.data;
};

export const getCourseWithAuth = async (courseId) => {
  const res = await axios.get(url + '/api/courses/' + courseId, config);
  return res.data;
};

export const getCourse = async (courseId) => {
  const res = await axios.get(url + '/api/course/' + courseId)
  return res.data;
};


// TODO: Endpoint for getcoursebyid && change getCourses to getCourseList

export const getPresignedUrl = async (component_id) => {
  const obj = {
    component_id,
  };
  const res = await axios.post(url + '/api/get-presigned-url', obj);
  return res.data;
};

export const getCoverPhoto = async (course_id) => {
  const obj = {
    course_id,
  };
  // Send request to S3 server
  const res = await axios.post(url + '/api/eml/get-presigned-url', obj);
  return res.data;
};

export const getAllComponents = async (components) => {
  const obj = {
    components,
  };
  // Send request to S3 server
  const res = await axios.post(url + '/api/component/all', obj);
  return res.data;
};

*/

/*** COURS, SECTIONS AND EXERCISES ***/

// Get specific course

export const getCourse = async (courseId) => {
  try {
    const res = await axios.get(url + '/api/courses/' + courseId)
    return res.data;

  } catch (error) {
    console.log("Error getting specific course, error message: " + error);
  }
};

// Get all courses
export const getCourses = async () => {
  try {
    const res = await axios.get(url + '/api/courses')
    return res.data;

  } catch (error) {
    console.log("Error getting all courses, error message: " + error);
  }
};

// Get all sections for a specific course
export const getAllSections = async (courseId) => {

  try {
    const res = await axios.get(url + '/api/courses/' + courseId + '/sections');
    return res.data;

  } catch (error) {
    console.log("Error getting all sections for specific course, error message: " + error);
  }

};

// Get specific section
export const getSection = async (courseId, sectionId) => {
  try {
    const res = await axios.get(url + '/api/courses/' + courseId + '/sections/' + sectionId);
    return res.data;
  }
  catch (error) {
    console.log("Error getting specific section, error message: " + error);
  }
};

// Get all exercises in a specific section:
export const getExercisesInSection = async (courseId, sectionId) => {
  try {
    const res = await axios.get(url + '/api/courses/' + courseId + '/sections/' + sectionId + '/exercises');
    return res.data;

  } catch (error) {
    console.log("Error getting exercises for specific section, error message: " + error);
  }

};


/*** SUBSCRIPTION ***/

// Get user subsribtions
export const getSubscriptions = async () => {

  try {
    const userId = await AsyncStorage.getItem("@userId");

    // maybe not best practise to pass user ID as request query
    // but this is the only format where it works
    // passing user ID as request body for get request gives error
    const res = await axios.get(url + '/api/users/' + userId + '/subscriptions')

    return res.data;

  } catch (error) {
    console.log("Error getting subscriptions, error message: " + error);
  }


};


// Subscribe to course
export async function subscribeToCourse(courseId) {

  const userId = await AsyncStorage.getItem("@userId");
  const courseID = courseId;

  // Send request -- TODO: replace with real credentials, when login is working
  const res = await axios.post(url + '/api/courses/' + courseID + '/subscribe', {
    user_id: userId
  })
    .then(response => {
      console.log("Subscribed successfully: " + response.data)
    })
    .catch(error => {
      console.log("Error subscribing to course: " + error.message)
    })

};

// Unubscribe to course
export async function unSubscribeToCourse(courseId) {

  const userId = await AsyncStorage.getItem("@userId");
  const courseID = courseId;

  const res = await axios.post(url + '/api/courses/' + courseID + '/unsubscribe', {
    user_id: userId
  })
    .then(response => {
      console.log("Unsubscribed successfully: " + response.data)
    })
    .catch(error => {
      console.log("Error unsubscribing to course: " + error.message)
    })
};

export async function ifSubscribed(courseId) {


  const userId = await AsyncStorage.getItem("@userId");
  try {

    // maybe not best practise to pass user ID as request query
    // but this is the only format where it works
    // passing user ID as request body for get request gives error
    const res = await axios.get(url + '/api/users/subscriptions?user_id=' + userId + '&' + 'course_id=' + courseId);

    return (res.data);

  } catch (error) {
    console.log("Error checking if user is subscribed to course: " + error);
  }

}

