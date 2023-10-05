import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';

<<<<<<< Updated upstream
const SubscriptionButton = ({ onClick }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
=======


const SubscriptionButton = ({ course })  => {
  const courseId = course.courseId;
>>>>>>> Stashed changes

  return (
    <View>
      <Pressable 
<<<<<<< Updated upstream
              onPress={() => {
                setIsSubscribed(!isSubscribed);
                onClick(!isSubscribed);
              }}
=======
        onPress={() => {
          subscribeToCourse(courseId);
        }}
>>>>>>> Stashed changes
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
