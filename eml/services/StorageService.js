import * as api from '../api/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DirectoryService from '../services/DirectoryService';

const COURSE_LIST = '@courseList';
const processSection = async (section) => {
  const exerciseContent = [];

  for (const exercise of section.exercises) {
    processExercise(exercise);
    exerciseContent.push(exercise);
  }

  const currentSection = {
    id: section.id,
    title: section.title,
    number: section.sectionNumber,
    isComplete: false,
    exercises: exerciseContent,
  };

  await AsyncStorage.setItem(section.id, JSON.stringify(currentSection));
  return currentSection;
};

const createCourseContent = (requestedCourse, sections) => {
  return {
    title: requestedCourse.data.title,
    id: requestedCourse.data.id,
    icon: requestedCourse.data.category
      ? requestedCourse.data.category.icon || getDefaultIcon()
      : getDefaultIcon(),
    categoryId: requestedCourse.data.category
      ? requestedCourse.data.category.id || ''
      : '',
    sections,
    isActive: false,
    isComplete: false,
  };
};

export const getCourseList = async () => {
  try {
    return await refreshCourseList();
  } catch (e) {
    // Check if the course list already exists in AsyncStorage
    let courseList = JSON.parse(await AsyncStorage.getItem(COURSE_LIST));
    if (courseList !== null) {
      return courseList;
    }
    console.error(e);
  }
};

