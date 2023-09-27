import axios from 'axios';

const testUrl = 'http://localhost:8888';
const testExpo = 'http://172.30.211.249:8888'; //Change to local expo ip
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
  const res = await axios.post(url + '/auth/jwt', authBody);
  return res.data;
};

export const getTestCourse = async () => {
  const res = await axios.get(url + '/api/course/650c01f06fe6094f6214a487');
    return res.data;
};

export const getCoursesWithAuth = async () => {
  const res = await axios.get(url + '/api/courses', config);
  return res.data;
};

export const getCourseWithAuth = async (courseId) => {
  const res = await axios.get(url + '/api/courses/' + courseId, config);
  return res.data;
};

export const getCourses = async () => {
  // TODO: add bearer token to request header and omit /public
  const res = await axios.get(url + '/api/courses');
  return res.data;
};

export const getCourse = async (courseId) => {
  const res = await axios.get(url + '/api/courses/' + courseId);
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

export const getAllSections = async (sections) => {
  const obj = {
    sections,
  };
  // Send request to S3 server
  const res = await axios.post(url + '/api/eml/course/getallsections', obj);

  return res.data;
};

export const getAllComponents = async (components) => {
  const obj = {
    components,
  };
  // Send request to S3 server
  const res = await axios.post(url + '/api/component/getallcomponents', obj);
  return res.data;
};

// subscribe to course
export const subscribeToCourse = async (course_id) => {
  // Send request to S3 server
  const res = await axios.post(url + '/api/course/eml/' + course_id + '/subscribe');



  return res.data;
};


// get user subsribtions
export const getSubsribtions = async (user_id) => {

  // Send request to S3 server
  const res = await axios.get(url + '/api/' + user_id + '/subscription/getAll');

  return res.data;
};


export const subscribeToCourse = async() => {

  // TODO: replace with real credentials, when login is working
  const res = await axios.post(url + '/api/course/subscribe', {
    course_id: '650c01f06fe6094f6214a487', 
    user_id: '65116200ce1f2c4eb06fba5b'
  })
  .then(response => {
    console.log("YAY! Du er subscribet" + response)
  })
  .catch(error => {
    console.log("OMG nei, du er ikke subscribet" + error)
  })

};

export const unSubscribeToCourse = async() => {

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

export function subscribe(value) {

  if (value == true) {
    unSubscribeToCourse();
  } else {
    subscribeToCourse();
  }

};