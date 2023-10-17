import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SubscriptionCancel = ({ onPress }) => {
  return (
    <View className="flex-col items-end">
      <TouchableOpacity
        testID="subscriptionCancelButton"
        className="px-5 py-4 rounded-medium"
        onPress={onPress}
      >
        <Text className="text-center font-sans-bold text-body text-projectWhite">
          <MaterialCommunityIcons name="bookmark" size={25} color="black" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionCancel;
