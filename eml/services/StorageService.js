import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getCourseList = async () => {
  try {
    let value = await AsyncStorage.getItem('@courseList');
    if(value == null) {
      console.log('value not in storage, fetch from api then store and return.')
      value = await api.getCourses();
      await AsyncStorage.setItem('@courseList', value);
    }
    return value
  } catch (e) {
    console.error(e);
  }
}

export const getCourseById = (courseId) => {
  console.log(`STUB: getCourseById: ${courseId}`)
}


