import React from "react";
import { ActivityIndicator, Image } from "react-native";
import { BgLinearGradient } from "../../constants/BgLinearGradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../../components/general/Text";
import tailwindConfig from "../../tailwind.config";

const LoadingScreen = () => {
  const logo = require("../../assets/images/logo.png");

  return (
    <BgLinearGradient>
      <SafeAreaView className="py-10 px-6 justify-center items-center flex-1 gap-10">
        <Image source={logo} />
        <Text className="text-center text-body text-projectBlack">
          Transformando conhecimento em liberdade
        </Text>
        <ActivityIndicator
          size={115}
          color={tailwindConfig.theme.colors.primary}
        />
      </SafeAreaView>
    </BgLinearGradient>
  );
}

export default LoadingScreen;
