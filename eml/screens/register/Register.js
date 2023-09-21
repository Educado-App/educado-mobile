import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RegisterForm from "../../components/login/RegisterForm";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoBackButton from "../../components/login/LogoBackButton";
import { isFontsLoaded } from "../../constants/Fonts.js";

export default function Register() {
  if (!isFontsLoaded()) {
    return null;
  }

  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 justify-start bg-secondary">
      <View>
        <View className="mt-10">
          <LogoBackButton navigationPlace={"Login"} />
        </View>
        <View className="mt-8">
          <RegisterForm />
        </View>
        <View className="flex-row justify-center items-end">
          <Text className="font-montserrat text-gray leading-5 text-base">
            Já possui conta?{" "}
          </Text>
          <Text
            className="font-montserrat text-black leading-5 text-base underline"
            onPress={() => navigation.navigate("Login")}
          >
            Entre agora
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
