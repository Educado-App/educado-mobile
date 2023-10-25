import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AccessCourseButton = ({ course }) => {

const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Section', {
    courseId: course.courseId,
    })
  };

  return (
    <View className="">
      <Pressable
        onPress={handlePress} // Assigning the empty function to the onPress prop
        className="w-full flex items-center justify-center rounded-lg bg-yellow p-2"
      >
        <Text className="text-white p-1 font-bold">
          Acessar curso
        </Text>
      </Pressable>
    </View>
  );
};

export default AccessCourseButton;
