import axios from "axios";

const testUrl = "http://localhost:8888";
const testExpo = "http://172.30.254.222:8888"; //Change to local expo ip
const digitalOcean = "http://207.154.213.68:8888";

const url = testUrl;

/*** COURS, SECTIONS AND EXERCISES ***/

export const getCourseByid = async (courseId) => {
  const res = await axios.get(url + "/api/courses/" + courseId);
  return res.data;
};

export const getSectionByid = async (sectionId) => {
  const res = await axios.get(url + "/api/sections/" + sectionId);
  return res.data;
};

export const getExerciseByid = async (exerciseId) => {
  const res = await axios.get(url + "/api/exercises/" + exerciseId);
  return res.data;
};

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
      url + "/api/students/" + userId + "/subscriptions"
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
    const res = await axios.post(
      url + "/api/courses/" + courseId + "/subscribe",
      {
        user_id: userId,
      }
    );
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
    const res = await axios.post(
      url + "/api/courses/" + courseId + "/unsubscribe",
      {
        user_id: userId,
      }
    );
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
    const res = await axios.get(
      url +
        "/api/students/subscriptions?user_id=" +
        userId +
        "&" +
        "course_id=" +
        courseId
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

// Call to backend to see if online
export const checkBackendOnline = async () => {
  let response;
  try {
    const res = await axios.get(url + '/api/utility/online/');
    response = res.data;
  } catch {
    response = false;
  } finally {
    return response;
  }
};

//CREATED BY VIDEOSTREAM TEAM
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
  const _vidUrl = `${url}/api/bucket/stream/${fileName}_transcoded${usableResolution}.mp4`;
  console.log(_vidUrl);
  return _vidUrl;
};

//CREATED BY VIDEO STREAMING TEAM
export const getSectionAndLecturesBySectionId = async (sectionId) => {
  try {
    const res = await axios.get(url + "/api/sections/" + sectionId);
    return res.data;
  } catch (err) {
    if (err?.response?.data != null) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
};

//CREATED BY VIDEO STREAMING TEAM
export const getLectureById = async (lectureId) => {
  try {
    const res = await axios.get(url + "/api/lectures/" + lectureId);
    return res.data;
  } catch (err) {
    if (err?.response?.data != null) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
    
};

//CREATED BY VIDEOSTREAM TEAM
export const getBucketImage = async (fileName) => {
  try {
    const res = await axios.get(
      `${url}/api/bucket/${fileName}`
    );
    const workingUrl = `data:image/png;base64,${res.data}`;
    return workingUrl;
  } catch (err) {
    if (err?.response?.data != null) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
};
