import * as api from '../api/api.js';
import * as userApi from '../api/userApi.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NetworkStatusService} from './NetworkStatusService';
import defaultImage from '../assets/images/defaultImage-base64.json';

const SUB_COURSE_LIST = '@subCourseList';
const USER_ID = '@userId';
const USER_INFO = '@userInfo';
const STUDENT_INFO = '@studentInfo';
const LOGIN_TOKEN = '@loginToken';
let isOnline = true;

/**
 * Updates the network status.
 * @param {boolean} networkStatus - The current network status.
 */
const updateNetworkStatus = (networkStatus) => {
  isOnline = networkStatus;
};

NetworkStatusService.getInstance().addObserver({ update: updateNetworkStatus });

/** STUDENT **/

/**
 * Retrieves and stores student information for a given user ID.
 * @param userId - The user ID to retrieve student information for.
 */
export const setStudentInfo = async (userId) => {
  if (isOnline) {
    try {
      const fetchedStudentInfo = await userApi.getStudentInfo(userId);
      await AsyncStorage.setItem(STUDENT_INFO, JSON.stringify(fetchedStudentInfo));
    } catch (error) {
      throw new Error('API error in getStudentInfo:', error);
    }
  }
};

/**
 * Retrieves student information from AsyncStorage.
 * @returns {Promise<Object>} A promise that resolves with the fetched student information.
 */
export const getStudentInfo = async () => {
  const fetchedStudentInfo = JSON.parse(await AsyncStorage.getItem(STUDENT_INFO));
  return fetchedStudentInfo;
};

export const updateStudentInfo = async (studentInfo) => {
  await AsyncStorage.setItem(STUDENT_INFO, JSON.stringify(studentInfo));
};

/**
 * Retrieves the login token from AsyncStorage.
 * @returns {Promise<string>} A promise that resolves with the fetched login token.
 */
export const getLoginToken = async () => {
  const fetchedToken = await AsyncStorage.getItem(LOGIN_TOKEN);
  return fetchedToken;
};

/**
 * Retrieves user information from AsyncStorage.
 * @returns {Promise<Object>} A promise that resolves with the fetched user information.
 */
export const getUserInfo = async () => {
  const fetchedUserInfo = JSON.parse(await AsyncStorage.getItem(USER_INFO));
  if (fetchedUserInfo === null) {
    throw new Error('Cannot fetch user info from async storage');
  }
  return fetchedUserInfo;
};

/**
 * Stores user information in AsyncStorage.
 * @param {Object} userInfo - The user information to store.
 */
export const setUserInfo = async (userInfo) => {
  const obj = {
    id: userInfo.id,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
  };
  await AsyncStorage.setItem(USER_INFO, JSON.stringify(obj));
  await AsyncStorage.setItem(USER_ID, userInfo.id); // needs to be seperate
  await setStudentInfo(userInfo.id);
};

/**
 * Retrieves the JWT from AsyncStorage.
 * @returns {Promise<string>} A promise that resolves with the JWT.
 */
export const getJWT = async () => {
  return await AsyncStorage.getItem(LOGIN_TOKEN);
};

/**
 * Stores a JWT in AsyncStorage.
 * @param {string} jwt - The JWT to store.
 */
export const setJWT = async (jwt) => {
  await AsyncStorage.setItem(LOGIN_TOKEN, jwt);
};

/** COURSE AND COURSE LIST **/

/**
 * Retrieves a list of all courses.
 * @returns {Promise<Array>} A promise that resolves with a list of courses.
 */
export const getCourseList = async () => {
  let courseList = [];
  if (isOnline) {
    try {
      courseList = await api.getCourses();
    } catch (error) {
      if (error?.response?.data != null) {
        throw new Error('API error in getCourses:', error.response.data);
      } else {
        throw new Error('API error in getCourses:', error);
      }
    } finally {
      return await refreshCourseList(courseList);
    }
  } else {
    return courseList;
  }
};

/**
 * Refreshes the course list with updated data.
 * @param {Array} courseList - The list of courses to refresh.
 * @returns {Promise<Array>} A promise that resolves with the refreshed course list.
 */
const refreshCourseList = async (courseList) => {
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
  } catch (error) {
    if (error?.response?.data != null) {
      throw new Error('API error in refreshCourseList:', error.response.data);
    } else {
      throw new Error('API error in refreshCourseList:', error);
    }
  }
};

