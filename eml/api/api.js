import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const testUrl = 'http://localhost:8888';
const testExpo = 'http://192.168.1.133:19000'; //Change to local expo ip
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

export const getCourses = async () => {
  // TODO: add bearer token to request header and omit /public
  const res = await axios.get(url + '/api/courses/all')
  .then(response => {
    console.log("Success", response)
  })
  .catch(error => {
    console.log("Error" + error)
  })
  return res.data;
};

export const getCourse = async (courseId) => {
  const res = await axios.get(url + '/api/courses/' + courseId)
  .then(response => {
    console.log("Success", response)
  })
  .catch(error => {
    console.log("Error" + error)
  })
  return res.data;
};

// TODO: Endpoint for getcoursebyid && change getCourses to getCourseList

export const getPresignedUrl = async (component_id) => {
  const obj = {
    component_id,
  };
  const res = await axios.post(url + '/api/get-presigned-url', obj)
  .then(response => {
    console.log("Success", response)
  })
  .catch(error => {
    console.log("Error" + error)
  })
  return res.data;
};


//CREATE FOR TESTING: BUT IT WORKS
// * try to call the function with fileName = "test" or "gorilla".
// * It is being called for testing purposes in the Explore screen
/*
export const getBucketImage = async (fileName) => {
  const res = await axios.get(`${url}/download?fileName=${fileName}`);
  
  if (res.status === 200) {
    return res.data;
  }
  else {
    return null;
  }
}
*/


export const getCoverPhoto = async (course_id) => {
  const obj = {
    course_id,
  };
  // Send request to S3 server
  const res = await axios.post(url + '/api/eml/get-presigned-url', obj)
  .then(response => {
    console.log("Success", response)
  })
  .catch(error => {
    console.log("Error" + error)
  })
  return res.data;
};

export const getAllSections = async (sections) => {
  const obj = {
    sections,
  };
  // Send request to S3 server
  const res = await axios.post(url + '/api/eml/course/getallsections', obj)
  .then(response => {
    console.log("Success", response)
  })
  .catch(error => {
    console.log("Error" + error)
  })

  return res.data;
};

export const getAllComponents = async (components) => {
  const obj = {
    components,
  };
  // Send request to S3 server
  const res = await axios.post(url + '/api/component/getallcomponents', obj)
  .then(response => {
    console.log("Success", response)
  })
  .catch(error => {
    console.log("Error" + error)
  })
  return res.data;
};


// Get user subsribtions
export const getSubsribtions = async () => {

  // Send request -- TODO: replace with real credentials, when login is working
  const res = await axios.get(url + '/api/' + user_id + '/subscription/all', {
      user_id: '65116200ce1f2c4eb06fba5b'
    })
    .then(response => {
      console.log("Success", response)
    })
    .catch(error => {
      console.log("Error" + error)
    })

  return res.data;
};


// Subscribe to course
export const subscribeToCourse = async() => {

  const userId = await AsyncStorage.getItem("@userId");

// Send request -- TODO: replace with real credentials, when login is working
const res = await axios.post(url + '/api/course/subscribe', {
  course_id: '650c01f06fe6094f6214a487', 
  user_id: userId
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

export async function checkIfSubscribed(courseId) { 

  const userId = await AsyncStorage.getItem("@userId");

  

  
}