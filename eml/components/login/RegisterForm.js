import React, { useEffect, useState } from "react";
import { Alert, View, Text } from "react-native";
import { registerUser } from "../../api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormTextField from "./FormTextField";
import FormButton from "./FormButton";
import PasswordEye from "./PasswordEye";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const USER_INFO = "@userInfo";

/**
 * Component for logging into application, used on login screen and in registerform
 * @param {Object} props not used in this component as of now
 */
export default function LoginForm(props) {

  const [realName, setRealName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isRealNameValid, setIsRealNameValid] = useState(true);
  const [isAllInputValid, setIsAllInputValid] = useState(true);
  const [passwordMatches, setPasswordMatches] = useState(true);

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
    setIsRealNameValid(false);
    setIsEmailValid(false);
    setIsAllInputValid(false);
    setPasswordMatches(true);
    setRealName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, []);

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
   * @param {String} realName 
   * @param {String} email 
   * @param {String} password
   */
  async function register(realName, email, password) {

    validateInput(realName, email, password);

    const obj = {
      name: realName,
      email: email,
      password: password,
    };

    try {
      await registerUser(obj)
        .then(async function (response) {
          await createProfile(response._id, realName, email);
        })
        .catch((error) => {
          switch (error.message) {
            case "Request failed with status code 400":
              //Invalid user data
              showAlert("Dados de usuário inválidos!");
              break;
            default:
              console.log(error);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  function validateInput() {
    console.log("isRealNameValid: " + isRealNameValid +
      "\nisEmailValid: " + isEmailValid +
      "\npasswordLengthValid: " + passwordLengthValid +
      "\npasswordContainsLetter: " + passwordContainsLetter +
      "\npasswordMatches: " + passwordMatches);
    if (isRealNameValid && isEmailValid && passwordLengthValid
      && passwordContainsLetter && passwordMatches) {
      setIsAllInputValid(true);
    } else {
      setIsAllInputValid(false);
    }
  }

  /**
   * Stores the user info in async storage
   * @param {*} id user id
   * @param {*} realName 
   * @param {*} email 
   */
  async function createProfile(id, realName, email) {
    try {
      const obj = {
        id: id,
        realName: realName,
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
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  /**
   * Validates the real name according to the real name pattern and 
   * sets the state variable accordingly
   * @param {String} realName 
   */
  const validateRealName = (realName) => {
    const realNamePattern = /^(\p{L}+[- '])*\p{L}+$/u;

    if (realNamePattern.test(realName)) {
      setIsRealNameValid(true);
    } else {
      setIsRealNameValid(false);
    }
  }

  const validatePasswordInput = (setPasswordFunction, passwordInput, confirm) => {
    const passwordPattern = /^[\p{L}0-9]*$/u;

    if (passwordPattern.test(passwordInput)) {
      setPasswordFunction(passwordInput);
      return passwordInput;
    }
    return confirm ? confirmPassword : password;
  }

  const checkIfPasswordsMatch = (password, confirmPassword) => {
    if (password === confirmPassword) {
      setPasswordMatches(true);
    } else {
      setPasswordMatches(false);
    }
  }

  const showAlert = (error) =>
    Alert.alert(
      error,
      "Tente novamente", // Try again
      [{
        text: "Certo", // OK
        style: "cancel",
      }],
      {
        cancelable: true,
      }
    );

  return (
    <View>
      <View className="mb-6">
        <FormTextField
          label="Nome"
          name={"Name"}
          value={realName}
          //Real name
          placeholder="Nome Sobrenome"
          required={true}
          onChangeText={(realName) => {
            setRealName(realName); validateRealName(realName); validateInput();
          }}
        />
        {!isRealNameValid && <Text className='text-xs text-error mx-2 my-1 font-montserrat'>Nome inválido {/* Name invalid */}</Text>}
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
          onChangeText={(email) => { setEmail(email); validateEmail(email); validateInput(realName, email, password); }}
        />
        {!isEmailValid && <Text className='text-xs text-error mx-2 my-1 font-montserrat'>Email inválido {/* Email invalid */}</Text>}

      </View>
      <View className="mb-6">
        <View className="relative">
          <FormTextField
            label="Senha"
            name={"password"}
            value={password}
            //Password
            placeholder="Entre sua senha" // Enter your password
            placeholderTextColor="grey"
            secureTextEntry={!showPassword}
            required={true}
            onChangeText={(password) => {
              password = validatePasswordInput(setPassword, password, false);
              checkPasswordContainsLetter(password);
              checkPasswordLength(password);
              checkIfPasswordsMatch(password, confirmPassword);
              validateInput();
            }}
          />
          <PasswordEye
            showPasswordIcon={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
        </View>

        <View className="flex-row justify-start">
          <Text className="text-xs text-gray my-1 font-montserrat">
            {/* Minimum 8 characters */}
            • Mínimo 8 caracteres
          </Text>
          <View className="flex-row items-center">
            {passwordLengthValid ? (
              <MaterialCommunityIcons name="check" size={20} color="#4AA04A" />
            ) : null}
          </View>
        </View>
        <View className="flex-row justify-start">
          <Text className="text-xs text-gray font-montserrat">
            {/* Must contain at least one letter */}
            • Conter pelo menos uma letra
          </Text>
          <View className="flex-row items-center">
            {passwordContainsLetter ? (
              <MaterialCommunityIcons name="check" size={20} color="#4AA04A" />
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
            onChangeText={(confirmPassword) => {
              confirmPassword = validatePasswordInput(setConfirmPassword, confirmPassword, true);
              checkIfPasswordsMatch(password, confirmPassword);
              validateInput();
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
        <View className="flex-row justify-start">
          <View className="flex-row items-center">
            {!passwordMatches ? (
              <Text className="text-xs text-error mx-2 my-1 font-montserrat">
                {/* Passwords must match */}
                As senhas devem corresponder
              </Text>
            ) : null}
          </View>
        </View>
      </View>
      <View className="my-10">
        <FormButton
          onPress={() => register(realName, email, password)}
          label="Cadastrar" // Register
          disabled={!isAllInputValid}
        />
      </View>
    </View>
  );
}
