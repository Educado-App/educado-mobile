import React from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RegisterForm from "../../components/login/RegisterForm";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoBackButton from "../../components/login/LogoBackButton";
import getFont from "../../components/general/GetFont";

export default function Register() {

  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 justify-start bg-secondary">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View className="mt-10">
            <LogoBackButton navigationPlace={"Login"} />
          </View>
          <View className="mx-6">
            <View className="mt-8">
              <RegisterForm />
            </View>
            <View className="flex-row justify-center items-end">
              <Text className={"text-gray leading-5 text-base" + getFont()}>
                Já possui conta? {/* Already have an account? */}
              </Text>
              <Text
                className={"text-black leading-5 text-base underline" + getFont()}
                onPress={() => navigation.navigate("Login")}
              >
                Entre agora {/* Log in now */}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
