import axios from 'axios';

/* Commented out for avoiding linting errors
 * TODO: move IP address to .env file !!!
const testUrl = 'http://localhost:8888';
const testExpo = 'http://172.30.211.57:8888'; 
const digitalOcean = 'http://207.154.213.68:8888';
*/

const url = 'http://localhost:8888'; // change to lcd ip when testing

/*** COURSE, SECTIONS AND EXERCISES ***/

//This function is not used in this version of dev
export const getCourseByid = async (courseId) => {
  try {
    const res = await axios.get(url + '/api/courses/' + courseId);
    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

export const getSectionByid = async (sectionId) => {
  try {
    const res = await axios.get(url + '/api/sections/' + sectionId);
    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }

  }
};

export const getExerciseById = async (exerciseId) => {
  try {
    const res = await axios.get(url + '/api/exercises/' + exerciseId);
    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

// Get specific course

export const getCourse = async (courseId) => {
  try {
    const res = await axios.get(url + '/api/courses/' + courseId, {timeout: 2000});
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
    const res = await axios.get(url + '/api/courses');
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
    const res = await axios.get(url + '/api/courses/' + courseId + '/sections', {timeout: 2000});
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
      url + '/api/courses/' + courseId + '/sections/' + sectionId
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
export const getExercisesInSection = async (sectionId) => {
  try {
    const res = await axios.get(
      //url + "/api/courses/" + courseId + "/sections/" + sectionId + "/exercises"
      url + '/api/exercises/section/' + sectionId
      , {timeout: 2000});
    return res.data;
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

//CREATED BY VIDEOSTREAM TEAM
//: get exercises in section by section id
export const getExerciseBySectionId = async (sectionId) => {
  try {
    const res = await axios.get(
      url + '/api/courses/' + sectionId + '/exercises'
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

// Get all lectures in a specific section:
export const getLecturesInSection = async (sectionId) => {
  try {
    const res = await axios.get(
      url + '/api/lectures/section/' + sectionId
      , {timeout: 2000});
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
      url + '/api/students/' + userId + '/subscriptions'
      , {timeout: 2000});

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
    await axios.post(
      url + '/api/courses/' + courseId + '/subscribe',
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
    await axios.post(
      url + '/api/courses/' + courseId + '/unsubscribe',
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
      '/api/students/subscriptions?user_id=' +
      userId +
      '&' +
      'course_id=' +
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
  }
  return response;
};

//CREATED BY VIDEOSTREAM TEAM
/*This will be improved in next pull request to handle getting different resolutions properly 
with our new video streaming service in go.
*/

export const getVideoDownloadUrl = (fileName) => {
  
  const _vidUrl = `${url}/api/bucket/stream/${fileName}`;
  return _vidUrl;
};

//CREATED BY VIDEO STREAMING TEAM
export const getSectionAndLecturesBySectionId = async (sectionId) => {
  try {
    const res = await axios.get(url + '/api/sections/' + sectionId);
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
    const res = await axios.get(url + '/api/lectures/' + lectureId);
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
      , {timeout: 2000});
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



//Download video
/*
export const downloadVideo = async (fileName) => {
  let storedLocation = RNBackgroundDownloader.directories.documents + '/' + fileName;
  RNBackgroundDownloader.download({
    id: fileName,
    url: url +'/api/bucket/' + fileName,
    destination: storedLocation,
    metadata: {}
  }).begin(({expectedBytes, headers}) => {
    console.log(`Going to download ${expectedBytes} bytes!`)
  }).progress(percent => {
    console.log(`Downloaded: ${percent * 100}%`)
  }).done(() => {
    console.log('Download is done!')

    // PROCESS YOUR STUFF

    // FINISH DOWNLOAD JOB ON IOS
    if (Platform.OS === 'ios') {
      RNBackgroundDownloader.completeHandler(fileName)
    }
    return storedLocation;
  }).error(error => {
    console.log('Download canceled due to error: ', error);
  })
} */