/** SECTIONS **/

/**
 * Retrieves a list of sections for a specific course.
 * @param {string} course_id - The ID of the course.
 * @returns {Promise<Array>} A promise that resolves with a list of sections for the course.
 */
export const getSectionList = async (course_id) => {
  let sectionList = null;
  try {
    if (isOnline) {
      sectionList = await api.getAllSections(course_id);
    } else {
      throw new Error('No internet connection in getSectionList');
    }
  } catch (error) {
  // Use locally stored section if they exist and the DB cannot be reached
    try {
      sectionList = JSON.parse(await AsyncStorage.getItem('S' + course_id));
      throw new Error('JSON parse error in getSectionList', error);
    } catch (e){
      if (e?.response?.data != null) {
        throw new Error('Error in getSectionList: ', e.response.data);
      } else {
        throw new Error('Error in getSectionList: ', e);
      }
    }
  } finally {
    return await refreshSectionList(sectionList);
  }
};

/**
 * Refreshes the section list with updated data.
 * @param {Array} sectionList - The list of sections to refresh.
 * @returns {Promise<Array>} A promise that resolves with the refreshed section list.
 */
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
      throw new Error('Error in refreshSectionList: Missing field in sectionList');
    }
  } catch (error) {
    if (error?.response?.data != null) {
      throw new Error('Error in refreshSectionList: ', error.response.data);
    } else {
      throw new Error('Error in refreshSectionList: ', error);
    }
  } finally {
    //Returns new fitted section list, or empty list if there was no data fetched from DB or Storage,
    return newSectionList;
  }
};

/** LECTURES **/

/**
 * Retrieves a list of lectures for a specific section.
 * @param {string} sectionID - The ID of the section.
 * @returns {Promise<Array>} A promise that resolves with a list of lectures for the section.
 */
export const getLectureList = async (sectionID) => {
  let lectureList = null;
  try {
    if (isOnline) {
      lectureList = await api.getLecturesInSection(sectionID);
    } else {
      throw new Error('No internet connection in getLectureList');
    }
  } catch (error) {
    // Use locally stored lectures if they exist and the DB cannot be reached
    try {
      if ((lectureList = JSON.parse(await AsyncStorage.getItem('L' + sectionID))) === null){
        throw new Error('JSON parse error in getLectureList', error);
      }
    } catch (e) {
      if (e?.response?.data != null) {
        throw new Error('Error in getLectureList: ', e.response.data);
      } else {
        throw new Error('Error in getLectureList: ', e);
      }
    }
  } finally {
    return await lectureFittingModel(lectureList);
  }
};

/**
 * Refreshes and fits lecture data to a new object with relevant fields.
 * @param {Array} lectureList - The list of lectures to refresh.
 * @returns {Promise<Array>} A promise that resolves with the refreshed lecture list.
 */
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
      throw new Error('No data to be read in DB or local storage');
    }
  } catch (e){
    if (e?.response?.data != null) {
      throw new Error('Error in lectureFittingModel: ', e.response.data);
    } else {
      throw new Error('Error in lectureFittingModel: ', e);
    }
  } finally {
    //Returns new fitted lecture list, or empty list if there was no data fetched from DB or Storage,
    return newLectureList;
  }
};

/**
 * Fetches an image for a lecture.
 * @param {string} imageID - The ID of the image.
 * @param {string} lectureID - The ID of the lecture.
 * @returns {Promise<Object>} A promise that resolves with the lecture image.
 */
export const fetchLectureImage = async (imageID, lectureID) => {
  let image = null;
  try {
    if (isOnline) {
      image = await api.getBucketImage(imageID);
    } else {
      throw new Error('No internet connection in fetchLectureImage');
    }
  } catch (error) {
    // Use locally stored lectures if they exist and the DB cannot be reached
    try {
      if((image = JSON.parse(await AsyncStorage.getItem('I' + lectureID))) === null){
        throw new Error('JSON parse error in fetchLectureImage', error);
      }
    } catch (e){
      if (e?.response?.data != null) {
        throw new Error('Error in fetchLectureImage: ', e.response.data);
      } else {
        throw new Error('Error in fetchLectureImage: ', e);
      }
    }
  } finally {
    return image;
  }
};

/** EXERCISES **/

