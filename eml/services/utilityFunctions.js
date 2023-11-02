/** Utility functions used in Explore and Course screens **/

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