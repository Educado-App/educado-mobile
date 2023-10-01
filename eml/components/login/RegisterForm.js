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
import { RemoveEmojis } from "../general/Validation";

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
 * Make file for regex
 * 
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
 * 
 * 
 * 
*/ 

/**
 * Component for registering a new account in the system, used in the register screen
 * @returns {React.Element} Component containing the form for registering a new user
 */
export default function LoginForm(props) {

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [nameAlert, setNameAlert] = useState("");
  const [isAllInputValid, setIsAllInputValid] = useState(true);
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useState("");
  const [lastName, setLastName] = useState("");



  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password Constraint variables
  const [passwordContainsLetter, setPasswordContainsLetter] = useState(false);
  const [passwordLengthValid, setPasswordLengthValid] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // clearing input
    setNameAlert("");
    setEmailAlert("");
    setIsAllInputValid(false);
    setConfirmPasswordAlert("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, []);

  useEffect(() => {
    checkPasswordContainsLetter(password);
    checkPasswordLength(password);
    checkIfPasswordsMatch(password, confirmPassword);
  }, [password]);

  useEffect(() => {
    checkIfPasswordsMatch(password, confirmPassword);
  }, [confirmPassword]);

  useEffect(() => {
    validateInput();
  }, [nameAlert, emailAlert, passwordLengthValid, passwordContainsLetter, confirmPasswordAlert]);

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const checkPasswordContainsLetter = (password) => {
    // TODO: Brazilian letters needs to be included
    const regex = /.*\p{L}.*$/u;
    const containsLetter = regex.test(password);
    setPasswordContainsLetter(containsLetter);
  };

  const checkPasswordLength = (password) => {
    const lengthValid = password.length > 7;
    setPasswordLengthValid(lengthValid);
  };

  /**
   * Function for registering a new user in the database
   * @param {String} firstName 
   * @param {String} email 
   * @param {String} password
   */
  async function register(firstName, email, password) {
    validateInput(firstName, email, password)
    if(!isAllInputValid) {
      return;
    }

    const obj = {
      name: firstName,
      email: email,
      password: password,
    };

    try {
      await registerUser(obj)
        .then(async function (response) {
          await createProfile(response._id, firstName, email);
        })
        .catch((error) => {
          switch (error.message) {
            case "Request failed with status code 400":
              //Invalid user data
              ShowAlert("Dados de usuário inválidos!");
              break;
            default:
              console.log(error);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Function for validating all input fields' content
   */
  function validateInput() {
    if (nameAlert === "" && emailAlert === "" && passwordLengthValid
      && passwordContainsLetter && confirmPasswordAlert === "") {
      setIsAllInputValid(true);
    } else {
      setIsAllInputValid(false);
    }
  }

  /**
   * Stores the user info in async storage
   * @param {*} id user id
   * @param {*} firstName 
   * @param {*} email 
   */
  async function createProfile(id, firstName, email) {
    try {
      const obj = {
        id: id,
        firstName: firstName,
        email: email,
      };

      await AsyncStorage.setItem(USER_INFO, JSON.stringify(obj));
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Validates the email according to the email pattern and 
   * sets the state variable accordingly
   * @param {String} email 
   */
  const validateEmail = (email) => {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailPattern.test(email)) {
      setEmailAlert("");
    } else {
      setEmailAlert("Email inválido"); // Email invalid
    } 
  }

  /**
   * Validates the real name according to the real name pattern 
   * @param {String} name 
   * @param {String} nameType
   * @returns {String} alert message
   */
  const validateName = (name, nameType='Nome') => {
    const namePattern = /^(\p{L}+[- '])*\p{L}+$/u;

    if (name.length > 50) { // Check this number
      return `${nameType} muito longo`; // TODO: Translate "Name too long"
    }
    if(name.length < 1) {
      return `${nameType} muito curto`; // TODO: Translate "Name too short"
    }
    if(!namePattern.test(name)) {
      return `${nameType} inválido`; // Invalid name
    }
    
    return '';
  }

  const validateFirstName = (firstName) => {
    setNameAlert(validateName(firstName, 'Primeiro nome')); // First name
  }

  const validateLastName = (lastName) => {
    setNameAlert(validateName(lastName, 'Sobrenome')); // First name
  }

  const checkIfPasswordsMatch = (password, confirmPassword) => {
    if (password === confirmPassword) {
      setConfirmPasswordAlert("");
    } else {
      setConfirmPasswordAlert("As senhas devem corresponder");
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
            validateFirstName(firstName);
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
            validateLastName(lastName);
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
          onChangeText={(email) => { setEmail(email); validateEmail(email); }}
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
              checkIfPasswordsMatch(password, confirmPassword);
            }
            }
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
          onPress={() => register(firstName, email, password)}
          label="Cadastrar" // Register
          disabled={!isAllInputValid}
        />
      </View>
    </View>
  );
}