/**
 * Retrieves a list of exercises for a specific section.
 * @param {string} sectionID - The ID of the section.
 * @returns {Promise<Array>} A promise that resolves with a list of exercises for the section.
 */
export const getExerciseList = async (sectionID) => {
  let exerciseList = null;
  try {
    if (isOnline) {
      exerciseList = await api.getExercisesInSection(sectionID);
    } else {
      throw new Error('No internet connection in getExerciseList');
    }
  } catch (error) {
    // Use locally stored exercises if they exist and the DB cannot be reached
    try {
      if ((exerciseList = JSON.parse(await AsyncStorage.getItem('E' + sectionID))) === null){
        throw new Error('JSON parse error in getExerciseList', error);
      }
    } catch (e) {
      if (e?.response?.data != null) {
        throw new Error('Error in getExerciseList: ', e.response.data);
      } else {
        throw new Error('Error in getExerciseList: ', e);
      }
    }
  } finally {
    return await exerciseFittingModel(exerciseList);
  }
};

/**
 * Refreshes and fits exercise data to a new object with relevant fields.
 * @param {Array} exerciseList - The list of exercises to refresh.
 * @returns {Promise<Array>} A promise that resolves with the refreshed exercise list.
 */
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
      throw new Error('No data to be read in DB or local storage');
    }
  } catch (error) {
    if (error?.response?.data != null) {
      throw new Error('Error in exerciseFittingModel: ', error.response.data);
    } else {
      throw new Error('Error in exerciseFittingModel: ', error);
    }
  } finally {
    //Returns new fitted exercise list, or empty list if there was no data fetched from DB or Storage,
    return newExerciseList;
  }
};

/** SUBSCRIPTIONS **/

/**
 * Retrieves a list of subscribed courses for a user.
 * @returns {Promise<Array>} A promise that resolves with the list of subscribed courses.
 */
