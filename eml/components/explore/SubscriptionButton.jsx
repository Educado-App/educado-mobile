import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';

const SubscriptionButton = ({ onClick }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <View className="">
      <Pressable
        onPress={() => {
          setIsSubscribed(true);
          onClick(true);
        }}
        className="w-full flex items-center justify-center rounded-lg bg-primary p-2"
      >
        <Text className="text-white p-1 font-bold">
          Inscrever-se agora
        </Text>
      </Pressable>
    </View>
  );
};

export default SubscriptionButton;