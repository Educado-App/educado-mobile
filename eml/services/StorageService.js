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
      if (e?.response?.data != null) {
          throw e.response.data;
      } else {
          throw e;
      }
  }
};

/** COURSE AND COURSE LIST **/

// get specific course  (This function is obsolete and is only used in test)
    /*
export const getCourseId = async (id) => {
  try {
    return await refreshCourse(id);
  } catch (e) {
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

// (This function is obsolete and is only used in test)
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
*/
// get all courses
export const getCourseList = async () => {
    let courseList = [];;
    try {
        courseList = await api.getCourses();
    } catch (e) {
        if (e?.response?.data != null) {
            throw e.response.data;
        } else {
            throw e;
        }
    } finally {
        return await refreshCourseList(courseList);
    }
};

export const refreshCourseList = async (courseList) => {
    try {
        let newCourseList = [];
        if (courseList.length !== 0) {
            for (const course of courseList) {
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
        }
        // Save new courseList for this key and return it.
        return newCourseList;
    }catch(e){
      if (e?.response?.data != null) {
        throw e.response.data;
      } else {
        throw e;
      }
    }
};

/** SECTIONS **/

// get all section for specific course
export const getSectionList = async (course_id) => {
    let sectionList = null;
    try {
        sectionList = await api.getAllSections(course_id);

    } catch (unusedErrorMessage) {
        // Use locally stored section if they exist and the DB cannot be reached
      try {
        sectionList = JSON.parse(await AsyncStorage.getItem('S'+course_id));
        throw unusedErrorMessage;
      } catch (e){
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
    try {
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
            throw new error('No data to be read in DB or local storage');
        }
    } catch (e) {
        if (e?.response?.data != null) {
            throw e.response.data;
        } else {
            throw e;
        }
    } finally {
        //Returns new fitted section list, or empty list if there was no data fetched from DB or Storage,
        return newSectionList;
    }
};

/** LECTURES **/

// get all Lectures for specific section
export const getLectureList = async (sectionID) => {
    let lectureList = null;
    try {
        lectureList = await api.getLecturesInSection(sectionID);
    } catch {
        // Use locally stored lectures if they exist and the DB cannot be reached
        try {
            if ((lectureList = JSON.parse(await AsyncStorage.getItem('L'+sectionID))) === null){
                throw new error('No data to be read in DB or local storage');
            }
        } catch (e){
            if (e?.response?.data != null) {
                throw e.response.data;
            } else {
                throw e;
            }
        }
    } finally {
        return await lectureFittingModel(lectureList);
    }
};

// Fits lecture data to new object with relevant fields
const lectureFittingModel = async (lectureList) => {
    let newLectureList = [];
    try {
        if (lectureList !== null) {
            for (const lecture of lectureList) {
                newLectureList.push(
                    lecture  // Replace with object model if needed (Se sections for reference)
                );
            }
        } else {
            throw new error('No data to be read in DB or local storage');
        }
    } catch (e){
        if (e?.response?.data != null) {
            throw e.response.data;
        } else {
            throw e;
        }
    } finally {
        //Returns new fitted lecture list, or empty list if there was no data fetched from DB or Storage,
        return newLectureList;
    }
};

// get images for a Lecture
export const fetchLectureImage = async (imageID, lectureID) => {
    let image = null;
    try {
        image = await api.getBucketImage(imageID);

    } catch (unusedErrorMessage) {
        // Use locally stored lectures if they exist and the DB cannot be reached
        try {
            if((image = JSON.parse(await AsyncStorage.getItem('I'+lectureID))) === null){
                throw unusedErrorMessage;
            }
        } catch (e){
            if (e?.response?.data != null) {
                throw e.response.data;
            } else {
                throw e;
            }
        }
    } finally {
        return image;
    }
};

/** EXERCISES **/

// get all Exercises for specific section
export const getExerciseList = async (sectionID) => {
    let exerciseList = null;
    try {
        exerciseList = await api.getExercisesInSection(sectionID);

    } catch (unusedErrorMessage) {
        // Use locally stored exercises if they exist and the DB cannot be reached
        try {
            if((exerciseList = JSON.parse(await AsyncStorage.getItem('E'+sectionID))) === null){
                throw unusedErrorMessage;
            }
        } catch (e){
            if (e?.response?.data != null) {
                throw e.response.data;
            } else {
                throw e;
            }
        }
    } finally {
        return await exerciseFittingModel(exerciseList);
    }
};

// Fits exercise data to new object with relevant fields
const exerciseFittingModel = async (exerciseList) => {
    let newExerciseList = [];
    try {
        if (exerciseList !== null) {
            for (const exercise of exerciseList) {
                newExerciseList.push(
                    exercise  // Replace with object model if needed (Se sections for reference)
                );
            }
        } else {
            throw new error('No data to be read in DB or local storage');
        }
    } catch (e){
        if (e?.response?.data != null) {
            throw e.response.data;
        } else {
            throw e;
        }
    } finally {
        //Returns new fitted exercise list, or empty list if there was no data fetched from DB or Storage,
        return newExerciseList;
    }
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
      if(await AsyncStorage.getItem(courseId) !== null){
          deleteLocallyStoredCourse(courseId);
      }
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

/** Downloading course **/

/**
 * Stores a course locally
 * @param {String} courseID - A string with the ID of the course to be stored
 * @returns {boolean} - Returns true if no errors was thrown during the storage and false if there was
 */
export const storeCourseLocally = async (courseID) => {
    let success = true;
    try {
        const course = await api.getCourse(courseID);
        await AsyncStorage.setItem(courseID + await AsyncStorage.getItem(USER_ID), JSON.stringify(course));

        const sectionList = await api.getAllSections(courseID);
        await AsyncStorage.setItem("S" + courseID, JSON.stringify(sectionList));

        for (let section of sectionList) {
            let lectureList = await api.getLecturesInSection(section._id);
            await AsyncStorage.setItem("L" + section._id, JSON.stringify(lectureList));
            for (let lecture of lectureList) {
                if (lecture.image) {
                    let image = await api.getBucketImage(lecture.image);
                    await AsyncStorage.setItem("I" + lecture._id, JSON.stringify(image));
                } else if (lecture.video){
                    //await api.downloadVideo(lecture.video);
                }
            }
            let exerciseList = await api.getExercisesInSection(courseID, section._id);
            await AsyncStorage.setItem("E" + section._id, JSON.stringify(exerciseList));
        }
    } catch (e) {
      success = false;
      deleteLocallyStoredCourse(courseID);
      if (e?.response?.data != null) {
        throw e.response.data;
      } else {
        throw e;
      }
    } finally {
      return success;
    }
}


/**
 * Deletes a locally stored course
 * @param {String} courseID - A string with the ID of the course to be removed from lacal storage
 * @returns {boolean} - Returns true if no errors was thrown during the deletion and false if there was
 */
export const deleteLocallyStoredCourse = async (courseID) => {
    let success = true;
    try {
        await AsyncStorage.removeItem(courseID + await AsyncStorage.getItem(USER_ID));

        const sectionList = JSON.parse(await AsyncStorage.getItem("S" + courseID));
        await AsyncStorage.removeItem("S" + courseID);

        for (let section of sectionList) {
            await AsyncStorage.removeItem("L" + section._id);
            await AsyncStorage.removeItem("E" + section._id);
            for (let lecture of section.lectures) {
                await AsyncStorage.removeItem("I" + lecture._id);
                //delete video here
                //await unlink(RNBackgroundDownloader.directories.documents + '/' + lecture.video);
                //console.log('FILE DELETED');
            }
        }
    } catch (e) {
        success = false;
        if (e?.response?.data != null) {
            throw e.response.data;
        } else {
            throw e;
        }
    } finally {
        return success;
    }

}

/**
 * Update all locally stored courses
 */
export const updateStoredCourses = async () => {
    try {
        const subList = await getSubCourseList();
        for (const subListElement of subList) {
            let course;
            if ((course = JSON.parse(await AsyncStorage.getItem(subListElement.courseId + await AsyncStorage.getItem(USER_ID)))) !== null
                && course.dateUpdated !== subListElement.dateUpdated) {

                storeCourseLocally(subListElement.courseId);
            }
        }
    } catch (e) {
        if (e?.response?.data != null) {
            throw e.response.data;
        } else {
            throw e;
        }
    }
}


/** Other **/

export const clearAsyncStorage = async () => {
  console.log(await AsyncStorage.getAllKeys());
  await AsyncStorage.clear();
  console.log(await AsyncStorage.getAllKeys());
};