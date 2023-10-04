import React, { useEffect, useState } from "react";
import { View, Text, Keyboard, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../../components/login/LoginForm";
import LogoBackButton from "../../components/login/LogoBackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native";
import getFont from "../../components/general/GetFont";
import { useFonts } from "expo-font";

const LOGIN_TOKEN = "@loginToken";

/**
 * Login screen component containing a login form and possibilities of resetting password or registering a new user.
 * @param {Object} props not used in this component as of now
 */
export default function Login(props) {

  const navigation = useNavigation();
  const [loaded] = useFonts({
    fontFileName: require("../../assets/fonts/Montserrat-Regular.ttf")
  });

  /**
   * Function for checking if a login token is stored in async local storage (i.e. if the user is already logged in)
   */
  const checkLoginToken = async () => {
    try {
      const fetchedToken = await AsyncStorage.getItem(LOGIN_TOKEN);
      if (fetchedToken !== null) {
        navigation.navigate("HomeStack");
      }
    } catch (error) {
      console.log("Failed to fetch the login token from storage");
    }
  };

  useEffect(() => {
    // readId();
    checkLoginToken();
  }, []);
  
  return (
    <SafeAreaView className="justify-start bg-secondary flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View className="mt-10">
            <LogoBackButton navigationPlace="Login" />
          </View>
          <View className="mx-6">
            {/* Login form */}
            <View className="my-8">
              <LoginForm />
            </View>
            {/* Register button */}
            <View className="flex-row justify-center">
              <Text className={"text-base text-gray mr-1" + getFont()}>
                Ainda não tem conta? {/*  */}
              </Text>
              <Text
                testId="registerNav"
                className={"text-base text-black underline" + getFont()}
                onPress={() => navigation.navigate("Register")}
              >
                Cadastre-se agora
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

