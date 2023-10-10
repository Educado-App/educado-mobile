import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const testUrl = 'http://localhost:8888';
const testExpo = 'http://192.168.0.224:8888'; //Change to local expo ip
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
  const res = await axios.get(url + '/api/course/650c01f06fe6094f6214a487')
  .then(response => {
    console.log("Success", response)
  })
  .catch(error => {
    console.log("Error" + error)
  })
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


//CREATE FOR TESTING: BUT IT WORKS
// * try to call the function with fileName = "test" or "gorilla".
// * It is being called for testing purposes in the Explore screen
export const getBucketImage = async (fileName) => {
  
  
  try {
    const res = await axios.get(`${url}/download?fileName=${fileName}`);
    const workingUrl = { uri: `data:image/png;base64,${res.data}` }
    return workingUrl
}
catch (err) {
  console.log("Error getting bucket image",err);
}
}


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
  const res = await axios.get(url + '/api/courses/' + courseId)
  return res.data;

};

// Get all courses
export const getCourses = async () => {
  const res = await axios.get(url + '/api/courses')
  return res.data;

};

export const getSection = async (courseId, sectionId) => {
  const res = await axios.get(url + '/api/courses/' + courseId + '/sections/' + sectionId);
  return res.data;
};

export const getAllSections = async (courseId) => {
  const res = await axios.get(url + '/api/courses/' + courseId + '/sections');
  return res.data;
};

export const getExercisesInSection = async (courseId, sectionId) => {
  const res = await axios.get(url + '/api/courses/' + courseId + '/sections/' + sectionId + '/exercises');
  return res.data;
};


/*** SUBSCRIPTION ***/

// Get user subsribtions
export const getSubscriptions = async () => {

  const userId = await AsyncStorage.getItem("@userId");
  
  // maybe not best practise to pass user ID as request query
  // but this is the only format where it works
  // passing user ID as request body for get request gives error
  const res = await axios.get(url + '/api/users/' +  userId + ' /subscriptions')

  return res.data;
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
  console.log("YAY! Du er nu subscribet " + response)
})
.catch(error => {
  console.log("OMG nei, du er ikke blevet subscribet" + error)
})

};

// Unubscribe to course
export async function unSubscribeToCourse (courseId) {

  const userId = await AsyncStorage.getItem("@userId");
  const courseID = courseId;

  const res = await axios.post(url + '/api/courses/' + courseID + '/unsubscribe', {
    user_id: userId
  })
  .then(response => {
    console.log("YAY! Du er nu unsubscribet" + response)
  })
  .catch(error => {
    console.log("OMG nei, du er ikke blevet unsubscribet" + error)
  })
};

export async function ifSubscribed(courseId) { 


  const userId = await AsyncStorage.getItem("@userId");
  try {

    // maybe not best practise to pass user ID as request query
    // but this is the only format where it works
    // passing user ID as request body for get request gives error
    const res = await axios.get(url + '/api/users?user_id=' + userId + '&' + 'course_id=' + courseId);

    return(res.data);

  } catch (error) {
    console.log(error);
  }

}

