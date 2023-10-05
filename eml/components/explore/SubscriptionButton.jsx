import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';



const SubscriptionButton = ({ course })  => {
  const courseId = course.courseId;

  return (
    <View>
      <Pressable 
        onPress={() => {
          subscribeToCourse(courseId);
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
          Inscrever-se agora
        </Text>
      </Pressable>
    </View>
  );
};

export default SubscriptionButton;
