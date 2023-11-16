/** Utility functions used in Explore and Course screens **/
import { completeExercise } from '../api/userApi.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
const USER_INFO = '@userInfo';

/**
 * Converts a numeric difficulty level to a human-readable label.
 * @param {number} lvl - The difficulty level of the course.
 * @returns {string} The corresponding difficulty label in Portuguese.
 */
export function getDifficultyLabel(lvl) {
  switch (lvl) {
  case 1:
    return 'Iniciante';
  case 2:
    return 'Intermediário';
  case 3:
    return 'Avançado';
  default:
    return 'Iniciante';
  }
}

/**
 * Converts milliseconds to time in the format 'MM:SS'.
 * @param ms - The number of milliseconds to convert.
 * @returns {string} - The time in the format 'MM:SS'.
 */
export const convertMsToTime = (ms) => {

  if (ms < 0){
    return '00:00';
  }

  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor(ms / (1000 * 60));
 
  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${minutes}:${seconds}`;
};

/**
 * Maps an English course category to its Portuguese equivalent.
 * @param category - The category of the course in English.
 * @returns {string} - The translated category label in Portuguese.
 */
export function determineCategory(category) {
  switch (category) {
  case 'personal finance':
    return 'Finanças pessoais';
  case 'health and workplace safety':
    return 'Saúde e segurança no trabalho';
  case 'sewing':
    return 'Costura';
  case 'electronics':
    return 'Eletrônica';
  default: 'other';
    return 'Outro';
  }
}

/**
 * Determines the appropriate icon name for a given course category.
 * @param {string} category - The category of the course.
 * @returns {string} The icon name corresponding to the given category.
 */
export function determineIcon(category) {
  switch (category) {
  case 'personal finance':
    return 'finance';
  case 'health and workplace safety':
    return 'medical-bag';
  case 'sewing':
    return 'scissors-cutting';
  case 'electronics':
    return 'laptop';
  default:
    return 'bookshelf';
  }
}

/**
 * Formats a date string into a standardized date format.
 * @param {string} courseDate - The date the course was last updated in ISO format.
 * @returns {string} The formatted date in 'YYYY/MM/DD' format.
 */
export function getUpdatedDate(courseDate){

  const date = new Date(courseDate);

  // Get the year, month, day, hours, and minutes from the Date object
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = date.getDate().toString().padStart(2, '0');

  // Format the date and time in the desired format
  return `${year}/${month}/${day}`;
}

/**
* Determines if the two arrays of courses are different and require an update.
* @param {Array} courses1 - The first array of courses, typically representing the current state.
* @param {Array} courses2 - The second array of courses, typically representing the new fetched data.
* @returns {boolean} - Returns true if the two arrays are different and an update is required, otherwise false.
*/
export function shouldUpdate(courses1, courses2) {
  // If both arrays are empty, they are equal, but should still update
  if (courses1.length === 0 && courses2.length === 0) {
    return true;
  }

  // If the lengths are different, they are not equal
  if (courses1.length !== courses2.length) {
    return true;
  }

  // If the IDs are different, they are not equal
  for (let i = 0; i < courses1.length; i++) {
    if (courses1[i].id !== courses2[i].id) {
      return true;
    }
  }
  return false;
}

/**
 * Returns a string with the number and the correct form of "Hora/Horas" in Portuguese.
 * @param {number} number - The number of hours.
 * @returns {string} A string combining the number and either "Hora" (singular) or "Horas" (plural). Returns "- Hora" for non-numeric or negative inputs.
 */
export function formatHours(number) {
  // Checking if it is not a number and if it is negative
  if (typeof number !== 'number' || isNaN(number) || number <= 0) {
    return '- Hora';
  }

  if (number <= 1) {
    return `${number} Hora`;
  } else {
    return `${number} Horas`;
  }
}

export async function givePoints(user, exercise_id, isComplete, points, token) {
  try {
    let obj;
    let exerciseExists = isExerciseCompleted(user, exercise_id);

    let exerciseIsComplete = exerciseIsCompleteStatus(user, exercise_id);
    
    // If the exercise is present but it's field "isComplete" is false, it means the user has answered wrong before and only gets 5 points.
    if (exerciseExists && !exerciseIsComplete) {
      points = 5;
    }

    // Updates the user with the new points, and adds the exercise to the completedExercises array
    obj = await completeExercise(user.id, exercise_id, isComplete, points, token);

    // Updates the Async Storage with the new user info
    await AsyncStorage.setItem(USER_INFO, JSON.stringify(obj));

    return points;

  } catch(error) {
    console.log(error);
  }
}

function isExerciseCompleted(user, exerciseIdToCheck) {
  try {
    // Check if completedCourses, completedSections and completedExercises exist
    if (!user.completedCourses || !user.completedCourses.length) return false;
    if (!user.completedCourses[0].completedSections || !user.completedCourses[0].completedSections.length) return false;
    if (!user.completedCourses[0].completedSections[0].completedExercises || !user.completedCourses[0].completedSections[0].completedExercises.length) return false;
    
    // Check if exerciseIdToCheck exists in completedExercises array
    return user.completedCourses.some(course =>
      course.completedSections.some(section =>
        section.completedExercises.some(exercise =>
          exercise.exerciseId == exerciseIdToCheck
        )
      )
    );
    
  } catch(error) {
    console.log(error);
    throw error;
  }
}

function exerciseIsCompleteStatus(user, exerciseIdToCheck) {
  try {
    // Check if completedCourses, completedSections and completedExercises exist
    if (!user.completedCourses || !user.completedCourses.length) return false;
    if (!user.completedCourses[0].completedSections || !user.completedCourses[0].completedSections.length) return false;
    if (!user.completedCourses[0].completedSections[0].completedExercises || !user.completedCourses[0].completedSections[0].completedExercises.length) return false;

    return user.completedCourses.forEach(course => {
      course.completedSections.forEach(section => {
        section.completedExercises.forEach(exercise => {
          if (exercise.exerciseId == exerciseIdToCheck) {
            // Found the matching exerciseId, set exerciseIsComplete to the associated isComplete value
            exercise.isComplete;
          }
        });
      });
    });
  } catch(error) {
    console.log(error);
    throw error;
  }
}