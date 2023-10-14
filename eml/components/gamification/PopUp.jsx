import React from 'react';
import { View, Animated, Easing } from 'react-native';
import Text from '../general/Text';

export default function PopUpView({ randomPhrase }) {
  const animatedValue = new Animated.Value(0);

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200, // Adjust the duration as needed
      easing: Easing.ease, // Use a suitable easing function
      useNativeDriver: false, // Set to true if possible
    }).start();
  };

  startAnimation(); // Call the animation when the component is rendered

  return (
    <Animated.View style={{
      opacity: animatedValue, // Apply the animated value to opacity
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 0], // Adjust the values for the desired effect
          }),
        },
      ],
    }}
      className="bg-bgPrimary absolute bottom-0 p-6 w-screen h-[12.5%] z-20 rounded-large shadow-md shadow-projectBlack flex-row justify-between">
      <Text className="font-sans-bold">{randomPhrase}</Text>
      <Text className="font-sans-bold">2xp</Text>
    </Animated.View>
  );
}
