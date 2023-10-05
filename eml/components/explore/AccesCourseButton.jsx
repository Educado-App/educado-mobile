import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



const AccessCourseButton = ({ course }) => {

  const navigation = useNavigation();

  return (
    <Pressable
    onPress={() => {
      navigation.navigate('Section', {
        courseId: course.courseId,
      });
    }}
      style={{
        minWidth: '100%',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#5fcce9',
        borderColor: '#5fcce9',
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 18,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        
        Acessar curso
      </Text>
    </Pressable>
  );
};

export default AccessCourseButton;
