import * as api from '../api/api.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as DirectoryService from '../services/DirectoryService'

const TEST_COURSE = '@testCourse'
const COURSE_LIST = '@courseList'

export const getTestCourseFromApi = async () => {
  try {
    let localCourse = JSON.parse(await AsyncStorage.getItem(TEST_COURSE))

    if (localCourse == null) {
      return await api.getTestCourse().then(async (testCourse) => {
        testCourse.data.sections[0].exercises[0].content.url =
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
        let course = JSON.stringify(testCourse)
        await AsyncStorage.setItem(TEST_COURSE, course)
        return course
      })
    } else return localCourse
  } catch (e) {
    console.error(e)
  }
}

export const getCourseList = async () => {
  try {
    //Uncomment to clear async storage cache upon loading explore screen

    // console.log(await AsyncStorage.getAllKeys())
    // console.log(await AsyncStorage.clear())
    // console.log(await AsyncStorage.getAllKeys())
    // console.log(
    //   await DirectoryService.DeleteDirectory('635fb5b9b2fb6c4f49084682')
    // )

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
                content:
                  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
              })
            } else if (exercise.content === '') {
              exercise.content =
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
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
          icon:
            requestedCourse.data.category == null
              ? ''
              : requestedCourse.data.category.icon,
          categoryId:
            requestedCourse.data.category == null
              ? ''
              : requestedCourse.data.category.id,
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

export const getNextExercise = async (sectionId) => {
  try {
    const currentSection = JSON.parse(await AsyncStorage.getItem(sectionId))

    //console.log("GET NEXT EXERCISE \n ", currentSection);

    for (const exercise of currentSection.exercises) {
      if (!exercise.isComplete) {
        return exercise
      }
    }
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
        const courseDirectory = course.id
        const icon = course.icon
        const sections = course.sections

        //making directory for the course
        await DirectoryService.CreateDirectory(courseDirectory)

        //downloading the icon for the course
        await DirectoryService.DownloadAndStoreContent(
          icon,
          courseDirectory,
          'courseIcon'
        )
          .then((localUri) => {
            course.icon = localUri
          })
          .catch((error) => {
            console.log(error)
          })

        //downloading each video of the exercises and storing in their respective sections
        for (const section of sections) {
          const sectionDirectory = courseDirectory + '/' + section.id
          await DirectoryService.CreateDirectory(sectionDirectory)

          for (const exercise of section.exercises) {
            const url = exercise.content

            await DirectoryService.DownloadAndStoreContent(
              url,
              sectionDirectory,
              exercise.id
            )
              .then((localUri) => {
                exercise.content = localUri
              })
              .catch((error) => {
                console.log(error)
              })
          }
        }

        //store the downloaded course back in the AsyncStorage
        course.isActive = true
        await AsyncStorage.setItem(courseId, JSON.stringify(course))

        //store the updated course list back in the AsyncStorage
        for (const course of courseList) {
          if (course.courseId === courseId) {
            course.isActive = true
            break
          }
        }
        await AsyncStorage.setItem(COURSE_LIST, JSON.stringify(courseList))
      } else {
        return console.log('error: course not found!')
      }
    } catch (e) {
      console.error(e)
    }
  } else console.log('error: course id is not defined!')
}

export const deleteCourse = async (id) => {
  if (id !== undefined) {
    try {
      const course = JSON.parse(await AsyncStorage.getItem(id))

      if (course !== null) {
        await DirectoryService.DeleteDirectory(course)
        await AsyncStorage.removeItem(id)
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const downloadTestCourse = async (courseId) => {
  if (courseId !== undefined) {
    try {
      const course = JSON.parse(await AsyncStorage.getItem(courseId))

      if (course !== null) {
        const courseDirectory = course.data.id
        const icon = course.data.category.icon
        const sections = course.data.sections

        //making directory for the course
        await DirectoryService.CreateDirectory(courseDirectory)

        //downloading the icon for the course
        await DirectoryService.DownloadAndStoreContent(
          icon,
          courseDirectory,
          'courseIcon'
        )
          .then((localUri) => {
            course.data.icon = localUri
          })
          .catch((error) => {
            console.log(error)
          })

        //downloading each video of the exercises and storing in their respective sections
        for (const section of sections) {
          const sectionDirectory = courseDirectory + '/' + section.id
          await DirectoryService.CreateDirectory(sectionDirectory)

          for (const exercise of section.exercises) {
            const url = exercise.content

            await DirectoryService.DownloadAndStoreContent(
              url,
              sectionDirectory,
              exercise.id
            )
              .then((localUri) => {
                exercise.content = localUri
              })
              .catch((error) => {
                console.log(error)
              })
          }
        }

        //store the downloaded course back in the AsyncStorage
        await AsyncStorage.setItem(courseId, JSON.stringify(course))
      } else {
        return console.log('error: course not found!')
      }
    } catch (e) {
      console.error(e)
    }
  } else console.log('error: course id is not defined!')
}

/*
 {
  "on_wrong_feedback": {
    "type": "video",
    "uri": "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
  }
}
 */

//When Logout: back button should be disabled!!!!
