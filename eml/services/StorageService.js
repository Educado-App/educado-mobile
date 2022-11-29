import * as api from '../api/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DirectoryService from '../services/DirectoryService';

const TEST_COURSE = '@testCourse';
const COURSE_LIST = '@courseList';

export const getTestCourseFromApi = async () => {

    try {

        let localCourse = JSON.parse(await AsyncStorage.getItem(TEST_COURSE));

        if (localCourse == null) {

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

                        const courseId = course.id;

                        const localCourse = JSON.parse(await AsyncStorage.getItem(courseId));

                        // Make new list with required members
                        newCourseList.push({
                            title: course.title,
                            courseId: course.id,
                            iconPath: course.category.icon,
                            categoryId: course.category.id,
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

        const course = JSON.parse(await AsyncStorage.getItem(courseId));

        if (course == null) {

            return await api.getCourse(courseId).then(

                async requestedCourse => {

                    let sections = [];

                    for (const section of requestedCourse.data.sections) {

                        let exerciseContent = [];

                        for (const exercise of section.exercises) {

                            exercise.isComplete = false;

                            exerciseContent.push(exercise)
                        }

                        let currentSection = {
                            id: section.id,
                            title: section.title,
                            number: section.sectionNumber,
                            isComplete: false,
                        }

                        //Future Work: Return object should be different for UI

                        currentSection.exercises = exerciseContent;
                        sections.push(currentSection);
                        await AsyncStorage.setItem(section.id, JSON.stringify(currentSection));
                    }

                    const courseContent = {
                        title: requestedCourse.data.title,
                        id: requestedCourse.data.id,
                        icon: requestedCourse.data.category.icon,
                        categoryId: requestedCourse.data.category.id,
                        sections: sections,
                        isActive: false,
                    }

                    await AsyncStorage.setItem(courseId, JSON.stringify(courseContent));
                    return courseContent;
                }
            );

        } else {
            return course;
        }

    } catch (e) {
        console.error(e);
    }
}

export const updateCompletionStatus = async (sectionId, exerciseId) => {

    try {

        let section = JSON.parse(await AsyncStorage.getItem(sectionId));

        if (section !== null && exerciseId !== null) {

            for (const exercise of section.exercises) {

                if (exercise.id === exerciseId && exercise.isComplete !== true) {
                    exercise.isComplete = true;
                    break;
                }
            }

        } else if (exerciseId == null) {
            section.isComplete = true
        }

        await AsyncStorage.setItem(sectionId, JSON.stringify(section));

    } catch (e) {
        console.error(e);
    }
}

export const getNextExercise = async (sectionId) => {

    try {

        let currentSection = JSON.parse(await AsyncStorage.getItem(sectionId))

        for (const exercise of currentSection.exercises) {

            if (!exercise.isComplete) {
                return exercise;
            }

        }

    } catch (e) {
        console.error(e);
    }
}

export const downloadCourse = async (courseId) => {

    if (courseId !== undefined) {

        try {

            const course = JSON.parse(await AsyncStorage.getItem(courseId));

            if (course !== null) {

                const courseDirectory = course.id;
                const icon = course.icon;
                const sections = course.sections;

                //making directory for the course
                await DirectoryService.CreateDirectory(courseDirectory);

                //downloading the icon for the course
                await DirectoryService.DownloadAndStoreContent(icon, courseDirectory, 'courseIcon')
                    .then(localUri => {
                        course.icon = localUri;
                    })
                    .catch(error => { console.log(error) });

                //downloading each video of the exercises and storing in their respective sections
                for (const section of sections) {

                    const sectionDirectory = courseDirectory + '/' + section.id;
                    await DirectoryService.CreateDirectory(sectionDirectory);

                    for (const exercise of section.exercises) {

                        const url = exercise.content;

                        await DirectoryService.DownloadAndStoreContent(url, sectionDirectory, exercise.id)
                            .then(localUri => {
                                exercise.content = localUri;
                            })
                            .catch(error => { console.log(error); });
                    }
                }

                //store the downloaded course back in the AsyncStorage
                course.isActive = true;
                await AsyncStorage.setItem(courseId, JSON.stringify(course));

            } else {
                return console.log("error: course not found!");
            }

        } catch (e) {
            console.error(e);
        }

    } else console.log("error: course id is not defined!");
}

export const downloadTestCourse = async (courseId) => {

    if (courseId !== undefined) {

        try {

            const course = JSON.parse(await AsyncStorage.getItem(courseId));

            if (course !== null) {

                const courseDirectory = course.data.id;
                const icon = course.data.category.icon;
                const sections = course.data.sections;

                //making directory for the course
                await DirectoryService.CreateDirectory(courseDirectory);

                //downloading the icon for the course
                await DirectoryService.DownloadAndStoreContent(icon, courseDirectory, 'courseIcon')
                    .then(localUri => {
                        course.data.icon = localUri;
                    })
                    .catch(error => { console.log(error) });

                //downloading each video of the exercises and storing in their respective sections
                for (const section of sections) {

                    const sectionDirectory = courseDirectory + '/' + section.id;
                    await DirectoryService.CreateDirectory(sectionDirectory);

                    for (const exercise of section.exercises) {

                        const url = exercise.content;

                        await DirectoryService.DownloadAndStoreContent(url, sectionDirectory, exercise.id)
                            .then(localUri => {
                                exercise.content = localUri;
                            })
                            .catch(error => { console.log(error); });
                    }
                }

                //store the downloaded course back in the AsyncStorage
                await AsyncStorage.setItem(courseId, JSON.stringify(course));

            } else {
                return console.log("error: course not found!");
            }

        } catch (e) {
            console.error(e);
        }

    } else console.log("error: course id is not defined!");
}

//getSectionList(course-id)
//getSectionById(section-id)
//getExerciseList(section-id)
//getNextExerciseBySectionId(section-id)
//getWrongFeedback(exercise-id)

//updateExercise(exercise-id)

/*
 {
  "on_wrong_feedback": {
    "type": "video",
    "uri": "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
  }
}
 */

//Icon also should be downloaded
//When Logout: back button should be disabled!!!!
