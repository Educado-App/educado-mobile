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
          width: '100%',
          borderRadius: 10,
          backgroundColor: '#fff',
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
          {isSubscribed ? 'Inscrito' : 'Se inscrever'}
        </Text>
      </Pressable>
    </View>
  );
};

export default SubscriptionButton;
