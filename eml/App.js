import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import CourseScreen from './screens/courses/CourseScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import ProfileComponent from './screens/profile/Profile';
import LoginScreen from './screens/login/Login';
import RegisterScreen from './screens/register/Register';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import RightAnswerScreen from './screens/excercise/RightAnswerScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExerciseScreen from './screens/excercise/ExerciseScreen';
import WrongAnswerComponent from './screens/excercise/WrongAnswerScreen';
import Explore from './screens/explore/Explore';
import { TailwindProvider } from 'tailwindcss-react-native';
import ErrorScreen from './screens/errors/ErrorScreen';
import SectionCompleteScreen from './screens/excercise/SectionCompleteScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isFontsLoaded } from './constants/Fonts';
import Loading from "./components/loading/Loading";
import WelcomeScreen from "./screens/welcome/Welcome";
import ProfileSettingsScreen from "./screens/profile/ProfileSettings";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
/**
 * Check if user is logged in, if not redirect to login screen
 */
const checkLogin = () => {
  if (AsyncStorage.getItem("@login_token") === null) {
    useNavigation().navigate('Login');
  }
}
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

export function useWelcomeScreenLogic() {
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [initialRoute, setInitialRoute] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        try {
          const value = await AsyncStorage.getItem("hasShownWelcome");
          if (value === "true") {
            setInitialRoute("LoginStack");
          } else {
            await AsyncStorage.setItem("hasShownWelcome", "true");
            setHasShownWelcome(true);
            setInitialRoute("WelcomeStack");
          }
        } catch (error) {
          console.error(
            "Error retrieving or setting AsyncStorage data:",
            error
          );
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();   
    }, 3000);
  }, []);

  return { initialRoute, isLoading };
}

// Change InitialRouteName to HomeStack if you want to skip Login Screen
export default function App() {
  const fontsLoaded = isFontsLoaded();
  const { initialRoute, isLoading } = useWelcomeScreenLogic();

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
                component={HomeStack}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={"ProfileSettings"} // Name of your screen
                component={ProfileSettingsScreen} // Component to be rendered for ProfileSettings screen
                options={{ headerShown: false }} // You can customize the header title here
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    </TailwindProvider>
  );
}
