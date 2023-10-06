import axios from 'axios'

const prod = 'http://educado.somethingnew.dk'
const test = 'http://192.168.1.31:8888' // Change this to your LOCAL IP address when testing.
const local = 'http://localhost:8888'
const digitalOcean = 'http://207.154.213.68:8888'

const url = digitalOcean;

export const registerUser = async (obj) => {
  const res = await axios.post(url + '/api/eml/register', obj)
  return res.data
}

export const loginUser = async (obj) => {
  const res = await axios.post(url + '/api/eml/login', obj)
  return res.data
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
    const res = await axios.put(url + `/api/user/update-first_name/` + user_id, { newFirstName: new_FirstName });
    return res.data;
  } catch (error) {
    // Handle errors here
    throw error; // You may want to handle the error or log it
  }
};

export const updateLastName = async (user_id, new_LastName) => {
  try {
    const res = await axios.put(url + `/api/user/update-last_name/` + user_id, { newLastName: new_LastName });
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

