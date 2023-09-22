import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/**
 * Icon component for the eye besides passwords to toggle if text can be seen by user
 * @param {Object} props Should contain the following properties
 * - showPasswordIcon: Boolean
 * - toggleShowPassword: Function
 */
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