export const refreshCourseList = async () => {
  return await api
    .getCourses()
    .then(async (list) => {
      let newCourseList = [];

      for (const course of list.data) {
        const courseId = course.id;
        const localCourse = JSON.parse(await AsyncStorage.getItem(courseId));

        // Make new list with required members
        newCourseList.push({
          title: course.title,
          courseId: course.id,
          iconPath: course.category == null ? '' : course.category.icon,
          categoryId: course.category == null ? '' : course.category.id,
          isActive: localCourse == null ? false : localCourse.isActive,
        });
      }

      // Save new courseList for this key and return it.
      await AsyncStorage.setItem(COURSE_LIST, JSON.stringify(newCourseList));
      return newCourseList;
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getCourseById = async (courseId) => {
  try {
    const course = JSON.parse(await AsyncStorage.getItem(courseId));

    if (course != null) {
      return course;
    } else {
      const requestedCourse = await api.getCourse(courseId);
      const sections = await Promise.all(
        requestedCourse.data.sections.map(processSection)
      );

      const courseContent = createCourseContent(requestedCourse, sections);

      await AsyncStorage.setItem(courseId, JSON.stringify(courseContent));
      return courseContent;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const downloadCourse = async (courseId) => {
  if (courseId !== undefined) {
    try {
      const courseList = JSON.parse(await AsyncStorage.getItem(COURSE_LIST));
      const course = JSON.parse(await AsyncStorage.getItem(courseId));

      if (course !== null && courseList !== null) {
        //console.log("\n BEFORE \n ", course);

        const courseDirectory = course.id;
        const icon = course.icon;
        const sections = course.sections;

        //making directory for the course
        await DirectoryService.CreateDirectory(courseDirectory);

        //downloading the icon for the course
        course.icon = await DirectoryService.DownloadAndStoreContent(
          icon,
          courseDirectory,
          'courseIcon'
        );

        //downloading each video of the exercises and storing in their respective sections
        await processSections(sections, courseDirectory);

        //store the downloaded course back in the AsyncStorage
        course.isActive = true;
        //console.log("\n AFTER \n ", course);
        await AsyncStorage.setItem(courseId, JSON.stringify(course));

        //store the updated course list back in the AsyncStorage
        setCoursesToActive(courseList);

        await AsyncStorage.setItem(COURSE_LIST, JSON.stringify(courseList));
      } else {
        return console.log('error: course not found!');
      }
    } catch (e) {
      console.error(e);
    }
  } else console.log('error: course id is not defined!');
};

export const getNextExercise = async (sectionId) => {
  try {
    const currentSection = JSON.parse(await AsyncStorage.getItem(sectionId));

    for (const exercise of currentSection.exercises) {
      if (!exercise.isComplete) {
        return exercise;
      }
    }

    return true;
  } catch (e) {
    console.error(e);
  }
};

export const getFeedBackByExerciseId = async (sectionId, exerciseId) => {
  try {
    const currentSection = JSON.parse(await AsyncStorage.getItem(sectionId));

    for (const exercise of currentSection.exercises) {
      if (exercise.id === exerciseId) {
        return exercise.onWrongFeedback;
      }
    }
  } catch (e) {
    console.error(e);
  }
};
export const updateCompletionStatus = async (
  courseId,
  sectionId,
  exerciseId
) => {
  try {
    const course = JSON.parse(await AsyncStorage.getItem(courseId));
    const updatedSection = JSON.parse(await AsyncStorage.getItem(sectionId));

    //console.log("FIRST EX BEFORE: ", updatedSection.exercises[0].isComplete);
    //console.log("SECOND EX BEFORE: ", updatedSection.exercises[1].isComplete);

    if (course !== null && updatedSection !== null && exerciseId !== null) {
      for (const exercise of updatedSection.exercises) {
        if (exercise.id === exerciseId && exercise.isComplete === false) {
          exercise.isComplete = true;
          break;
        }
      }

      for (let section of course.sections) {
        if (section.id === sectionId) {
          section = updatedSection;
        }
      }
      //console.log("FIRST EX AFTER: ", updatedSection.exercises[0].isComplete);
      // console.log("SECOND EX AFTER: ", updatedSection.exercises[1].isComplete);
    }

    await AsyncStorage.setItem(courseId, JSON.stringify(course));
    await AsyncStorage.setItem(sectionId, JSON.stringify(updatedSection));
  } catch (e) {
    console.error(e);
  }
};

export const deleteCourse = async (courseId) => {
  if (courseId !== undefined) {
    const courseList = JSON.parse(await AsyncStorage.getItem(COURSE_LIST));

    try {
      for (const course of courseList) {
        if (course.courseId === courseId) {
          console.log('hey');
          course.isActive = false;
        }
      }

      await AsyncStorage.setItem(COURSE_LIST, JSON.stringify(courseList));
      // delete sections of course
      const course = JSON.parse(await AsyncStorage.getItem(courseId));
      course.sections.forEach(async (element) => {
        await AsyncStorage.removeItem(element.id);
      });

      await DirectoryService.DeleteDirectory(courseId);
      await AsyncStorage.removeItem(courseId);
    } catch (e) {
      console.error(e);
    }
  }
};

export const clearAsyncStorage = async () => {
  console.log(await AsyncStorage.getAllKeys());
  await AsyncStorage.clear();
  console.log(await AsyncStorage.getAllKeys());
};

function processExercise(exercise) {
  if (exercise.length === 0) {
    exercise.content = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4';
    exercise.onWrongFeedback = 'https://drive.google.com/uc?export=download&id=10av_XwIKYjGCNBfb38wuVWBT3GQC2PGN';
  }

  if (exercise.onWrongFeedback === '') {
    exercise.onWrongFeedback = 'https://drive.google.com/uc?export=download&id=10av_XwIKYjGCNBfb38wuVWBT3GQC2PGN';
  }

  if (exercise.content === '') {
    exercise.content = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4';
  }

  exercise.isComplete = false;
}

async function setCoursesToActive(courseList) {
  for (const course of courseList) {
    if (course.courseId === courseId) {
      course.isActive = true;
        break;
    }
  }
}

async function downloadAndStoreExerciseContent(
  exercise,
  sectionDirectory
) {
  // Download and store the primary video content
  const primaryUrl = exercise.content;
  exercise.content = await DirectoryService.DownloadAndStoreContent(
    primaryUrl,
    sectionDirectory,
    exercise.id
  );

  // Download and store the secondary (onWrongFeedback) video content
  const secondaryUrl = exercise.onWrongFeedback;
  exercise.onWrongFeedback = await DirectoryService.DownloadAndStoreContent(
    secondaryUrl,
    sectionDirectory,
    exercise.id + 'feedback'
  );
}

async function processSections(sections, courseDirectory) {
  for (const section of sections) {
    const sectionDirectory = courseDirectory + '/' + section.id;
    await DirectoryService.CreateDirectory(sectionDirectory);

    for (const exercise of section.exercises) {
      await downloadAndStoreExerciseContent(exercise, sectionDirectory);
    }

    await AsyncStorage.setItem(section.id, JSON.stringify(section));
  }
}