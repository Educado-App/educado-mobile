import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';

const SubscriptionButton = ({ onClick }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <View>
      <Pressable 
              onPress={() => {
                setIsSubscribed(!isSubscribed);
                onClick(!isSubscribed);
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
