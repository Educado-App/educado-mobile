import React, { useState } from "react";
import { Alert, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUser, registerUser } from "../../api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormTextField from "./FormTextField";
import FormButton from "./FormButton";
import PasswordEye from "./PasswordEye";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const USER_INFO = "@userInfo";
const LOGIN_TOKEN = "@loginToken";

export default function LoginForm(props) {
  const navigation = useNavigation();

  const [realName, setRealName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const checkPasswordContainsLetter = (password) => {
    const regex = /^(?=.*[a-zA-Z]).*$/;
    const containsLetter = regex.test(password);
    setPasswordContainsLetter(containsLetter);
  };

  const checkPasswordLength = (password) => {
    const lengthValid = password.length > 7;
    setPasswordLengthValid(lengthValid);
  };

  async function register(email, password) {
    // clearing input
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    const obj = {
      phone: email,
      password: password,
    };

    try {
      await registerUser(obj)
        .then(async function (response) {
          console.log(response);

          try {
            await loginUser(obj)
              .then(function (response) {
                AsyncStorage.setItem(LOGIN_TOKEN, response.data.accessToken);
                console.log(response);
                navigation.navigate("HomeStack");
              })
              .catch((error) => {
                switch (error.message) {
                  case "Request failed with status code 404":
                    // Wrong Phone Number
                    console.log("Número de telefone errado!");
                    break;

                  case "Request failed with status code 400":
                    //Wrong Password
                    console.log("Senha incorreta!");
                    break;

                  default:
                    console.log(error);
                }
              });
          } catch (e) {
            console.log(e);
          }

          await createProfile(response._id, realName, email);
        })
        .catch((error) => {
          console.log(error);
          switch (error.message) {
            case "Request failed with status code 500":
              // Phone Number already exists
              showAlert("Número de telefone já existe!");
              break;

            default:
              console.log(error);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

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

  const passwordObj = {
    passwordStrength: password,
  };

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
          onChangeText={(realName) => setRealName(realName)}
        />
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
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View className="mb-6">
        <View className="relative">
          <FormTextField
            label="Senha"
            name={"password"}
            value={password}
            //Password
            placeholder="********"
            placeholderTextColor="grey"
            secureTextEntry={!showPassword}
            required={true}
            onChangeText={(password) => {
              setPassword(password);
              checkPasswordContainsLetter(password);
              checkPasswordLength(password);
            }}
          />
          <PasswordEye
            showPasswordIcon={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
        </View>

        <View className="flex-row justify-start ml-10">
          <Text className="ml-3 text-xs text-gray my-1 font-montserrat">
            • Mínimo 8 caracteres
          </Text>
          <View className="flex-row items-center">
            {passwordLengthValid ? (
              <MaterialCommunityIcons name="check" size={20} color="#4AA04A" />
            ) : null}
          </View>
        </View>
        <View className="flex-row justify-start ml-10">
          <Text className="ml-3 text-xs text-gray font-montserrat">
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
            label="Confirmar Senha"
            name={"Confirm password"}
            value={confirmPassword}
            //Confirm password
            placeholder="********"
            secureTextEntry={!showConfirmPassword}
            required={true}
            onChangeText={(confirmPassword) => {
              setConfirmPassword(confirmPassword);
            }}
          />
          <PasswordEye
            showPasswordIcon={showConfirmPassword}
            toggleShowPassword={toggleShowConfirmPassword}
          />
        </View>
      </View>
      <View className="my-10">
        <FormButton
          onPress={() => register(email, password)}
          label="Cadastrar"
        />
      </View>
    </View>
  );
}
