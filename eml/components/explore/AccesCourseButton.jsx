import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AccessCourseButton = () => {
  return (
    <Pressable
      style={{
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 18,
      }}
    >
      <Text
        style={{
          color: 'gray',
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        
        Acessar curso

        <MaterialCommunityIcons
            name="chevron-right"
            size={16}
            color="gray"
        />
      </Text>
    </Pressable>
  );
};

export default AccessCourseButton;
