import * as api from '../api/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DirectoryService from '../services/DirectoryService';

const TEST_COURSE = '@testCourse';

export const getTestCourseFromApi = async () => {
  try {

    let localCourse = JSON.parse(await AsyncStorage.getItem(TEST_COURSE));

    if(localCourse == null){

      await api.getTestCourse().then(
          async testCourse => {
            testCourse.data.sections[0].exercises[0].content.url = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";
            await AsyncStorage.setItem(TEST_COURSE, JSON.stringify(testCourse));
            return testCourse;
          }
      );

    }

    else return localCourse;

  } catch (e) {
    console.error(e);
  }
}

export const getCourseList = async () => {
  try {
    let courseList = await AsyncStorage.getItem('@courseList');

    // Check if course is downloaded
    if (courseList == null) {
      courseList = await api.getCourses();

      let savedCourseList;
      courseList.array.forEach(element => {
        const data = AsyncStorage.getItem(element._id);

        // Make new list with member isDownloaded
        savedCourseList.append({
          isDownloaded: data !== null,
          CourseInfo: element
        });
      });

      // Save new courseList for this key and return it.
      await AsyncStorage.setItem('@courseList', savedCourseList);
      courseList = savedCourseList;
    }
    return courseList;
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
