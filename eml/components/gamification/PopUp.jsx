import React, { useState, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import Text from '../general/Text';

export function PopUp({ randomPhrase, xpAmount, isCorrectAnswer }) {
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
      testID={'PopUp'}
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

export function XpPopUp({ randomPhrase, xpAmount, isCorrectAnswer }) {
  const animatedValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(1);
  const timer = 3000;
  const randomVariation = Math.random() * 200; // Adjust the range as needed
  
  const customEasing = (value) => {
    // Adjust these parameters to control the easing effect
    const power = 2; // Determines the rate of change. Higher values result in a faster initial acceleration.
    const factor = 2; // A factor to adjust the curve
    const delay = 5; // Delay factor for slower start

    return (
      Math.pow(delay + (1 - delay) * value, power) /
      (Math.pow(delay + (1 - delay) * value, power) +
        Math.pow(factor - factor * (delay + (1 - delay) * value), power))
    );
  };

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue: 8,
        duration: timer,
        easing: (value) => customEasing(value), // Use the custom easing function here
        useNativeDriver: false,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: timer,
        easing: (value) => customEasing(value), // Use linear easing for opacity to maintain consistency
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Hide after 2 seconds (2000 milliseconds)
      setTimeout(() => {
        // Add your code to handle the completion of the animation if needed
      }, timer);
    });
  };

  useEffect(() => {
    startAnimation(); // Call the animation when the component is rendered
  }, []);

  return (
    <Animated.View
      style={{
        opacity: animatedValue,
        transform: [
          {
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0], // Adjust the values for the desired effect
            }),
          },
          {
            translateX: randomVariation,
          },
        ],
      }}
      className="absolute bottom-0 w-screen h-[12.5%] z-20 shadow-md shadow-projectBlack"
      testID={'XpPopUp'}
    >
      {isCorrectAnswer === true ? (
        <Animated.Text
          style={{
            opacity: opacityValue,
          }}
          className="font-sans-bold text-lg text-correctAnswer text-center"
        >
          {xpAmount}xp
        </Animated.Text>
      ) : null}
    </Animated.View>
  );
}
