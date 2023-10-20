import React from "react";
import { View, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

/**
 * Renders a button component for cancelling a subscription.
 * @param {Function} onPress - The function to be called when the button is pressed.
 * @returns {JSX.Element} - The rendered component.
 */
const SubscriptionCancel = ({ onPress }) => {
  return (
    <View>
      <TouchableOpacity
        testID="subscriptionCancelButton"
        className="px-5 py-4"
        onPress={onPress}
      >
        <MaterialCommunityIcons name="bookmark" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionCancel;
