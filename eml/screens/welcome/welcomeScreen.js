import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function WelcomeScreen({ navigation }) {
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  // Clear all AsyncStorage data (use with caution)
  AsyncStorage.clear();

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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {hasShownWelcome ? (
        <>
          <Text>Welcome to MyApp!</Text>
          <Button
            title="Get Started"
            onPress={() => {
              navigation.navigate("LoginStack");
            }}
          />
        </>
      ) : null}
    </View>
  );
}

export default WelcomeScreen;