export const getSubCourseList = async () => {

  // get the logged-in user id from async storage
  const userId = await AsyncStorage.getItem(USER_ID);

  if (userId === null) {
    throw new Error('Cannot fetch user id from async storage in getSubCourseList');
  }

  try {
    if (isOnline) {
      return await refreshSubCourseList(userId);
    } else {
      throw new Error('No internet connection in getSubCourseList');
    }
  } catch (error) {
    // Check if the course list already exists in AsyncStorage
    let courseList = JSON.parse(await AsyncStorage.getItem(SUB_COURSE_LIST));
    if (courseList !== null) {
      return courseList;
    }
    if (error?.response?.data != null) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

/**
 * Refreshes the subscribed course list for a user.
 * @param {string} userId - The user ID.
 * @returns {Promise<Array>} A promise that resolves with the refreshed subscribed course list.
 */
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
    .catch((error) => {
      if (error?.response?.data != null) {
        throw new Error('API error in refreshSubCourseList:', error.response.data);
      } else {
        throw new Error('API error in refreshSubCourseList:', error);
      }
    });
};

/**
 * Subscribes a user to a course.
 * @param {string} courseId - The ID of the course to subscribe to.
 * @returns {Promise<Object>} A promise that resolves with the subscription result.
 */
export const subscribe = async (courseId) => {

  // get the logged-in user id from async storage
  const userId = await AsyncStorage.getItem(USER_ID);

  if (userId === null) {
    throw new Error('Cannot fetch user id from async storage');
  }

  try {
    await api.subscribeToCourse(userId, courseId);
    await addCourseToStudent(courseId);
  } catch (error) {
    if (error?.response?.data != null) {
      throw new Error('API error in subscribe:', error.response.data);
    } else {
      throw new Error('API error in subscribe:', error);
    }
  }
};

export const addCourseToStudent = async (courseId) => {
  const userId = await AsyncStorage.getItem(USER_ID);
  const loginToken = await getLoginToken();

  try {
    const student = await userApi.addCourseToStudent(userId, courseId, loginToken);
    if (!student) {
      throw new Error('Student not found');
    }

    updateStudentInfo(student);
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

// unsubscribe to a course
/**
 * Unsubscribes a user from a course.
 * @param {string} courseId - The ID of the course to unsubscribe from.
 * @returns {Promise<Object>} A promise that resolves with the unsubscription result.
 */
export const unsubscribe = async (courseId) => {

  // get the logged-in user id from async storage
  const userId = await AsyncStorage.getItem(USER_ID);

  if (userId === null) {
    throw new Error('Cannot fetch user id from async storage');
  }

  try {
    if (await AsyncStorage.getItem(courseId) !== null){
      deleteLocallyStoredCourse(courseId);
    }
    return await api.unSubscribeToCourse(userId, courseId);

  } catch (error) {
    if (error?.response?.data != null) {
      throw new Error(error.response.data);
    } else {
      throw new Error(error);
    }
  }
};

/** Downloading course **/

/**
 * Stores a course locally
 * @param {String} courseID - A string with the ID of the course to be stored
 * @returns {Promise<boolean>} A promise that resolves with `true` if the course was stored successfully.
 */
export const storeCourseLocally = async (courseID) => {
  let success = true;
  if (isOnline) {
    try {
      const course = await api.getCourse(courseID);
      await AsyncStorage.setItem(courseID + await AsyncStorage.getItem(USER_ID), JSON.stringify(course));

      const sectionList = await api.getAllSections(courseID);
      await AsyncStorage.setItem('S' + courseID, JSON.stringify(sectionList));
      for (let section of sectionList) {
        let lectureList = await api.getLecturesInSection(section._id);
        await AsyncStorage.setItem('L' + section._id, JSON.stringify(lectureList));
        for (let lecture of lectureList) {
          if (lecture.image) {
            try {
              let image = await api.getBucketImage(lecture.image);
              await AsyncStorage.setItem('I' + lecture._id, JSON.stringify(image));
            } catch {
              await AsyncStorage.setItem('I' + lecture._id, defaultImage.base64);
            }
          } else if (lecture.video) {
            //await api.downloadVideo(lecture.video);
          }
        }
        let exerciseList = await api.getExercisesInSection(section._id);
        await AsyncStorage.setItem('E' + section._id, JSON.stringify(exerciseList));
      }
    } catch (error) {
      success = false;
      deleteLocallyStoredCourse(courseID);
      if (error?.response?.data != null) {
        throw new Error(error.response.data);
      } else {
        throw new Error(error);
      }
    } finally {
      return success;
    }
  } else {
    return false;
  }
};

/**
 * Deletes a locally stored course.
 * @param {string} courseID - The ID of the course to remove from local storage.
 * @returns {Promise<boolean>} A promise that resolves with `true` if the course was deleted successfully.
 */
export const deleteLocallyStoredCourse = async (courseID) => {
  let success = true;
  try {
    await AsyncStorage.removeItem(courseID + await AsyncStorage.getItem(USER_ID));

    const sectionList = JSON.parse(await AsyncStorage.getItem('S' + courseID));
    await AsyncStorage.removeItem('S' + courseID);
    for (let section of sectionList) {
      let lectureList = JSON.parse(await AsyncStorage.getItem('L' + section._id));
      await AsyncStorage.removeItem('L' + section._id);
      await AsyncStorage.removeItem('E' + section._id);
            
      for (let lecture of lectureList) {
        await AsyncStorage.removeItem('I' + lecture._id);
        //delete video here
        //await unlink(RNBackgroundDownloader.directories.documents + '/' + lecture.video);
        //console.log('FILE DELETED');
      }
    }
  } catch (error) {
    success = false;
    if (error?.response?.data != null) {
      throw new Error(error.response.data);
    } else {
      throw new Error(error);
    }
  } finally {
    return success;
  }
};

/**
 * Updates all locally stored courses.
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
  } catch (error) {
    if (error?.response?.data != null) {
      throw new Error(error.response.data);
    } else {
      throw new Error(error);
    }
  }
};

/** Other **/

/**
 * Checks if a course is stored locally.
 * @param {string} courseID - The ID of the course to check.
 * @returns {Promise<boolean>} A promise that resolves with `true` if the course is stored locally.
 */
export const checkCourseStoredLocally = async (courseID) => {
  try {
    return !!(await AsyncStorage.getItem(courseID + await AsyncStorage.getItem(USER_ID)));
  } catch (error) {
    if (error?.response?.data != null) {
      throw new Error(error.response.data);
    } else {
      throw new Error(error);
    }
  }
};

/**
 * Clears all data from AsyncStorage.
 */
export const clearAsyncStorage = async () => {
  console.log(await AsyncStorage.getAllKeys());
  await AsyncStorage.clear();
  console.log(await AsyncStorage.getAllKeys());
};