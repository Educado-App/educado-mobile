import * as api from '../api/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DirectoryService from '../services/DirectoryService';

const TEST_COURSE = '@testCourse';
const COURSE_LIST = '@courseList';

export const getTestCourseFromApi = async () => {

  try {

    let localCourse = JSON.parse(await AsyncStorage.getItem(TEST_COURSE));

    if(localCourse == null){

      return await api.getTestCourse().then(

          async testCourse => {
            testCourse.data.sections[0].exercises[0].content.url = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";
            let course = JSON.stringify(testCourse);
            await AsyncStorage.setItem(TEST_COURSE, course);
            return course;
          }
      );
    } else return localCourse;

  } catch (e) {
    console.error(e);
  }
}

export const getCourseList = async () => {

  try {

    // Check if the course list is already downloaded
    let courseList = JSON.parse(await AsyncStorage.getItem(COURSE_LIST));

    if (courseList == null) {

      return await api.getCourses().then(
          async list => {

            let newCourseList = [];

            for (const course of list.data) {

              const localCourse = JSON.parse(await AsyncStorage.getItem(course._id));

              // Make new list with member isDownloaded
              newCourseList.push({
                course: course,
                isActive: localCourse !== null,
              });
            }

            // Save new courseList for this key and return it.
            await AsyncStorage.setItem(COURSE_LIST, JSON.stringify(newCourseList));
            return newCourseList;
          }
      );

    } else return courseList;

  } catch (e) {
    console.error(e);
  }
}

export const getCourseById = async (courseId) => {
  try {
    let value = AsyncStorage.getItem(courseId);
    if (value == null) {
      value = await api.getCourse(courseId);
      await AsyncStorage.setItem(courseId, value);
    }
    return value;
  } catch (e) {
    console.error(e);
  }
}

export async function downloadCourse(courseId) {
  try {
    let course = api.getCourse(courseId);
    await AsyncStorage.setItem('@course', course);
    let name = course.name;
    let directory = await DirectoryService.CreateDirectory(name);
    for (let exercise in course.sections.exercises) {
      let url = exercise.content.url;
      await DirectoryService.DownloadAndStoreVideo(url, directory);
    }
  } catch (e) {
    console.error(e);
  }
}

//getSectionList(course-id)
//getSectionById(section-id)
//getExerciseList(section-id)
//getExerciseById(exercise-id)
//getNextExercise(exercise-id)
