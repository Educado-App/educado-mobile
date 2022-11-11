import api from '../api/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DirectoryService from '../local-storage-handler/DirectoryService.js';

export const getCourseList = async () => {
  try {
    let value = await AsyncStorage.getItem('@courseList');
    if(value == null) {
      console.log('value not in storage, fetch from api then store and return.');
      value = await api.getCourses();
      await AsyncStorage.setItem('@courseList', value);
    }
    return value
  } catch (e) {
    console.error(e);
  }
}

export const getCourseById = (courseId) => {
  //let value = AsyncStorage.getItem('@course');
  try {
    let value = await api.getCourse(courseId);

    await AsyncStorage.setItem('@course', value);
    console.log(`STUB: getCourseById: ${courseId}`);
    return value;
  } catch (e) {
    console.error(e);
  }
}

export const downloadCourse = async (courseId) => {
  try {
    let name = api.getCourseById(courseId).name;
    let directory = await DirectoryService.CreateDirectory(name);
  } catch (e) {
    console.error(e);
  }
}

