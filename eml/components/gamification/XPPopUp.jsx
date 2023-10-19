import React, { useState, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import Text from '../general/Text';

export default function PopUp({ randomPhrase, xpAmount, isCorrectAnswer }) {
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
