import axios from 'axios';

const testUrl = 'http://localhost:8888';
const testExpo = 'http://172.30.242.170:8888'; //Change to local expo ip
const digitalOcean = 'http://207.154.213.68:8888';

const url = testExpo;

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
  const res = await axios.get(
    url + '/api/public/courses/635fb5b9b2fb6c4f49084682'
  );
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
  const res = await axios.get(url + '/api/public/courses');
  return res.data;
};

export const getCourse = async (courseId) => {
  const res = await axios.get(url + '/api/public/courses/' + courseId);
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
