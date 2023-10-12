import React from "react";
import { Image } from "react-native";
import { BgLinearGradient } from "../../constants/BgLinearGradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../../components/general/Text";

const LoadingScreen = () => {
  const logo = require("../../assets/images/logo.png");

  return (
    <BgLinearGradient>
      <SafeAreaView className="py-10 px-6 justify-center items-center flex-1 gap-10">
        <Image source={logo} />
        <Text className="text-center text-body text-projectBlack">
          Transformando conhecimento em liberdade
        </Text>
      </SafeAreaView>
    </BgLinearGradient>
  );
}

export default LoadingScreen;
