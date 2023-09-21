import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PasswordEye(props) {
  return (
    <View className="absolute right-2 top-2 mt-3">
      <MaterialCommunityIcons
        name={props.showPasswordIcon ? "eye-off" : "eye"}
        size={24}
        color="gray"
        onPress={props.toggleShowPassword}
      />
    </View>
  );
}
