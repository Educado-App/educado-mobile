import React, { useState, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import Text from '../general/Text';

export default function PopUp({ randomPhrase, xpAmount, isCorrectAnswer }) {
  const animatedValue = new Animated.Value(0);

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 250, // Adjust the duration as needed
      easing: Easing.ease, // Use a suitable easing function
      useNativeDriver: false, // Set to true if possible
    }).start(() => {
      setTimeout(() => {
        hidePopup();
      }, 5000); // Hide after 5 seconds
    });
  };

  const hidePopup = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 400, // Adjust the duration as needed
      easing: Easing.ease, // Use a suitable easing function
      useNativeDriver: false, // Set to true if possible
    }).start();
  };

  useEffect(() => {
    startAnimation(); // Call the animation when the component is rendered
  }, []);

  return (
    <Animated.View
      style={{
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
      className="bg-bgPrimary absolute bottom-0 p-4 w-screen h-[12.5%] z-20 rounded-large shadow-md shadow-projectBlack flex-row justify-between"
    >
      <View className={`${isCorrectAnswer === true ? 'w-10/12' : 'w-full'}`}>
        <Text className={`font-sans-bold text-sm ${isCorrectAnswer === true ? 'text-correctAnswer' : 'text-wrongAnswer'}`}>{randomPhrase}</Text>
      </View>

      {isCorrectAnswer === true ?
        <Text className='font-sans-bold text-sm text-correctAnswer'>{xpAmount}xp</Text>
        : null
      }

    </Animated.View>
  );
}
