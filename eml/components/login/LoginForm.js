import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormTextField from "./FormTextField";
import FormButton from "./FormButton";
import PasswordEye from "./PasswordEye";
import ResetPassword from "./ResetPassword";
import { isFontsLoaded } from "../../constants/Fonts.js";

const LOGIN_TOKEN = "@loginToken";
const USER_INFO = "@userInfo";

//When Logout: back button should be disabled!!!!

/**
 * Login form component for login screen containing email and password input fields and a login button.
 * @param {Object} props not used in this component as of now
 * @returns {React.Element} Component for logging in (login screen)
 */
export default function LoginForm(props) {

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Logs user in with the entered credentials 
   * @param {String} email Email user tries to login with
   * @param {String} password Password user tries to login with
   */
  async function login(email, password) {
    
    //clearing password field
    setPassword("");

    // Checking if font is loaded
    if (!isFontsLoaded()) {
      return null;
    }

    //The Object must be hashed before it is sent to backend (before loginUser() is called)
    //The Input must be conditioned (at least one capital letter, minimum 8 letters and a number etc.)
    const obj = {
      email: email,
      password: password,
    };

    try {
      await loginUser(obj)
        .then((response) => {
          AsyncStorage.setItem(LOGIN_TOKEN, response.data.accessToken);
          console.log(response);
          navigation.navigate("HomeStack");
        })
        .catch((error) => {
          switch (error.message) {
            case "Request failed with status code 404":
              //Wrong email
              showAlert("Insira um email válido.");
              break;

            case "Request failed with status code 400":
              //Wrong Password
              showAlert("Senha incorreta!");
              break;

            default:
              console.log(error);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }
  // Function to close modal
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
          placeholder="user@email.com"
          onChangeText={(email) => setEmail(email)}
          label="Email"
          required={true}
          keyboardType="email-address"
        />
      </View>

      <View className="relative mb-6">
        <FormTextField
          placeholder="Entre sua senha" // Enter your password
          onChangeText={(password) => setPassword(password)}
          label="Senha" // Password
          required={true}
          secureTextEntry={!showPassword}
        />
        <PasswordEye
          showPasswordIcon={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
      </View>
      <View>
        {/* TODO: tilføj onPress til nedenstående; reset password */}
        <Text
          className="text-right underline font-montserrat text-base text-black mb-24"
          onPress={() => setModalVisible(true)}
        >
          Esqueceu a senha?
        </Text>
      </View>
      {/* Enter */}
      <FormButton label="Entrar" />
      <View className="pt-10">
        {modalVisible ? (
          <ResetPassword
            modalVisible={modalVisible}
            onModalClose={closeModal}
            // Reset password
            title="Redefinção de senha"
          />
        ) : null}
      </View>
    </View>
  );
}
