import * as api from '../api/api.js';
import * as userApi from '../api/userApi.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NetworkStatusService} from './NetworkStatusService';
import defaultImage from '../assets/images/defaultImage-base64.json';
import * as FileSystem from 'expo-file-system';



const SUB_COURSE_LIST = '@subCourseList';
const USER_ID = '@userId';
const USER_INFO = '@userInfo';
const STUDENT_INFO = '@studentInfo';
const LOGIN_TOKEN = '@loginToken';
const lectureVideoPath = FileSystem.documentDirectory + 'lectureVideos/';
let isOnline = true;

const updateNetworkStatus = (networkStatus) => {
  isOnline = networkStatus;
};

NetworkStatusService.getInstance().addObserver({ update: updateNetworkStatus });

/** STUDENT **/

// Function to get student information
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

export const getStudentInfo = async () => {
  const fetchedStudentInfo = JSON.parse(await AsyncStorage.getItem(STUDENT_INFO));
  return fetchedStudentInfo;
};

export const updateStudentInfo = async (studentInfo) => {
  await AsyncStorage.setItem(STUDENT_INFO, JSON.stringify(studentInfo));
};

export const getLoginToken = async () => {
  const fetchedToken = await AsyncStorage.getItem(LOGIN_TOKEN);
  return fetchedToken;
};

export const getUserInfo = async () => {
  const fetchedUserInfo = JSON.parse(await AsyncStorage.getItem(USER_INFO));
  if (fetchedUserInfo === null) {
    throw new Error('Cannot fetch user info from async storage');
  }
  return fetchedUserInfo;
};

// Set user info in storage
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

// Get JWT from storage
export const getJWT = async () => {
  return await AsyncStorage.getItem(LOGIN_TOKEN);
};

// Set JWT in storage
export const setJWT = async (jwt) => {
  return await AsyncStorage.setItem(LOGIN_TOKEN, jwt);
};

/** COURSE AND COURSE LIST **/
// get all courses
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

// get all section for specific course
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

/** COMPONENTS **/

// get all components for specific section
export const getComponentsList = async (sectionID) => {
  let componentList = null;
  try {
    if (isOnline) {
      componentList = await api.getComponents(sectionID);
    } else {
      throw new Error('No internet connection in getComponentsList');
    }
  } catch (error) {
    // Use locally stored components if they exist and the DB cannot be reached
    try {
      if ((componentList = JSON.parse(await AsyncStorage.getItem('C' + sectionID))) === null){
        throw new Error('JSON parse error in getComponentsList', error);
      }
    } catch (e) {
      if (e?.response?.data != null) {
        throw new Error('Error in getComponentsList: ', e.response.data);
      } else {
        throw new Error('Error in getComponentsList: ', e);
      }
    }
  } finally {
    return componentList; //await componentFittingModel(componentList);
  }
};

// Fits lecture data to new object with relevant fields
const componentFittingModel = async (componentList) => {
  let newComponentList = [];
  try {
    if (componentList !== null) {
      for (const component of componentList) {
        newComponentList.push(
          component  // Replace with object model if needed (Se sections for reference)
        );
      }
    } else {
      throw new Error('No data to be read in DB or local storage');
    }
  } catch (e){
    if (e?.response?.data != null) {
      throw new Error('Error in componentFittingModel: ', e.response.data);
    } else {
      throw new Error('Error in componentFittingModel: ', e);
    }
  } finally {
    //Returns new fitted lecture list, or empty list if there was no data fetched from DB or Storage,
    return newComponentList;
  }
};

// get images for a Lecture
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

/**
 * gets videoURL for a Lecture if online, and video in base64 from file if offline
 * @param videoName
 * @param resolution
 * @returns {Promise<string>}
 */
