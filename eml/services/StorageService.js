import * as api from '../api/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DirectoryService from '../services/DirectoryService';


const COURSE_LIST = '@courseList';
const SUB_COURSE_LIST = '@subCourseList';
const SECTION_LIST = '@sectionList';
const COURSE = '@course';


export const getExercises = async (courseId, sectionId) => {
  const exercises = await api.getExercisesInSection(courseId, sectionId);
  console.log('exercises: ', exercises);
  
  return exercises;
};

export const getSections = async (courseId) => {
  const sections = await api.getAllSections(courseId);

  return sections;
};

export const getSection = async (courseId, sectionId) => {
  const res = await api.getSection(courseId, sectionId);
  return res.data;
};

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

export const getCourseById = async (courseId) => {
  try {
    const course = JSON.parse(await AsyncStorage.getItem(courseId));

    if (course == null) {
      return await api.getCourse(courseId).then(async (requestedCourse) => {
        let sections = [];

        for (const section of requestedCourse.data.sections) {
          let exerciseContent = [];

          for (const exercise of section.exercises) {
            if (exercise.length === 0) {
              exercise.push({
                content:
                  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
                onWrongFeedback:
                  'https://drive.google.com/uc?export=download&id=10av_XwIKYjGCNBfb38wuVWBT3GQC2PGN',
              });
            }
            if (exercise.onWrongFeedback === '') {
              exercise.onWrongFeedback =
                'https://drive.google.com/uc?export=download&id=10av_XwIKYjGCNBfb38wuVWBT3GQC2PGN';
            }
            if (exercise.content === '') {
              exercise.content =
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4';
            }

            exercise.isComplete = false;
            exerciseContent.push(exercise);
          }

          let currentSection = {
            id: section.id,
            title: section.title,
            number: section.sectionNumber,
            isComplete: false,
          };

          currentSection.exercises = exerciseContent;
          sections.push(currentSection);
          await AsyncStorage.setItem(
            section.id,
            JSON.stringify(currentSection)
          );
        }

        const courseContent = {
          title: requestedCourse.data.title,
          id: requestedCourse.data.id,
          icon:
            requestedCourse.data.category === undefined ||
            requestedCourse.data.category === null
              ? 'https://sashabarab.org/wp-content/uploads/2015/02/course-icon.png'
              : requestedCourse.data.category.icon,
          categoryId:
            requestedCourse.data.category === undefined ||
            requestedCourse.data.category === null
              ? ''
              : requestedCourse.data.category.id,
          sections: sections,
          isActive: false,
          isComplete: false,
        };

        //console.log("STORAGE SERVICE \n " , courseContent.sections[0].exercises[0])
        await AsyncStorage.setItem(courseId, JSON.stringify(courseContent));
        return courseContent;
      });
    } else return course;
  } catch (e) {
    console.error(e);
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
        for (const section of sections) {
          const sectionDirectory = courseDirectory + '/' + section.id;
          await DirectoryService.CreateDirectory(sectionDirectory);

          for (const exercise of section.exercises) {
            //First download all the primary video content
            const primaryUrl = exercise.content;
            exercise.content = await DirectoryService.DownloadAndStoreContent(
              primaryUrl,
              sectionDirectory,
              exercise.id
            );

            //Second download all the secondary (onWrongFeedback) video content
            const secondaryUrl = exercise.onWrongFeedback;
            exercise.onWrongFeedback =
              await DirectoryService.DownloadAndStoreContent(
                secondaryUrl,
                sectionDirectory,
                exercise.id + 'feedback'
              );
          }
          await AsyncStorage.setItem(section.id, JSON.stringify(section));
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


export const getCourseList = async () => {
  try {
    return await refreshCourseList();
  } catch (e) {
    // Check if the course list already exists in AsyncStorage
    let courseList = JSON.parse(await AsyncStorage.getItem(COURSE_LIST));
    if (courseList !== null) {
      console.log(courseList);
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
      for (const course of list) {
        // Make new list with required members
        newCourseList.push({
          title: course.title,
          courseId: course._id,
          description: course.description,
          category: course.category,
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

export const getSubCourseList = async () => {
  try {
    return await refreshSubCourseList();

  } catch (e) {
    // Check if the course list already exists in AsyncStorage
    let courseList = JSON.parse(await AsyncStorage.getItem(SUB_COURSE_LIST));
    if (courseList !== null) {
      return courseList;
    }
    console.error(e);
  }
};
export const refreshSubCourseList = async () => {
  return await api
    .getSubscriptions()
    .then(async (list) => {
      let newCourseList = [];
      for (const course of list) {

        // Make new list with required members
        newCourseList.push({
          title: course.title,
          courseId: course._id,
          description: course.description,
          category: course.category,
        });
      }
      // Save new courseList for this key and return it.
      await AsyncStorage.setItem(SUB_COURSE_LIST, JSON.stringify(newCourseList));
      return newCourseList;
    })
    .catch((e) => {

      console.log(e);
    });
};

export const getSectionList = async (course_id) => {
  try {
    return await refreshSectionList(course_id);
  } catch (e) {
    // Check if the course list already exists in AsyncStorage
    let sectionList = JSON.parse(await AsyncStorage.getItem(SECTION_LIST));
    if (sectionList !== null) {
      console.log(sectionList);
      return sectionList;
    }
    console.error(e);
  }
};
export const refreshSectionList = async (course_id) => {
  return await api
    .getAllSections(course_id)
    .then(async (list) => {
      let newSectionList = [];
      for (const section of list) {
        //const sectionId = section._id;
        //const localSection = JSON.parse(await AsyncStorage.getItem(sectionId));
        newSectionList.push({
          title: section.title,
          total: section.totalPoints,
          sectionId: section._id,
          description: section.description,
          components: section.components,
          parentCourseId: section.parentCourse,
        });
      }
      // Save new courseList for this key and return it.
      await AsyncStorage.setItem(SECTION_LIST, JSON.stringify(newSectionList));
      
      return newSectionList;
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getCourseId = async (id) => {
  try {
    return await refreshCourse(id);
  } catch (e) {
    // Check if the course already exists in AsyncStorage
    let course = JSON.parse(await AsyncStorage.getItem(COURSE));
    if (course !== null) {
      console.log(course);
      return course;
    }
    console.error(e);
  }
};
export const refreshCourse = async (id) => {
  return await api
    .getCourse(id)
    .then(async (course) => { 
      return course;
    })
    .catch((e) => {
      console.log(e);
    });
};


export const clearAsyncStorage = async () => {
  console.log(await AsyncStorage.getAllKeys());
  await AsyncStorage.clear();
  console.log(await AsyncStorage.getAllKeys());
};
