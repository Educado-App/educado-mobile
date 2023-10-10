import React from 'react';
import { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { subscribeToCourse } from '../../api/api';



const SubscriptionButton = ({ course })  => {
  const courseId = course.courseId;

  return (
    <View className="">
      <Pressable
        onPress={() => {
          subscribeToCourse(courseId);
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