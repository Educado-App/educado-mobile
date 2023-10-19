import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { Icon } from "@rneui/themed";
import { TailwindProvider } from "tailwindcss-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

// Screens
import CourseScreen from "./screens/courses/CourseScreen";
import ProfileComponent from "./screens/profile/Profile";
import LoginScreen from "./screens/login/Login";
import RegisterScreen from "./screens/register/Register";
import RightAnswerScreen from "./screens/excercise/RightAnswerScreen";
import ExerciseScreen from "./screens/excercise/ExerciseScreen";
import WrongAnswerComponent from "./screens/excercise/WrongAnswerScreen";
import Explore from "./screens/explore/Explore";
import ErrorScreen from "./screens/errors/ErrorScreen";
import SectionCompleteScreen from "./screens/excercise/SectionCompleteScreen";
import SectionScreen from "./screens/section/SectionScreen";
import LectureScreen from "./screens/lectures/LectureScreen";
import Loading from "./components/loading/Loading";
import WelcomeScreen from "./screens/welcome/Welcome";
import ProfileSettingsScreen from "./screens/profile/ProfileSettings";

// Components
import NavBar from "./components/navBar/NavBar";

// Constants
import { isFontsLoaded } from "./constants/Fonts";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * Check if user is logged in, if not redirect to login screen
 */
const checkLogin = () => {
  if (AsyncStorage.getItem("@login_token") === null) {
    useNavigation().navigate("Login");
  }
};

function WelcomeStack() {
  return (
    <Stack.Navigator initialRouteName={"Welcome"}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function LoginStack() {
  return (
    <Stack.Navigator initialRouteName={"Login"}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function CourseStack() {
  checkLogin();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Course"
        component={CourseScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WrongAnswer"
        component={WrongAnswerComponent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RightAnswer"
        component={RightAnswerScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SectionComplete"
        component={SectionCompleteScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  checkLogin();

  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarActiveBackgroundColor: "#d9d9d9",
        tabBarStyle: { backgroundColor: "hsl(0, 0%, 92%)" }, //Oneplus menubar color
      }}
    >
      <Tab.Screen
        //Home
        name="Casa"
        component={CourseStack}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <Icon
                size={30}
                name="home"
                type="material-community"
                color="#8DD08C"
              />
            );
          },
        }}
      />
      <Tab.Screen
        //Perfil
        name="Perfil"
        component={ProfileComponent}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <Icon
                size={30}
                name="account-circle"
                type="material-community"
                color="#8DD08C"
              />
            );
          },
        }}
      />
      <Tab.Screen
        // Explore
        name="Explorar"
        component={Explore}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <Icon
                size={30}
                name="magnify"
                type="material-community"
                color="#8DD08C"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export function useWelcomeScreenLogic(loadingTime, onResult) {
  setTimeout(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem("hasShownWelcome");
        let initialRoute = "WelcomeStack";
        let isLoading = true;

        if (value === "true") {
          initialRoute = "LoginStack";
        } else {
          await AsyncStorage.setItem("hasShownWelcome", "true");
        }

        // Pass the results to the callback
        isLoading = false;
        onResult(initialRoute, isLoading);
      } catch (error) {
        console.error("Error retrieving or setting AsyncStorage data:", error);
      }
    };

    fetchData();
  }, loadingTime);
}

// Change InitialRouteName to HomeStack if you want to skip Login Screen
export default function App() {
  const fontsLoaded = isFontsLoaded();
  const [initialRoute, setInitialRoute] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Callback function to handle the results
  const handleResult = (route, loading) => {
    setInitialRoute(route);
    setIsLoading(loading);
  };

  useWelcomeScreenLogic(3000, handleResult);

  // ************** Don't touch this code **************
  if (!fontsLoaded) {
    return null;
  }

  // Makes sure fonts are loaded before rendering the app
  if (isLoading && fontsLoaded) {
    return <Loading />;
  }
  // ***************************************************

  return (
    <TailwindProvider>
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
              <Stack.Screen
                name={"WelcomeStack"}
                component={WelcomeStack}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={"LoginStack"}
                component={LoginStack}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={"HomeStack"}
                component={NavBar} // Use the NavBar component here
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Section"
                component={SectionScreen}
                initialParams={{ course_id: "" }}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Lecture"
                component={LectureScreen}
                initialParams={{ lecture_id: "" }}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={"ProfileSettings"}
                component={ProfileSettingsScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    </TailwindProvider>
  );
}
