import * as api from '../api/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const COURSE_LIST = '@courseList';
const SUB_COURSE_LIST = '@subCourseList';
const SECTION_LIST = '@sectionList';
const COURSE = '@course';
const USER_ID = '@userId';

/** COURSE AND COURS LIST **/

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
  try {
    return await refreshSectionList(course_id);
  } catch (error) {
    // Check if the course list already exists in AsyncStorage
    let sectionList = JSON.parse(await AsyncStorage.getItem(SECTION_LIST));
    if (sectionList !== null) {
      return sectionList;
    }
    if (e?.response?.data != null) {
      throw e.response.data;
    } else {
      throw e;
    }
  }
};
export const refreshSectionList = async (course_id) => {
  return await api
    .getAllSections(course_id)
    .then(async (list) => {
      let newSectionList = [];
      for (const section of list) {
        newSectionList.push({
          title: section.title,
          sectionId: section._id,
          parentCourseId: section.parentCourse,
          description: section.description,
          components: section.components,
          total: section.totalPoints,
        });
      }
      // Save new courseList for this key and return it.
      await AsyncStorage.setItem(SECTION_LIST, JSON.stringify(newSectionList));

      return newSectionList;
    })
    .catch((e) => {
      if (e?.response?.data != null) {
        throw e.response.data;
      } else {
        throw e;
      }
    });
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



export const clearAsyncStorage = async () => {
  console.log(await AsyncStorage.getAllKeys());
  await AsyncStorage.clear();
  console.log(await AsyncStorage.getAllKeys());
};