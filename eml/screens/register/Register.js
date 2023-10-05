import React from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RegisterForm from "../../components/login/RegisterForm";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoBackButton from "../../components/login/LogoBackButton";
import Text from "../../components/general/Text";

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
              <Text className="text-gray leading-5 text-base">
                {/* Already have an account? */}
                Já possui conta? 
              </Text>
              <Text
                className={"text-black leading-5 text-base underline"}
                onPress={() => navigation.navigate("Login")}
              >
                {/* Log in now */}
                Entre agora 
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
