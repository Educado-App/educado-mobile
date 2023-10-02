import React, { useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormTextField from "./FormTextField";
import FormButton from "./FormButton";
import PasswordEye from "./PasswordEye";
import ResetPassword from "./ResetPassword";
import { isFontsLoaded } from "../../constants/Fonts.js";
import FormFieldAlert from "./FormFieldAlert";
import { RemoveEmojis } from "../general/Validation";

const LOGIN_TOKEN = "@loginToken";
const USER_INFO = "@userInfo";

//When Logout: back button should be disabled!!!!

/**
 * Login form component for login screen containing email and password input fields and a login button.
 * @returns {React.Element} Component for logging in (login screen)
 */
export default function LoginForm() {

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState("");
  const [emailAlert, setEmailAlert] = useState("");

  /**
   * Logs user in with the entered credentials 
   * @param {String} email Email user tries to login with
   * @param {String} password Password user tries to login with
   */
  async function login(email, password) {

    //Reset alerts
    setEmailAlert("");
    setPasswordAlert("");

    //The Object must be hashed before it is sent to backend (before loginUser() is called)
    //The Input must be conditioned (at least one capital letter, minimum 8 letters and a number etc.)
    const obj = {
      email: email,
      password: password,
    };

    loginUser(obj) // Await the response from the backend API for login
      .then((response) => {
        // Set login token in AsyncStorage and navigate to home screen
        AsyncStorage.setItem(LOGIN_TOKEN, response.accessToken);
        navigation.navigate("HomeStack");
      })
      .catch((error) => {
        switch (error.response.status) {
          case 404:
            // No user exists with this email!
            setEmailAlert("Não existe nenhum usuário com este email!");
            break;

          case 401:
            setPasswordAlert("Senha incorreta!"); // Password is incorrect!
            break;

          default: // Errors not currently handled with specific alerts
            console.log(error);
        }
      });

  }

  // Function to close the reset password modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      <View className="mb-6">
        <FormTextField
          testId="emailInput"
          placeholder="user@email.com"
          onChangeText={(email) => setEmail(email)}
          label="Email"
          required={true}
          keyboardType="email-address"
        />
        <FormFieldAlert testId="emailAlert" label={emailAlert} />
      </View>


      <View className="relative mb-6">
        <FormTextField
          testId="passwordInput"
          placeholder="Digite sua senha" // Type your password
          value={password}
          onChangeText={(inputPassword) => {
            setPassword(RemoveEmojis(inputPassword, password))
          }}
          label="Senha" // Password
          required={true}
          secureTextEntry={!showPassword}
        />
        <PasswordEye
          testId="passwordEye"
          showPasswordIcon={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
        <FormFieldAlert testId="passwordAlert" label={passwordAlert} />
      </View>

      <View>
        {/* TODO: tilføj onPress til nedenstående; reset password */}
        <Text
          className="text-right underline font-montserrat text-base text-black mb-15 ml-[205px]"
          onPress={() => setModalVisible(true)}
        >
          Esqueceu a senha?
        </Text>
      </View>
      {/* Enter */}
      <FormButton
        testId="loginButton"
        label="Entrar"
        onPress={() => login(email, password)}
        disabled={!(password.length > 0 && email.length > 0)}
      />
      <View className="pt-10">
        <ResetPassword
          className={(!modalVisible ? "hidden" : "")}
          modalVisible={modalVisible}
          onModalClose={closeModal}
          testId="resetPasswordModal"
          // Reset password
          title="Redefinção de senha"
        />
      </View>
    </View>
  );
}
