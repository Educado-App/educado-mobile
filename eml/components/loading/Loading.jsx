import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BgLinearGradient } from "../../constants/BgLinearGradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { isFontsLoaded } from "../../constants/Fonts";

const LoadingScreen = () => {
  const logo = require("../../assets/images/logo.png");

  if (!isFontsLoaded()) {
    return null; // Render null while loading font
  }

  return (
    // You can replace this with a loading indicator or any other desired loading UI
    <BgLinearGradient>
      <SafeAreaView className="py-10 px-6 justify-center items-center flex-1 gap-10">
        <Image source={logo}/>
        <Text className="text-center text-body text-projectBlack font-montserrat">
          Transformando conhecimento em liberdade
        </Text>
      </SafeAreaView>
    </BgLinearGradient>
  );
}

export default LoadingScreen;
