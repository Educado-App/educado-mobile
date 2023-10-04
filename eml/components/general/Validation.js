import patterns from "../../assets/validation/patterns";

/**
   * Function for validating the password input. It checks if the password contains any emojis and if so it does not change the password state variable.
   * @param {string} passwordInput input in password field
   * @param {string} currentPasword current password state variable
   * @returns either the password state variable or the confirm password state variable depending on the confirm parameter
   */
const RemoveEmojis = (passwordInput, currentPasword) => {
  if (!patterns.emoji.test(passwordInput)) {
    return passwordInput;
  }

  return currentPasword;
}

export { RemoveEmojis }