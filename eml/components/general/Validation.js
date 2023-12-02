import patterns from '../../assets/validation/patterns';

/**
   * Function for validating the password input. It checks if the password contains any emojis and if so it does not change the password state variable.
   * @param {string} passwordInput input in password field
   * @param {string} currentPasword current password state variable
   * @returns either the password state variable or the confirm password state variable depending on the confirm parameter
   */

const removeEmojis = (passwordInput) => {
	return passwordInput.replace(patterns.emoji, '');
};

/**
  * Checks if the password contains at least one letter
  * @param {String} password
  * @returns {Boolean} true if password contains at least one letter, false otherwise
  */
const validatePasswordContainsLetter = (password) => {
	const regex = /.*\p{L}.*$/u;
	return regex.test(password);
};

/**
  * Checks if the password lives up to the length requirements
  * @param {String} password
  * @returns {Boolean} true if password is longer than 7 characters, false otherwise
  */
const validatePasswordLength = (password) => {
	return password.length > 7;
};

/**
 * Validates the email according to the email pattern and 
 * sets the state variable accordingly
 * @param {String} email 
 * @returns {String} error message if email is invalid, empty string otherwise
 */
const validateEmail = (email) => {
	const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

	if (!emailPattern.test(email)) {
		return 'E-mail inválido'; // Email invalid
	}

	// Passed all checks, email is valid
	return '';
};

/**
 * Validates the real name according to the real name pattern.
 * (Used for both first and last name)
 * @param {String} name 
 * @param {String} wordForName (e.g. 'Nome' or 'Sobrenome')
 * @returns {String} error message if name is invalid, empty string otherwise
 */
const validateName = (name, wordForName = 'Nome') => {
	const namePattern = /^(\p{L}+[- '])*\p{L}+$/u;

	if (name.length > 50) { // Check this number
		return `${wordForName} muito longo`; // Name too long
	}
	if (name.length < 1) {
		return `${wordForName} obrigatório`; // Name required
	}
	if (!namePattern.test(name)) {
		return `${wordForName} inválido`; // Invalid name
	}

	return '';
};

module.exports = Object.freeze({
	removeEmojis,
	validatePasswordContainsLetter,
	validatePasswordLength,
	validateEmail,
	validateName
});

