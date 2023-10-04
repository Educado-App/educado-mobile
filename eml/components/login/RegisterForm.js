import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { registerUser } from "../../api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormTextField from "./FormTextField";
import FormButton from "./FormButton";
import PasswordEye from "./PasswordEye";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ShowAlert from "../general/ShowAlert";
import FormFieldAlert from "./FormFieldAlert";
import { RemoveEmojis } from "../general/Validation";
import Text from "../general/Text";

const USER_INFO = "@userInfo";

/**
 * Component for registering a new account in the system, used in the register screen
 * @returns {React.Element} Component containing the form for registering a new user
 */
export default function RegisterForm() {
  const [realName, setRealName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [nameAlert, setNameAlert] = useState("");
  const [isAllInputValid, setIsAllInputValid] = useState(true);
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useState("");

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
    setRealName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, []);

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
   * @param {String} realName 
   * @param {String} email 
   * @param {String} password
   */
  async function register(realName, email, password) {
    validateInput(realName, email, password)
    if(!isAllInputValid) {
      return;
    }

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
          switch (error.response.data.message) {
            case "users validation failed: email: User email already exists!":
              ShowAlert("User email already exists!"); // TODO: Translate
              break;
            case "Request failed with status code 400":
              //Invalid user data
              ShowAlert("Dados de usuário inválidos!");
              break;
            default:
              console.log(error.response.data.message);
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
      setEmailAlert("");
    } else {
      setEmailAlert("Email inválido"); // Email invalid
    }
  }

  /**
   * Validates the real name according to the real name pattern and 
   * sets the state variable accordingly
   * @param {String} realName 
   */
  const validateRealName = (realName) => {
    const realNamePattern = /^(\p{L}+[- '])*\p{L}+$/u;

    if (realNamePattern.test(realName) && realName.length > 1) {
      setNameAlert("");
    } else {
      setNameAlert("Nome inválido"); // Invalid name
    }
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
          testId="nameInput"
          label="Nome"
          name={"Name"}
          value={realName}
          //Real name
          placeholder="Nome Sobrenome"
          required={true}
          onChangeText={(realName) => {
            setRealName(realName); validateRealName(realName);
          }}
        />
        <FormFieldAlert label={nameAlert} />
      </View>
      <View className="mb-6">
        <FormTextField
          className="mb-6"
          label="Email"
          name={"Email"}
          testId="emailInput"
          value={email}
          placeholder="user@email.com"
          keyboardType="email-address"
          required={true}
          onChangeText={async (email) => { setEmail(email); validateEmail(email); }}
        />
        <FormFieldAlert label={emailAlert} testId="emailAlert" />
      </View>
      <View className="mb-6">
        <View className="relative">
          <FormTextField
            label="Senha" //Password
            name={"password"}
            testId="passwordInput"
            value={password}
            placeholder="Entre sua senha" // Enter your password
            placeholderTextColor="grey"
            secureTextEntry={!showPassword}
            required={true}
            onChangeText={async (inputPassword) => {
              inputPassword = RemoveEmojis(inputPassword, password);
              setPassword(inputPassword);
              checkPasswordContainsLetter(inputPassword);
              checkPasswordLength(inputPassword);
              checkIfPasswordsMatch(inputPassword, confirmPassword);
            }}
          />
          <PasswordEye
            testId = "passwordEye"
            showPasswordIcon={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
        </View>

        <View className="flex-row justify-start mt-1 h-6">
          <Text testId="passwordLengthAlert" className={"text-xs" + ((passwordLengthValid || !password) ? " text-gray" : " text-error")}>
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
          <Text testId="passwordLetterAlert" className={"text-xs font-sans" + ((passwordContainsLetter || !password) ? " text-gray" : " text-error")}>
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
            testId="confirmPasswordInput"
            onChangeText={(inputConfirmPassword) => {
              inputConfirmPassword = RemoveEmojis(inputConfirmPassword, confirmPassword);
              setConfirmPassword(inputConfirmPassword);
              checkIfPasswordsMatch(password, inputConfirmPassword);
            }
            }
            placeholder="Confirme sua senha" // Confirm your password
            secureTextEntry={!showConfirmPassword}
            required={true}
          />
          <PasswordEye
            testId = "confirmPasswordEye"
            showPasswordIcon={showConfirmPassword}
            toggleShowPassword={toggleShowConfirmPassword}
          />
        </View>
        <FormFieldAlert label={confirmPasswordAlert} />
      </View>
      <View className="my-10">
        <FormButton
          onPress={() => register(realName, email, password)}
          label="Cadastrar" // Register
          testId="registerButton"
          disabled={!isAllInputValid}
        />
      </View>
    </View>
  );
}
