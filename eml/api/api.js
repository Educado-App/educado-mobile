import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const testUrl = 'http://localhost:8888';
const testExpo = 'http://192.168.170.60:8888'; //Change to local expo ip
const digitalOcean = 'http://207.154.213.68:8888';

const url = testUrl;

// Find a solution to refresh auth-token
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

export const getTestCourse = async () => {
  const res = await axios.get(url + '/api/course/650c01f06fe6094f6214a487')
  .then(response => {
    console.log("Success", response)
  })
  .catch(error => {
    console.log("Error" + error)
  })
    return res.data;
};

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

export const getSection = async (courseId, sectionId) => {
  const res = await axios.get(url + '/api/course/' + courseId + '/section/' + sectionId);
  return res.data;
};

export const getAllSections = async (courseId) => {
  const res = await axios.get(url + '/api/course/' + courseId + '/sections/all');
  return res.data;
};

export const getExercisesInSection = async (courseId, sectionId) => {
  const res = await axios.get(url + '/api/course/' + courseId + '/section/' + sectionId + '/exercises/all');
  return res.data;
};

export const getAllComponents = async (components) => {
  const obj = {
    components,
  };
  // Send request to S3 server
  const res = await axios.post(url + '/api/components/all', obj);
  return res.data;
};

/*** COURSE ***/

export const getCourses = async () => {
  const res = await axios.get(url + '/api/courses/all')
  return res.data;

};

/****** SUBSCRIPTION *******/

// Get user subsribtions
export const getSubscriptions = async () => {

  const userId = await AsyncStorage.getItem("@userId");
  
  const res = await axios.get(url + '/api/user/subscription/all?user_id=' + userId)

  return res.data;
};


// Subscribe to course
export async function subscribeToCourse(courseId) { 

  const userId = await AsyncStorage.getItem("@userId");

// Send request -- TODO: replace with real credentials, when login is working
const res = await axios.post(url + '/api/course/subscribe', {
  user_id: userId,
  course_id: courseId
})
.then(response => {
  console.log("YAY! Du er subscribet " + response)
})
.catch(error => {
  console.log("OMG nei, du er ikke subscribet" + error)
})

};

// Unubscribe to course
export const unSubscribeToCourse = async() => {

  // Send request -- TODO: replace with real credentials, when login is working
  const res = await axios.post(url + '/api/course/unsubscribe', {
    course_id: '650c01f06fe6094f6214a487', 
    user_id: '65116200ce1f2c4eb06fba5b'
  })
  .then(response => {
    console.log("YAY! Du er unsubscribet" + response)
  })
  .catch(error => {
    console.log("OMG nei, du er ikke unsubscribet" + error)
  })
};

export async function ifSubscribed(courseId) { 


  const userId = await AsyncStorage.getItem("@userId");
  try {
    const res = await axios.get(url + '/api/user?user_id=' + userId + '&' + 'course_id=' + courseId);

    return(res.data);

  } catch (error) {
    console.log("ERROR", error);
  }

}

