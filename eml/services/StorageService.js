import * as api from '../api/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const COURSE_LIST = '@courseList';
const SUB_COURSE_LIST = '@subCourseList';
const SECTION_LIST = '@sectionList';
const COURSE = '@course';
const USER_ID = '@userId';
const USER_INFO = '@userInfo';

export const getUserInfo = async () => {
  try {
    const fetchedUserInfo = JSON.parse(await AsyncStorage.getItem(USER_INFO));
    return fetchedUserInfo;
  } catch (e) {
    throw e;
  }
};

/** COURSE AND COURSE LIST **/

// get specific course
export const getCourseId = async (id) => {
  try {
    return await refreshCourse(id);
  } catch (error) {
    // Check if the course already exists in AsyncStorage
    let course = JSON.parse(await AsyncStorage.getItem(COURSE));
    if (course !== null) {
      return course;
    }
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};
export const refreshCourse = async (id) => {
  return await api
    .getCourse(id)
    .then(async (course) => {
      return course;
    })
    .catch((e) => {
      if (e?.response?.data != null) {
        throw e.response.data;
      } else {
        throw e;
      }
    });
};

// get all courses
export const getCourseList = async () => {
  try {
    return await refreshCourseList();
  } catch (error) {
    // Check if the course list already exists in AsyncStorage
    let courseList = JSON.parse(await AsyncStorage.getItem(COURSE_LIST));
    if (courseList !== null) {
      return courseList;
    }
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

export const refreshCourseList = async () => {
  return await api
    .getCourses()
    .then(async (list) => {
      let newCourseList = [];
      for (const course of list) {
        // Make new list with required members
        newCourseList.push({
          title: course.title,
          courseId: course._id,
          description: course.description,
          category: course.category,
          estimatedHours: course.estimatedHours,
          dateUpdated: course.dateUpdated,
          difficulty: course.difficulty,
          published: course.published,
          status: course.status,
          rating: course.rating,
        });
      }
      // Save new courseList for this key and return it.
      await AsyncStorage.setItem(COURSE_LIST, JSON.stringify(newCourseList));
      return newCourseList;
    })
    .catch((e) => {
      if (e?.response?.data != null) {
        throw e.response.data;
      } else {
        throw e;
      }
    });
};

/** SECTIONS **/

// get all section for specific course
export const getSectionList = async (course_id) => {
    let sectionList;
    try {
        sectionList = await api.getAllSections(course_id);

    } catch (unusedErrorMessage) {
        // Use locally stored section if they exist and the DB cannot be reached
      try {
        sectionList = JSON.parse(await AsyncStorage.getItem('S'+course_id));
      } catch (e){
          console.log('Error fetching from storage ' + e);
          if (e?.response?.data != null) {
              throw e.response.data;
          } else {
              throw e;
          }
      }
  } finally {
      return await refreshSectionList(sectionList);
  }
};

// Fits section data to new object with relevant fields
export const refreshSectionList = async (sectionList) => {
        let newSectionList = [];
        if (sectionList !== null) {
            for (const section of sectionList) {
                newSectionList.push({
                    title: section.title,
                    sectionId: section._id,
                    parentCourseId: section.parentCourse,
                    description: section.description,
                    components: section.components,
                    total: section.totalPoints,
                });
            }
        } else {
            console.log('No data to be read in DB or local storage');
        }
        //Returns new fitted section list, or empty list if there was no data fetched from DB or Storage,
        return newSectionList;
};

/** SUBSCRIPTIONS **/

// get all subscribed courses from a user
export const getSubCourseList = async () => {

  // get the logged-in user id from async storage
  const userId = await AsyncStorage.getItem(USER_ID); 

  if(userId === null) {
    throw new Error("Cannot fetch user id from async storage");
  }

  try {
    return await refreshSubCourseList(userId);

  } catch (e) {
    // Check if the course list already exists in AsyncStorage
    let courseList = JSON.parse(await AsyncStorage.getItem(SUB_COURSE_LIST));
    if (courseList !== null) {
      return courseList;
    }
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};
export const refreshSubCourseList = async (userId) => {
  return await api
    .getSubscriptions(userId)
    .then(async (list) => {
      let newCourseList = [];
      for (const course of list) {

        // Make new list with required members
        newCourseList.push({
          title: course.title,
          courseId: course._id,
          description: course.description,
          category: course.category,
          estimatedHours: course.estimatedHours,
          dateUpdated: course.dateUpdated,
          difficulty: course.difficulty,
          published: course.published,
          status: course.status,
          rating: course.rating,
            downloaded: !!(await AsyncStorage.getItem(course._id)),
        });
      }
      // Save new courseList for this key and return it.
      await AsyncStorage.setItem(SUB_COURSE_LIST, JSON.stringify(newCourseList));
      return newCourseList;
    })
    .catch((e) => {
      if (e?.response?.data != null) {
        throw e.response.data;
      } else {
        throw e;
      }
    });
};


// subscribe to a course
export const subscribe = async (courseId) => {

  // get the logged-in user id from async storage
  const userId = await AsyncStorage.getItem(USER_ID);

  if (userId === null) {
    throw new Error("Cannot fetch user id from async storage");
  }

  try {
    return await api.subscribeToCourse(userId, courseId);

  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

// unsubscribe to a course
export const unsubscribe = async (courseId) => {

  // get the logged-in user id from async storage
  const userId = await AsyncStorage.getItem(USER_ID);

  if (userId === null) {
    throw new Error("Cannot fetch user id from async storage");
  }

  try {
    return await api.unSubscribeToCourse(userId, courseId);

  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};


// check if user is subscribed to a course
export const checkSubscriptions = async (courseId) => {

  // get the logged-in user id from async storage
  const userId = await AsyncStorage.getItem(USER_ID);

  if (userId === null) {
    throw new Error("Cannot fetch user id from async storage");
  }

  try {
    return await api.ifSubscribed(userId, courseId);

  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};



/**
 * Stores a course locally
 * @param {String} courseID - A string with the ID of the course to be stored
 * @returns {boolean} - Returns true if no errors was thrown during the storage and false if there was
 */
export const storeCourseLocally = async (courseID) => {
    try {
        const course = await api.getCourse(courseID);
        await AsyncStorage.setItem(courseID, JSON.stringify(course));

        const sectionList = await api.getAllSections(courseID);
        await AsyncStorage.setItem("S" + courseID, JSON.stringify(sectionList));

        for (let section of sectionList) {
            let exerciseList = await api.getExercisesInSection(courseID, section._id);
            await AsyncStorage.setItem("" + section._id + courseID, JSON.stringify(exerciseList));
        }

        return true;
    } catch (e) {
        console.log("Error in storeCourseLocally " + e);
        return false;
    }
}


/**
 * Deletes a locally stored course
 * @param {String} courseID - A string with the ID of the course to be removed from lacal storage
 * @returns {boolean} - Returns true if no errors was thrown during the deletion and false if there was
 */
export const deleteLocallyStoredCourse = async (courseID) => {
    try {
        await AsyncStorage.removeItem(courseID);

        const sectionList = JSON.parse(await AsyncStorage.getItem("S" + courseID));
        await AsyncStorage.removeItem("S" + courseID);

        for (let section of sectionList) {
            await AsyncStorage.removeItem("" + section._id + courseID);
        }

        return true;
    } catch (e) {
        console.log("Error in deleteLocallyStoredCourse " + e);
        return false;
    }
}

/**
 * Update all locally stored courses
 */
export const updateStoredCourses = async () => {
    try {
        const subList = await getSubCourseList();
        for (const e of subList) {
            let course;
            if ((course = JSON.parse(await AsyncStorage.getItem(e.courseId))) !== null && course.dateUpdated !== e.dateUpdated) {
                storeCourseLocally(e.courseId);
            }
        }
    }catch (e) {
        console.log("Something went wrong in updateStoredCourses " + e);
    }


}


export const clearAsyncStorage = async () => {
  console.log(await AsyncStorage.getAllKeys());
  await AsyncStorage.clear();
  console.log(await AsyncStorage.getAllKeys());
};