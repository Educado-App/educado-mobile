// Function to dermine category
export function determineCategory(category) {
  switch (category) {
    case "personal finance":
      return "Finanças pessoais";
    case "health and workplace safety":
      return "Saúde e segurança no trabalho";
    case "sewing":
      return "Costura";
    case "electronics":
      return "Eletrônica";
    default: "other";
      return "Outro";
  }
}
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