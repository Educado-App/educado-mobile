import * as api from '../api/api.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as DirectoryService from '../services/DirectoryService'

const COURSE_LIST = '@courseList'

export const getCourseList = async () => {
  try {

    // Check if the course list already exists in AsyncStorage
    let courseList = JSON.parse(await AsyncStorage.getItem(COURSE_LIST))

    if (courseList == null) {
      return await refreshCourseList()
    } else return courseList
  } catch (e) {
    console.error(e)
  }
}
export const refreshCourseList = async () => {
  return await api
    .getCourses()
    .then(async (list) => {
      let newCourseList = []

      for (const course of list.data) {
        const courseId = course.id

        const localCourse = JSON.parse(await AsyncStorage.getItem(courseId))

        // Make new list with required members
        newCourseList.push({
          title: course.title,
          courseId: course.id,
          iconPath: course.category == null ? '' : course.category.icon,
          categoryId: course.category == null ? '' : course.category.id,
          isActive: localCourse !== null
        })
      }

      // Save new courseList for this key and return it.
      await AsyncStorage.setItem(COURSE_LIST, JSON.stringify(newCourseList))
      return newCourseList
    })
    .catch((e) => {
      console.log(e)
    })
}
export const getCourseById = async (courseId) => {
  try {
    const course = JSON.parse(await AsyncStorage.getItem(courseId))

    if (course == null) {
      return await api.getCourse(courseId).then(async (requestedCourse) => {

        let sections = []

        for (const section of requestedCourse.data.sections) {

          let exerciseContent = []

          for (const exercise of section.exercises) {

            if (exercise.length === 0) {
              exercise.push({
                content: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
                onWrongFeedback: 'https://drive.google.com/file/d/10av_XwIKYjGCNBfb38wuVWBT3GQC2PGN/view?usp=share_link',
              });
            } else if (exercise.content === '' && exercise.onWrongFeedback === '') {
              exercise.content = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4';
              exercise.onWrongFeedback = 'https://drive.google.com/file/d/10av_XwIKYjGCNBfb38wuVWBT3GQC2PGN/view?usp=share_link';
            }
            else if (exercise.content === '') {
              exercise.content = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4';
            }
            else if (exercise.onWrongFeedback === '') {
              exercise.onWrongFeedback = 'https://drive.google.com/file/d/10av_XwIKYjGCNBfb38wuVWBT3GQC2PGN/view?usp=share_link';
            }

            exercise.isComplete = false
            exerciseContent.push(exercise)
          }

          let currentSection = {
            id: section.id,
            title: section.title,
            number: section.sectionNumber,
            isComplete: false
          }

          currentSection.exercises = exerciseContent
          sections.push(currentSection)
          await AsyncStorage.setItem(section.id, JSON.stringify(currentSection))
        }

        const courseContent = {
          title: requestedCourse.data.title,
          id: requestedCourse.data.id,
          icon: requestedCourse.data.category === null ||
                requestedCourse.data.category.icon === 'https://s3.eu-central-1.amazonaws.com/'
                ? 'https://sashabarab.org/wp-content/uploads/2015/02/course-icon.png' : requestedCourse.data.category.icon,
          categoryId: requestedCourse.data.category === null ? '' : requestedCourse.data.category.id,
          sections: sections,
          isActive: false,
          isComplete: false
        }

        //console.log("STORAGE SERVICE \n " , courseContent.sections[0].exercises[0])
        await AsyncStorage.setItem(courseId, JSON.stringify(courseContent))
        return courseContent
      })
    } else return course

  } catch (e) {
    console.error(e)
  }
}
export const downloadCourse = async (courseId) => {

  if (courseId !== undefined) {

    try {

      const courseList = JSON.parse(await AsyncStorage.getItem(COURSE_LIST))
      const course = JSON.parse(await AsyncStorage.getItem(courseId))

      if (course !== null && courseList !== null) {

        //console.log("\n BEFORE \n ", course);

        const courseDirectory = course.id
        const icon = course.icon
        const sections = course.sections

        //making directory for the course
        await DirectoryService.CreateDirectory(courseDirectory);

        //downloading the icon for the course
        course.icon = await DirectoryService.DownloadAndStoreContent(icon, courseDirectory, 'courseIcon');

        //downloading each video of the exercises and storing in their respective sections
        for (const section of sections) {

          const sectionDirectory = courseDirectory + '/' + section.id;
          await DirectoryService.CreateDirectory(sectionDirectory);

          for (const exercise of section.exercises) {

            //First download all the primary video content
            const primaryUrl = exercise.content;
            exercise.content = await DirectoryService.DownloadAndStoreContent(primaryUrl, sectionDirectory, exercise.id);

            //Second download all the secondary (onWrongFeedback) video content
            const secondaryUrl = exercise.onWrongFeedback;
            exercise.onWrongFeedback = await DirectoryService.DownloadAndStoreContent(secondaryUrl, sectionDirectory, exercise.id + 'feedback');
          }
        }

        //store the downloaded course back in the AsyncStorage
        course.isActive = true;
        //console.log("\n AFTER \n ", course);
        await AsyncStorage.setItem(courseId, JSON.stringify(course));

        //store the updated course list back in the AsyncStorage
        for (const course of courseList) {
          if (course.courseId === courseId) {
            course.isActive = true;
            break;
          }
        }
        await AsyncStorage.setItem(COURSE_LIST, JSON.stringify(courseList));
      } else {
        return console.log('error: course not found!');
      }
    } catch (e) {
      console.error(e);
    }
  } else console.log('error: course id is not defined!');
}
export const getNextExercise = async (sectionId) => {

  try {

    const currentSection = JSON.parse(await AsyncStorage.getItem(sectionId))

    for (const exercise of currentSection.exercises) {
      if (!exercise.isComplete) {
        return exercise
      }
    }

  } catch (e) {
    console.error(e)
  }
}
export const getFeedBackByExerciseId = async (sectionId, exerciseId) => {

  try {

    const currentSection = JSON.parse(await AsyncStorage.getItem(sectionId))

    for (const exercise of currentSection.exercises) {
      if (exercise.id === exerciseId) {
        return exercise.onWrongFeedback;
      }
    }

  } catch (e) {
    console.error(e)
  }

}
export const updateCompletionStatus = async (sectionId, exerciseId) => {
  try {
    const section = JSON.parse(await AsyncStorage.getItem(sectionId))

    if (section !== null && exerciseId !== null) {
      for (const exercise of section.exercises) {
        if (exercise.id === exerciseId && exercise.isComplete !== true) {
          exercise.isComplete = true
          break
        }
      }
    } else if (exerciseId === null) {
      section.isComplete = true
    }

    await AsyncStorage.setItem(sectionId, JSON.stringify(section))
  } catch (e) {
    console.error(e)
  }
}
export const deleteCourse = async (courseId) => {
  if (courseId !== undefined) {
    try {
      await DirectoryService.DeleteDirectory(courseId);
      await AsyncStorage.removeItem(courseId);
    } catch (e) {
      console.error(e)
    }
  }
}
