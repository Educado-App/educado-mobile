import React, { useEffect, useState } from "react";
import { View, Text, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../../components/login/LoginForm";
import { isFontsLoaded } from "../../constants/Fonts.js";

const STORAGE_ID = "@local_id";
const STORAGE_PROGRESS = "@storage_progress";
const LOGIN_TOKEN = "@loginToken";

/**
 * Login screen component containing a login form and possibilities of resetting password or registering a new user.
 * @param {Object} props not used in this component as of now
 */
export default function Login(props) {
  const navigation = useNavigation();
  const [localId, setLocalId] = useState(String(Date.now)); // Local state variable for storing local user id
  // eslint-disable-next-line no-unused-vars
  const [loginToken, setLoginToken] = useState("");

  /**
   * Function for reading local user id from async local storage
   */
  // eslint-disable-next-line no-unused-vars
  const readId = async () => {
    try {
      const fetchedLocalId = await AsyncStorage.getItem(STORAGE_ID);
      // Check if local user id is set
      if (fetchedLocalId !== null) {
        // If not, then generate and save
        setLocalId(fetchedLocalId);
        console.log("Already set, now logged in!");
        const obj = {
          activeCourses: [],
          finishedCourses: [],
          upNext: [],
        };

        await AsyncStorage.setItem(STORAGE_PROGRESS, JSON.stringify(obj));
      } else {
        // If yes, then continue
        try {
            const fetchedToken = await AsyncStorage.getItem(LOGIN_TOKEN);

            if (fetchedToken !== null) {
                setLoginToken(fetchedToken);
                console.log('Already logged in!');
                console.log('Token: ' + fetchedToken);
                navigation.navigate('HomeStack');
            }

          await AsyncStorage.setItem(STORAGE_PROGRESS, JSON.stringify(obj));

          console.log("User successfully created and stored!");
          navigation.navigate("Home");
        } catch (error) {
          console.log("Error when storing user...");
        }
      }
    } catch (error) {
      console.log("Failed to fetch the data from storage");
    }
  };

  /**
   * Function for checking if a login token is stored in async local storage (i.e. if the user is already logged in)
   */
  const checkLoginToken = async () => {
    try {
      const fetchedToken = await AsyncStorage.getItem(LOGIN_TOKEN);

      if (fetchedToken !== null) {
        setLoginToken(fetchedToken);
        console.log("Already logged in!");
        console.log("Token: " + fetchedToken);
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

  if (!isFontsLoaded()) {
    return null;
  }

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
              <Text className="font-montserrat text-base text-gray mr-1">
                Ainda não tem conta? {/*  */}
              </Text>
              <Text
                className="font-montserrat text-base text-black underline"
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