export const getVideoURL = async (videoName, resolution) => {
  let videoUrl;
  if (!resolution){
    resolution = '360';
  }
  try {
    if (isOnline) {
      videoUrl = api.getVideoStreamUrl(videoName, resolution);
    } else {
      throw new Error('No internet connection.');
    }
  } catch (unusedErrorMessage) {
    // Use locally stored video if they exist and the DB cannot be reached
    try {
      videoUrl = await FileSystem.readAsStringAsync(lectureVideoPath + videoName + '.json');
    } catch (e){
      if (e?.response?.data != null) {
        throw e.response.data;
      } else {
        throw e;
      }
    }
  } finally {
    return videoUrl;
  }
};

/** SUBSCRIPTIONS **/

// get all subscribed courses from a user
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

// subscribe to a course
export const subscribe = async (courseId) => {

  // get the logged-in user id from async storage
  const userId = await AsyncStorage.getItem(USER_ID);

  if (userId === null) {
    throw new Error('Cannot fetch user id from async storage');
  }

  try {
    return await api.subscribeToCourse(userId, courseId);
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

    // TODO
  } catch (e) {
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};

/** Downloading course **/

//create a new folder to store videos if it does not already exist.
export const makeDirectory = () => {
  FileSystem.makeDirectoryAsync(lectureVideoPath, { intermediates: true });
};

/**
 * Stores a course locally
 * @param {String} courseID - A string with the ID of the course to be stored
 * @returns {boolean} - Returns true if no errors was thrown during the storage and false if there was
 */
export const storeCourseLocally = async (courseID) => {
  let success = true;
  if (isOnline) {
    try {
      //Stores the course data
      const course = await api.getCourse(courseID);
      await AsyncStorage.setItem(courseID + await AsyncStorage.getItem(USER_ID), JSON.stringify(course));

      //Stores section data
      const sectionList = await api.getAllSections(courseID);
      await AsyncStorage.setItem('S' + courseID, JSON.stringify(sectionList));
      for (let section of sectionList) {

        //Stores lecture data
        let componentList = await api.getComponents(section._id);
        await AsyncStorage.setItem('C' + section._id, JSON.stringify(componentList));
        for (let component of componentList) {
          if (component.type === 'lecture'){
            if (component.component.image) {

              //Stores images
              try {
                let image = await api.getBucketImage(component.component.image);
                await AsyncStorage.setItem('I' + component.component._id, JSON.stringify(image));
              } catch {
                await AsyncStorage.setItem('I' + component.component._id, defaultImage.base64);
              }
            } else if (component.component.video){

              //Stores videos
              await makeDirectory();
              await FileSystem.writeAsStringAsync(lectureVideoPath + component.component.video + '.json', await api.getBucketImage(component.component.video));
            }
          }
        }
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
  } else {
    return false;
  }
};

/**
 * Deletes a locally stored course
 * @param {String} courseID - A string with the ID of the course to be removed from lacal storage
 * @returns {boolean} - Returns true if no errors was thrown during the deletion and false if there was
 */
export const deleteLocallyStoredCourse = async (courseID) => {
  let success = true;
  try {
    await AsyncStorage.removeItem(courseID + await AsyncStorage.getItem(USER_ID));

    const sectionList = JSON.parse(await AsyncStorage.getItem('S' + courseID));
    await AsyncStorage.removeItem('S' + courseID);
    for (let section of sectionList) {
      let componentList = JSON.parse(await AsyncStorage.getItem('C' + section._id));
      await AsyncStorage.removeItem('C' + section._id);
            
      for (let component of componentList) {
        if (component.type === 'lecture'){
          if (component.component.image) {
            await AsyncStorage.removeItem('I' + component._id);
          } else if (component.component.video) {
            await FileSystem.deleteAsync(lectureVideoPath + component.component.video + '.json');
          }
        }
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
  } catch (error) {
    if (error?.response?.data != null) {
      throw new Error(error.response.data);
    } else {
      throw new Error(error);
    }
  }
};

/** Other **/

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

export const clearAsyncStorage = async () => {
  console.log(await AsyncStorage.getAllKeys());
  await AsyncStorage.clear();
  console.log(await AsyncStorage.getAllKeys());
};