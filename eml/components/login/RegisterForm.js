import React, { useEffect, useState } from "react";
import { Alert, View, Text } from "react-native";
import { registerUser } from "../../api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormTextField from "./FormTextField";
import FormButton from "./FormButton";
import PasswordEye from "./PasswordEye";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ShowAlert from "../general/ShowAlert";
import FormFieldAlert from "./FormFieldAlert";
import { RemoveEmojis, validatePasswordContainsLetter, validatePasswordLength, validateEmail, validateName } from "../general/Validation";

const USER_INFO = "@userInfo";

/** errors/things we need to do  on this page: 
 * 
 * ! ! Make file for Regex to increase consistency !!!!!
 * 
 * REAL NAME
 * Errors: 
 * Name too long ✅
 * Name too short ✅
 * Atleast 1 name per field ✅
 * Symbol not allowed (insert symbol) ✅
 * Other tasks:
 * Split name into 2 fields ✅
 * Make file for regex (Lavet i frontend)
 *
 * PASSWORD
 * Too short ✅
 * Doesn't contain letter ✅
 * Contains illegal character(s) ✅
 * Passwords don't match ✅
 * 
 * EMAIL
 * Doesn't match  ✅
 * Contains illegal character(s)
*/ 

/**
 * Component for registering a new account in the system, used in the register screen
 * @returns {React.Element} Component containing the form for registering a new user
 */
