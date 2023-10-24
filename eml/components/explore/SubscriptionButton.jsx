import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { subscribe } from '../../services/StorageService';
import { useNavigation } from '@react-navigation/native';




const SubscriptionButton = ({ course })  => {
  const navigation = useNavigation();

  const handlePress = () => {
    subscribe(course.courseId);
    
    navigation.navigate('Section', {
      courseId: course.courseId,
    })
  };

  return (
    <View className="">
      <Pressable
        onPress={handlePress} 
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