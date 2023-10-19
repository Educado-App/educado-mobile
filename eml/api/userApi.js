import axios from 'axios'

const prod = 'http://educado.somethingnew.dk'
const test = 'http://172.30.245.19:8888' // Change this to your LOCAL IP address when testing.
const local = 'http://localhost:8888'
const digitalOcean = 'http://207.154.213.68:8888'

const url = test;

/**
 * This is the client that will be used to make requests to the backend.
 */
export const client = axios.create({
  baseURL: test,
  withCredentials: true,
  responseType: 'json',
  timeout: 30000,
});

/**
 * Sends a request to the backend to register a new user.
 * @param {Object} obj Should contain the following properties:
 * - firstName
 * - lastName
 * - email
 * - password
 */
export const registerUser = async (obj) => {
  console.log(`User trying to register:
    firstName: ${obj.firstName ?? 'undefined'}
    lastName: ${obj.lastName ?? 'undefined'}
    email: ${obj.email ?? 'undefined'}`);

  try {
    const res = await client.post('/api/signup/user', obj);
    console.log('User successfully registered');
    return res.data;
  } catch (e) {
    if (e.response.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
}

/**
 * Sends a request to the backend to login an existing user.
 * @param {Object} obj should contain the following properties:
 * - email
 * - password
*/
export const loginUser = async (obj) => {
  try {
    const res = await client.post('/api/auth/login', obj);
    console.log('User successfully registered');
    return res.data;
  } catch (e) {
    if (e.response.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
}

export const deleteUser = async (user_id) => {
  try {
    const res = await axios.delete(url + `/api/user/delete/` + user_id);
    return res.data;
  } catch (error) {
    // Handle errors here
    throw error; // You may want to handle the error or log it
  }
};

export const updateFirstName = async (user_id, new_FirstName) => {
  try {
    const res = await axios.put(url + `/api/user/update-first-name/` + user_id, { newFirstName: new_FirstName });
    return res.data;
  } catch (error) {
    // Handle errors here
    throw error; // You may want to handle the error or log it
  }
};

export const updateLastName = async (user_id, new_LastName) => {
  try {
    const res = await axios.put(url + `/api/user/update-last-name/` + user_id, { newLastName: new_LastName });
    return res.data;
  } catch (error) {
    // Handle errors here
    throw error; // You may want to handle the error or log it
  }
};

export const updateUserEmail = async (user_id, new_email) => {
  try {
    const res = await axios.put(url + `/api/user/update-email/` + user_id, { newEmail: new_email });
    return res.data;
  } catch (error) {
    // Handle errors here
    throw error; // You may want to handle the error or log it
  }
};

export const enrollInCourse = async (user_Id, course_Id) => {
  try {
    // When user enrolls in a course it sends the course id to the database,
    // and then stores the course and completion status in the user document.
    const res = await axios.post(url + '/api/eml/' + user_Id + '/enroll/' + course_Id);

    // First time user enrolls in course
    if (!res.data.course) {
      return res.data
    }

    // if the course already exists, return the completion status of the course, sections, and exercises
    return {
      courseCompletion: res.data.course.isComplete,
      sectionCompletion: res.data.course.sections.map(section => section.isComplete),
      exerciseCompletion: res.data.course.sections.map(section => section.exercises.map(exercise => exercise.isComplete))
    };
  } catch (err) {
    return err.message;
  }
};

export const updateCourseStatus = async (user_id, course_id) => {
  // When user completes course it should update the user document from
  // isComplete: false, to isComplete: true for that course
  const res = await axios.put(url + '/api/eml/' + user_id + '/updateCourse/' + course_id);
  return res.data;
}

export const updateSectionStatus = async (user_id, course_id, section_id) => {
  // When user completes section it should update the user document from
  // isComplete: false, to isComplete: true for that section
  const res = await axios.put(url + '/api/eml/' + user_id + '/updateSection/' + course_id + '/' + section_id);
  return res.data;
}

export const updateExerciseStatus = async (user_id, course_id, section_id, exercise_id) => {
  // When user completes an exercise it should update the user document from
  // isComplete: false, to isComplete: true for that exercise
  const res = await axios.put(url + '/api/eml/' + user_id + '/updateExercise/' + course_id + '/' + section_id + '/' + exercise_id);
  return res.data;
}

export const sendResetPasswordEmail = async (email) => {
  try {
    const res = await axios.post(url + '/api/auth/reset-password-request', email);
    return res.data;
  } catch (e) {
    if (e.response.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

export const validateResetPasswordCode = async (obj) => {
  try {
    const res = await axios.post(url + '/api/auth/reset-password-code', obj);
    return res.data;
  } catch (e) {
    if (e.response.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }

};

export const enterNewPassword = async (obj) => {
  try {
  const res = await axios.put(url + '/api/auth/reset-password', obj);
  return res.data;
  } catch (e) {
    if (e.response.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};