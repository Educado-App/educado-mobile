import axios from 'axios';

const testUrl = 'http://localhost:8888';
const testExpo = 'http://172.30.245.130:8888'; //Change to local expo ip
const digitalOcean = 'http://207.154.213.68:8888';

const url = testUrl;

/*** COURS, SECTIONS AND EXERCISES ***/

// Get specific course

export const getCourse = async (courseId) => {
  try {
    const res = await axios.get(url + '/api/courses/' + courseId)
    return res.data;

  } catch (error) {
    throw new Error("Error getting specific course: " + error);
  }
};

// Get all courses
export const getCourses = async () => {
  try {
    const res = await axios.get(url + '/api/courses')
    return res.data;

  } catch (error) {
    throw new Error("Error getting all courses: " + error);
  }
};

// Get all sections for a specific course
export const getAllSections = async (courseId) => {

  try {
    const res = await axios.get(url + '/api/courses/' + courseId + '/sections');
    return res.data;

  } catch (error) {
    throw new Error("Error getting all sections: " + error);
  }

};

// Get specific section
export const getSection = async (courseId, sectionId) => {
  try {
    const res = await axios.get(url + '/api/courses/' + courseId + '/sections/' + sectionId);
    return res.data;
  }
  catch (error) {
    throw new Error("Error getting specific section: " + error);
  }
};

// Get all exercises in a specific section:
export const getExercisesInSection = async (courseId, sectionId) => {
  try {
    const res = await axios.get(url + '/api/courses/' + courseId + '/sections/' + sectionId + '/exercises');
    return res.data;

  } catch (error) {
    throw new Error("Error getting exercises in section: " + error);
  }

};


/*** SUBSCRIPTION ***/

// Get user subsribtions
export const getSubscriptions = async (userId) => {

  try {

    // maybe not best practise to pass user ID as request query
    // but this is the only format where it works
    // passing user ID as request body for get request gives error
    const res = await axios.get(url + '/api/users/' + userId + '/subscriptions')

    return res.data;

  } catch (error) {
    throw new Error("Error getting user subscriptions: " + error);
  }


};


// Subscribe to course
export const subscribeToCourse = async (userId, courseId) => {

try {
  const res = await axios.post(url + '/api/courses/' + courseId + '/subscribe', {
    user_id: userId
  });
}
catch(error) {
      throw new Error("Error subscribing to course: " + error.message)
}

};

// Unubscribe to course
export const unSubscribeToCourse = async (userId, courseId) => {

  try {
    const res = await axios.post(url + '/api/courses/' + courseId + '/unsubscribe', {
      user_id: userId
    });
  }

  catch(error){
      throw new Error("Error unsubscribing to course: " + error.message)
  }
};

export const ifSubscribed = async (userId, courseId) => {

  try {

    // maybe not best practise to pass user ID as request query
    // but this is the only format where it works
    // passing user ID as request body for get request gives error
    const res = await axios.get(url + '/api/users/subscriptions?user_id=' + userId + '&' + 'course_id=' + courseId);

    return (res.data);

  } catch (error) {
    throw new Error("Error getting user subscriptions: " + error);
  }

}