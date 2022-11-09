import getCourseListData from './data/getCourseList.json'
import getCourseByIdData from './data/getCourseByID.json'
import getNextExerciseBySectionIdData from './data/getNextExerciseBySectionId.json'
import getFeedBackByExerciseIdData from './data/getFeedbackByExerciseId.json'

function getCourseList() {
  return getCourseListData
}

function getCourseById(id) {
  return getCourseByIdData
}

function getNextExerciseBySectionId(sectionId) {
  return getNextExerciseBySectionIdData
}

function getFeedBackByExerciseId(exerciseId) {
  return getFeedBackByExerciseIdData
}

export default {
  getCourseList,
  getCourseById,
  getNextExerciseBySectionId,
  getFeedBackByExerciseId
}
