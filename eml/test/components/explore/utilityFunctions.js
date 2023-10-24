export const getDifficultyLabel = (lvl) => {
  switch (lvl) {
    case 1:
      return "Iniciante";
    case 2:
      return "Intermediário";
    case 3:
      return "Avançado";
    default:
      return lvl; // default to the provided level if not 1, 2, or 3
  }
};

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
export function determineIcon(category) {
  switch (category) {
    case "personal finance":
      return "finance"
    case "health and workplace safety":
      return "medical-bag"
    case "sewing":
      return "scissors-cutting"
    case "electronics":
      return "laptop"
    default:
      return "bookshelf"
  }
}


export const getUpdatedDate = (courseDate) => {

  const date = new Date(courseDate);

  // Get the year, month, day, hours, and minutes from the Date object
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = date.getDate().toString().padStart(2, '0');

  // Format the date and time in the desired format
  return `${year}/${month}/${day}`;
};