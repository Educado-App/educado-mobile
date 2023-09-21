import React, { useState } from "react";
import { View, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormTextField from "./FormTextField";
import FormButton from "./FormButton";
import PasswordEye from "./PasswordEye";
import { isFontsLoaded } from "../../constants/Fonts.js";

const LOGIN_TOKEN = "@loginToken";
const USER_INFO = "@userInfo";

//When Logout: back button should be disabled!!!!

export default function LoginForm(props) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(email, password) {
    //clearing input
    setEmail("");
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

  const showAlert = (error) =>
    Alert.alert(
      error,
      //Try again
      "Tente novamente",
      [
        {
          //OK
          text: "Certo",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );

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
          placeholder="********"
          onChangeText={(password) => setPassword(password)}
          label="Senha"
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
        <Text className="mx-10 text-right underline font-montserrat text-base text-black mb-24">
          Esqueceu a senha?
        </Text>
      </View>

      <FormButton label="Entrar" />
    </View>
  );
}