export default function LoginForm(props) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [emailAlert, setEmailAlert] = useState("");
  const [nameAlert, setNameAlert] = useState("");
  const [isAllInputValid, setIsAllInputValid] = useState(false);
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useState("");

  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password Constraint variables
  const [passwordContainsLetter, setPasswordContainsLetter] = useState(false);
  const [passwordLengthValid, setPasswordLengthValid] = useState(false);

  useEffect(() => {
    // Clear input and alerts on first render
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setNameAlert("");
    setEmailAlert("");
    setIsAllInputValid(false);
    setConfirmPasswordAlert("");
  }, []);

  useEffect(() => {
    const containsLetter = validatePasswordContainsLetter(password);
    setPasswordContainsLetter(containsLetter);
    const lengthValid = validatePasswordLength(password);
    setPasswordLengthValid(lengthValid);
    checkIfPasswordsMatch(password, confirmPassword);
  }, [password]);

  useEffect(() => {
    checkIfPasswordsMatch(password, confirmPassword);
  }, [confirmPassword]);

  useEffect(() => {
    let validationError = '';
    if(firstName !== '') {
      validationError = validateName(firstName, 'Primeiro nome'); // First name
    }
    if(validationError === '' && lastName !== '') {
      validationError = validateName(lastName, 'Sobrenome'); // Last name
    }

    setNameAlert(validationError);
  }, [firstName, lastName]);

  useEffect(() => {
    if(email === '') {
      setEmailAlert('');
      return;
    }

    const validationError = validateEmail(email);
    setEmailAlert(validationError);
  }, [email]);

  useEffect(() => {
    validateInput();
  }, [nameAlert, emailAlert, passwordLengthValid, passwordContainsLetter, confirmPasswordAlert]);

  // Functions to toggle password visibility states
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const checkIfPasswordsMatch = (password, confirmPassword) => {
    if (password === confirmPassword) {
      setConfirmPasswordAlert("");
    } else {
      // The passwords do not match
      setConfirmPasswordAlert("As senhas devem corresponder");
    }
  }

  // TODO: This function should take into consideration
  // that alerts might be empty when input is yet to be given
  /**
   * Function for validating all input fields' content
   */
  function validateInput() {
    const validationPassed = (
      nameAlert === "" &&
      emailAlert === "" &&
      firstName != "" &&
      lastName != "" &&
      email != "" &&
      passwordLengthValid &&
      passwordContainsLetter &&
      confirmPasswordAlert === ""
    );
    
    setIsAllInputValid(validationPassed);
  }

  /**
   * Function for registering a new user in the database
   * @param {String} firstName 
   * @param {String} lastName
   * @param {String} email 
   * @param {String} password
   */
  async function register(firstName, lastName, email, password) {
    
    validateInput(firstName, email, password);
    
    if(!isAllInputValid) {
      return;
    }

    const obj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      await registerUser(obj)
        .then(async function (response) {
          await saveUserInfoLocally(response._id, firstName, lastName, email);
        })
        .catch((error) => {
          switch (error?.error?.code) {
            case 'E0201':
              // User with this email already exists
              ShowAlert('Usuário com este e-mail já existe');
              break;
            
            case 'E0212':
              // Password is required
              ShowAlert('Senha é obrigatória');
              break;
            
            case 'E0208':
              // Email is required
              ShowAlert('E-mail é obrigatório');
              break;

            case 'E0207': 
              // Email must be atleast 6 characters
              ShowAlert('E-mail deve ter pelo menos 6 caracteres');
              break;
            
            case 'E0206':
              // Email must contain "@" and "." 
              ShowAlert('E-mail deve conter "@" e "."');
              break;
            
            case 'E0203':
              // Invalid email format
              ShowAlert('Formato de e-mail inválido');
              break;

            case 'E0209':
              // First and last name is required
              ShowAlert('Primeiro e último nome são obrigatórios');
              break;
            
            case 'E0210':
              // Names must be between 1 and 50 characters
              ShowAlert('Nomes devem ter entre 1 e 50 caracteres');
              break;

            case 'E0211':
              // Names must only contain letters, spaces, hyphens and apostrophes
              ShowAlert('Nomes devem conter apenas letras, espaços, hífens e apóstrofos');
              break;

            default:
              console.log(error);
              // Something unknown went wrong
              ShowAlert("Erro desconhecido! (unknown error)");
              break;
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Stores the user info in async storage
   * @param {*} id user id
   * @param {*} firstName 
   * @param {*} lastName
   * @param {*} email 
   */
  async function saveUserInfoLocally(id, firstName, lastName, email) {
    try {
      const obj = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
      };

      await AsyncStorage.setItem(USER_INFO, JSON.stringify(obj));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View>
      <View className="mb-6">
        <FormTextField
          label="Primeiro nome"
          name={"Primeiro nome"}
          value={firstName}
          //First name
          placeholder="Primeiro nome"
          required={true}
          onChangeText={(firstName) => {
            setFirstName(firstName);
          }}
        />
      </View>
      <View className="mb-6">
        <FormTextField
          label="Sobrenome"
          name={"Sobrenome"}
          value={lastName}
          // Last name
          placeholder="Sobrenome"
          required={true}
          onChangeText={(lastName) => {
            setLastName(lastName);
          }}
        />
        <FormFieldAlert label={nameAlert} />
      </View>
      <View className="mb-6">
        <FormTextField
          className="mb-6"
          label="Email"
          name={"Email"}
          value={email}
          //Email
          placeholder="user@email.com"
          keyboardType="email-address"
          required={true}
          onChangeText={(email) => { setEmail(email); }}
        />
        <FormFieldAlert label={emailAlert} />
      </View>
      <View className="mb-6">
        <View className="relative">
          <FormTextField
            label="Senha" //Password
            name={"password"}
            value={password}
            placeholder="Entre sua senha" // Enter your password
            placeholderTextColor="grey"
            secureTextEntry={!showPassword}
            required={true}
            onChangeText={(inputPassword) => {
              setPassword(RemoveEmojis(inputPassword, password));
            }}
          />
          <PasswordEye
            testId = "passwordEye"
            showPasswordIcon={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
        </View>

        <View className="flex-row justify-start mt-1 h-6">
          <Text className={"text-xs font-montserrat" + ((passwordLengthValid || !password) ? " text-gray" : " text-error")}>
            {/* Minimum 8 characters */}
            • Mínimo 8 caracteres
          </Text>
          <View className="flex-row items-center -translate-y-1">
            {passwordLengthValid ? (
              <MaterialCommunityIcons name="check" size={20} color="#4AA04A" />
            ) : null}
          </View>
        </View>
        <View className="flex-row justify-start h-6">
          <Text className={"text-xs font-montserrat" + ((passwordContainsLetter || !password) ? " text-gray" : " text-error")}>
            {/* Must contain at least one letter */}
            • Conter pelo menos uma letra
          </Text>
          <View className="flex-row items-center -translate-y-1">
            {passwordContainsLetter ? (
              <MaterialCommunityIcons name="check" size={20} color="#4AA04A"/>
            ) : null}
          </View>
        </View>
      </View>
      {/* TODO: compare password with confirm password and give error if not same.*/}
      <View className="mb-6">
        <View className="relative">
          <FormTextField
            label="Confirmar Senha" // Confirm password
            value={confirmPassword}
            onChangeText={(inputConfirmPassword) => {
              setConfirmPassword(RemoveEmojis(inputConfirmPassword, confirmPassword));
            }}
            placeholder="Confirme sua senha" // Confirm your password
            secureTextEntry={!showConfirmPassword}
            required={true}
          />
          <PasswordEye
            showPasswordIcon={showConfirmPassword}
            toggleShowPassword={toggleShowConfirmPassword}
          />
        </View>
        <FormFieldAlert label={confirmPasswordAlert} />
      </View>
      <View className="my-10">
        <FormButton
          onPress={() => register(firstName, lastName, email, password)}
          label="Cadastrar" // Register
          disabled={!isAllInputValid}
        />
      </View>
    </View>
  );
}
