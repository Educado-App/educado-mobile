import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BgLinearGradient } from "../../constants/BgGradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../constants/GlobalStyles";
import { isMontserratFontLoaded } from "../../constants/Font";

function WelcomeScreen({ navigation }) {
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const logo = require("../../assets/images/logo.png");
  //Makes it so the user has not seen the welcome screen before
  AsyncStorage.setItem("hasShownWelcome", "false");

  useEffect(() => {
    AsyncStorage.getItem("hasShownWelcome").then((value) => {
      AsyncStorage.getItem("hasShownWelcome").then((value) => {
        console.log("hasShownWelcome:", value);
      });

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
      }
    });
  }, []);

  if (!isMontserratFontLoaded()) {
    return null;
  }

  return (
    <BgLinearGradient>
      <SafeAreaView style={styles.container}>
        <Image source={logo} />
        <Text style={globalStyles["body-regular"]}>
          Transformando conhecimento em liberdade
        </Text>
      </SafeAreaView>
    </BgLinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default WelcomeScreen;
