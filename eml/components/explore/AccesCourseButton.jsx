import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AccessCourseButton = () => {
  // Empty function that does nothing
  const handlePress = () => {};

  return (
    <View className="">
      <Pressable
        onPress={handlePress} // Assigning the empty function to the onPress prop
        className="w-full flex items-center justify-center rounded-lg bg-primary p-2"
      >
        <Text className="text-white p-1 font-bold">
          Acessar curso
        </Text>
      </Pressable>
    </View>
  );
};

export default AccessCourseButton;
