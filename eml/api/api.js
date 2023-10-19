import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const testUrl = "http://localhost:8888";
const testExpo = "http://172.30.213.227:8888"; //Change to local expo ip
const digitalOcean = "http://207.154.213.68:8888";

const url = testExpo;

// TODO: Find a solution to refresh auth-token
const authToken = "";
const authBody = {
  email: "demo@gmail.com",
  password: "Demo1234",
};
const config = {
  headers: {
    Authorization: "Bearer " + authToken,
  },
};

export const getAuthToken = async () => {
  const res = await axios
    .post(url + "/auth/jwt", authBody)
    .then((response) => {
      console.log("Success", response);
    })
    .catch((error) => {
      console.log("Error" + error);
    });
  return res.data;
};
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
/*

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

//This function is never called. Is it needed? -Stefan 8/10/23
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

export const getCourse = async (courseId) => {
  const res = await axios.get(url + '/api/course/' + courseId)
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


//CREATE FOR TESTING: BUT IT WORKS
// * try to call the function with fileName = "test" or "gorilla".
// * It is being called for testing purposes in the Explore screen
export const getBucketImage = async (fileName) => {
  
  
  try {
    const res = await axios.get(`${url}/download?fileName=${fileName}`);
    const workingUrl = { uri: `data:image/png;base64,${res.data}` }
    return workingUrl
}
catch (err) {
  console.log("Error getting bucket image",err);
}
}



export const getCoverPhoto = async (course_id) => {
  const obj = {
    course_id,
  };
  // Send request to S3 server
  const res = await axios.post(url + '/api/eml/get-presigned-url', obj);
  return res.data;
};

export const getAllComponents = async (components) => {
  const obj = {
    components,
  };
  // Send request to S3 server
  const res = await axios.post(url + '/api/component/all', obj);
  return res.data;
};

*/

/*** COURS, SECTIONS AND EXERCISES ***/

// Get specific course

export const getCourse = async (courseId) => {
  try {
    const res = await axios.get(url + "/api/courses/" + courseId);
    return res.data;
  } catch (error) {
    throw new Error("Error getting specific course: " + error);
  }
};

// Get all courses
export const getCourses = async () => {
  try {
    const res = await axios.get(url + "/api/courses");
    return res.data;
  } catch (error) {
    throw new Error("Error getting all courses: " + error);
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
    const res = await axios.get(url + "/api/courses/lecture/" + lectureId);
    return res.data;
  } catch (err) {
    console.log("Error getting lecture by id", err);
    return null;
  }
};

// Get all sections for a specific course
export const getAllSections = async (courseId) => {
  try {
    const res = await axios.get(url + "/api/courses/" + courseId + "/sections");
    return res.data;
  } catch (error) {
    throw new Error("Error getting all sections: " + error);
  }
};

// Get specific section
export const getSection = async (courseId, sectionId) => {
  try {
    const res = await axios.get(
      url + "/api/courses/" + courseId + "/sections/" + sectionId
    );
    return res.data;
  } catch (error) {
    throw new Error("Error getting specific section: " + error);
  }
};

// Get all exercises in a specific section:
export const getExercisesInSection = async (courseId, sectionId) => {
  try {
    const res = await axios.get(
      url + "/api/courses/" + courseId + "/sections/" + sectionId + "/exercises"
    );
    return res.data;
  } catch (error) {
    throw new Error("Error getting exercises in section: " + error);
  }
};

/*** SUBSCRIPTION ***/

// Get user subsribtions
export const getSubscriptions = async () => {
  try {
    const userId = await AsyncStorage.getItem("@userId");

    // maybe not best practise to pass user ID as request query
    // but this is the only format where it works
    // passing user ID as request body for get request gives error
    const res = await axios.get(
      url + "/api/users/" + userId + "/subscriptions"
    );

    return res.data;
  } catch (error) {
    throw new Error("Error getting user subscriptions: " + error);
  }
};

// Subscribe to course
export const subscribeToCourse = async (courseId) => {
  const userId = await AsyncStorage.getItem("@userId");
  const courseID = courseId;

  // Send request -- TODO: replace with real credentials, when login is working
  const res = await axios
    .post(url + "/api/courses/" + courseID + "/subscribe", {
      user_id: userId,
    })
    .then((response) => {
      console.log("Subscribed successfully: " + response.data);
    })
    .catch((error) => {
      throw new Error("Error subscribing to course: " + error.message);
    });
};

// Unubscribe to course
export const unSubscribeToCourse = async (courseId) => {
  const userId = await AsyncStorage.getItem("@userId");
  const courseID = courseId;

  const res = await axios
    .post(url + "/api/courses/" + courseID + "/unsubscribe", {
      user_id: userId,
    })
    .then((response) => {
      console.log("Unsubscribed successfully: " + response.data);
    })
    .catch((error) => {
      throw new Error("Error unsubscribing to course: " + error.message);
    });
};

export const ifSubscribed = async (courseId) => {
  const userId = await AsyncStorage.getItem("@userId");
  try {
    // maybe not best practise to pass user ID as request query
    // but this is the only format where it works
    // passing user ID as request body for get request gives error
    const res = await axios.get(
      url +
        "/api/users/subscriptions?user_id=" +
        userId +
        "&" +
        "course_id=" +
        courseId
    );

    return res.data;
  } catch (error) {
    throw new Error("Error getting user subscriptions: " + error);
  }
};
