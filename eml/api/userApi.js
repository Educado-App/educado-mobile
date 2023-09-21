import axios from 'axios'

const prod = 'http://educado.somethingnew.dk'
const test = `http://192.168.0.103:8888` // Change this to your LOCAL IP address when testing.
const local = 'http://localhost:8888'
const digitalOcean = 'http://207.154.213.68:8888'

const url = test;

export const client = axios.create({
  baseURL: test,
  withCredentials: true,
  responseType: 'json',
  timeout: 30000,
});

export const registerUser = async (obj) => {
  console.log(obj)
  console.log(client);
  const res = await client.post('/api/signup/user', obj)
  return res.data
}

/*export const registerUser = async (obj) => {
  const res = await client.get('/api/hello/helloworld')
  console.log(res)
  return res.data
}*/

export const loginUser = async (obj) => {
  const res = await axios.post(url + '/api/eml/login', obj)
  return res.data
}

export const deleteUser = async(user_id) => {
    const res = await axios.delete(url + "/api/eml/delete/" + user_id);
    return res.data;
}

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

