import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const testUrl = "http://localhost:8888";
const testExpo = "http://172.30.212.33:8888"; //Change to local expo ip
const digitalOcean = "http://207.154.213.68:8888";

const url = testExpo;
/*

//CREATED BY VIDEOSTREAMING TEAM
export const downloadVideoByFileName = async (fileName) => {
  try {
    console.log(`${url}/api/content/video/?fileName=${fileName}`);
    const res = await axios.get(
      `${url}/api/content/video/?fileName=${fileName}`
    );
    console.log("res.data", res);
    console.log("res.data", res);
    // const workingUrl = { uri: `data:video/mp4;base64,${res.data}` };
    const workingUrl = { uri: res.request.responseURL };
    return workingUrl;
  } catch (err) {
    console.log("Error getting bucket video", err);
  }
};

/**
 *
 * @param {* name of video in bucketRoute, should be the same as lecture id} fileId
 * @param {* use 360p, 720p or 1080p - standard is 360p} resolution
 */
export const getVideoDownloadUrl = (fileName, resolution) => {
  let usableResolution = "360x640";

  switch (resolution) {
    case "180p":
      usableResolution = "180x320";
      break;
    case "360p":
      usableResolution = "360x640";
      break;
    case "720p":
      usableResolution = "720x1280";
      break;
    case "1080p":
      usableResolution = "1080x1920";
      break;
    default:
      usableResolution = "360x640";
      break;
  }
  const _vidUrl = `${url}/api/content/stream/${fileName}_transcoded${usableResolution}.mp4`;
  console.log("VIDEO URL FROM API", _vidUrl);
  return _vidUrl;
};

export const getBucketImage = async (fileName) => {
  try {
    console.log(`${url}/api/content/download?fileName=${fileName}`);
    const res = await axios.get(
      `${url}/api/content/download?fileName=${fileName}`
    );
    const workingUrl = `data:image/png;base64,${res.data}`;
    return workingUrl;
  } catch (err) {
    console.log("Error getting bucket image", err);
    return null;
  }
};


/*** COURS, SECTIONS AND EXERCISES ***/

// Get specific course

export const getCourse = async (courseId) => {
  try {
    const res = await axios.get(url + "/api/courses/" + courseId);
    return res.data;

  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

// Get all courses
export const getCourses = async () => {
  try {
    const res = await axios.get(url + "/api/courses");
    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

//CREATED BY VIDEO STREAMING TEAM
export const getSectionAndLecturesBySectionId = async (sectionId) => {
  try {
    const res = await axios.get(url + "/api/courses/section/" + sectionId);
    return res.data;
  } catch (err) {
    console.log("Error getting section and lectures by section id", err);
    return null;
  }
};

export const getLectureById = async (lectureId) => {
  try {
    const res = await axios.get(url + "/api/lectures/" + lectureId);
    return res.data;
  } catch (err) {
    return null;
  }
    
};

// Get all sections for a specific course
export const getAllSections = async (courseId) => {
  try {
    const res = await axios.get(url + "/api/courses/" + courseId + "/sections");
    return res.data;

  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

// Get specific section
export const getSection = async (courseId, sectionId) => {
  try {
    const res = await axios.get(
      url + "/api/courses/" + courseId + "/sections/" + sectionId
    );
    return res.data;

  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

// Get all exercises in a specific section:
export const getExercisesInSection = async (courseId, sectionId) => {
  try {
    const res = await axios.get(
      url + "/api/courses/" + courseId + "/sections/" + sectionId + "/exercises"
    );
    return res.data;

  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};


/*** SUBSCRIPTION ***/

// Get user subsribtions
export const getSubscriptions = async (userId) => {

  try {

    // maybe not best practise to pass user ID as request query
    // but this is the only format where it works
    // passing user ID as request body for get request gives error
    const res = await axios.get(
      url + "/api/users/" + userId + "/subscriptions"
    );

    return res.data;

  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

// Subscribe to course
export const subscribeToCourse = async (userId, courseId) => {

try {
  const res = await axios.post(url + '/api/courses/' + courseId + '/subscribe', {
    user_id: userId
  });
} catch (e) {
  if (e?.response?.data != null) {
    throw e.response.data;
  } else {
    throw e;
  }
}

};

// Unubscribe to course
export const unSubscribeToCourse = async (userId, courseId) => {

  try {
    const res = await axios.post(url + '/api/courses/' + courseId + '/unsubscribe', {
      user_id: userId
    });
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

export const ifSubscribed = async (userId, courseId) => {

  try {

    // maybe not best practise to pass user ID as request query
    // but this is the only format where it works
    // passing user ID as request body for get request gives error
    const res = await axios.get(url + '/api/users/subscriptions?user_id=' + userId + '&' + 'course_id=' + courseId);
    return (res.data);

  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }

}
