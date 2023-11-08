import getCourseListData from './data/getCourseList.json'
import getCourseByIdData from './data/getCourseByID.json'
import getNextExerciseBySectionIdData from './data/getNextExerciseBySectionId.json'
import getFeedBackByExerciseIdData from './data/getFeedbackByExerciseId.json'

function getCourseList() {
  return getCourseListData
}

function getCourseById(id) {
  return getCourseByIdData[id - 1]
}

function getNextExerciseBySectionId(sectionId) {
  return getNextExerciseBySectionIdData
}

function getFeedBackByExerciseId(exerciseId) {
  return getFeedBackByExerciseIdData
}

function updateExerciseBySectionId(exerciseId) { }

function isCourseActive(courseId) {
  return getCourseListData[courseId - 1].isDownloaded
}

export default {
  getCourseList,
  getCourseById,
  getNextExerciseBySectionId,
  getFeedBackByExerciseId,
  updateExerciseBySectionId,
  isCourseActive
}
