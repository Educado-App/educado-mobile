import axios from 'axios'

const prod = 'http://educado.somethingnew.dk'
const test = 'http://192.168.229.56:8888' // Change this to your LOCAL IP address when testing.
const local = 'http://localhost:8888'

const url = test

export const registerUser = async (obj) => {
  const res = await axios.post(url + '/api/eml/register', obj)
  return res.data
}

export const loginUser = async (obj) => {
  const res = await axios.post(url + '/api/eml/login', obj)
  return res.data
}

export const deleteUser = async(user_id) => {
    const res = await axios.delete(url + "/api/eml/delete/" + user_id);
    return res.data;
}

// send the POST request to enroll in a course
export const enrollInCourse = async (user_Id, course_Id) => {
  try {
    // When user enrolls in a course it sends the course id to the database,
    // and then stores the course and completion status in the user document.
    const res = await axios.post(url + '/api/eml/' + user_Id + '/enroll/' + course_Id);

    // if the course does not already exist in the user's activeCourses list, return the response data
    if (!res.data.course) {
      return res.data;
    }

    // if the course already exists, return the information about the existing course
    return {
      course: response.data.course,
    };
  } catch (err) {
    // if there is an error, return the error message
    return err.message;
  }
};

export const updateCourseStatus = async (user_id, course_id) => {
    // When user completes course it should update the user document from 
    // isComplete: false, to isComplete: true for that course
    const res = await axios.post(url + '/api/eml/' + user_id + '/updateCourse/' + course_id);
    return res.data
}

export const updateSectionStatus = async (user_id, section_id) => {
    // When user completes section it should update the user document from 
    // isComplete: false, to isComplete: true for that section
    const res = await axios.post(url + '/api/eml/' + user_id + '/updateSection/' + section_id);
    return res.data
}

export const updateExerciseStatus = async (user_id, exercise_id) => {
    // When user completes an exercise it should update the user document from 
    // isComplete: false, to isComplete: true for that exercise
    const res = await axios.post(url + '/api/eml/' + user_id + '/updateExercise/' + exercise_id);
    return res.data
}
