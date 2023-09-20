import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BgLinearGradient } from "../../constants/BgLinearGradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { isFontsLoaded } from "../../constants/Fonts";

function WelcomeScreen({ navigation }) {
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state
  const logo = require("../../assets/images/logo.png");

  // Set the flag to 'false' on first render, used for development
  AsyncStorage.setItem("hasShownWelcome", "false");

  // Delay execution of useEffect for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      AsyncStorage.getItem("hasShownWelcome").then((value) => {
        if (value === "true") {
          // If the flag is 'true', the user has seen the welcome screen before
          // Navigate to the LoginStack directly
          navigation.navigate("LoginStack");
        } else {
          // The user hasn't seen the welcome screen before
          // Set the flag to 'true' to indicate that it has been shown
          AsyncStorage.setItem("hasShownWelcome", "true");
          // Update the state to render the welcome screen content
          setHasShownWelcome(true);
          navigation.navigate("WelcomeStack");
        }
      });
    }, 3000); // 3 seconds delay

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (!isFontsLoaded()) {
    return null; // Render null while loading font
  }

  // Conditional rendering to show content after the 3-second delay
  if (loading) {
    return (
      // You can replace this with a loading indicator or any other desired loading UI
      <BgLinearGradient>
        <SafeAreaView className="py-10 px-6 justify-center items-center flex-1 gap-10">
          <Image source={logo}/>
          <Text className="text-center text-body text-projectBlack">
            Transformando conhecimento em liberdade
          </Text>
        </SafeAreaView>
      </BgLinearGradient>
    );
  }
}

export default WelcomeScreen;
