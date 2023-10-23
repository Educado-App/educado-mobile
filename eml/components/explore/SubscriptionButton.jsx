import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { subscribe } from '../../services/StorageService';



const SubscriptionButton = ({ course })  => {
  const courseId = course.courseId;

  const handlePress = async () => {
    subscribe(courseId);
  };

  return (
    <View className="">
      <Pressable
        onPress={() => {
          handlePress();
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