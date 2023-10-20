import React from 'react';
import { View, Animated, Easing } from 'react-native';
import Text from '../general/Text';

export default function PopUp({ randomPhrase, xpAmount, isCorrectAnswer }) {
  const animatedPopUpValue = new Animated.Value(0);
  const animatedXpValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(1);
  const randomVariation = Math.random() * 150; // Adjust the range as needed

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

  const startPopUpAnimation = () => {
    Animated.timing(animatedPopUpValue, {
      toValue: 1,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        hidePopup();
      }, 5000); // Hide after 5 seconds
    });
  };

  const hidePopup = () => {
    Animated.timing(animatedPopUpValue, {
      toValue: 0,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const startXpAnimation = () => {
    const timer = 3000;

    Animated.parallel([
      Animated.timing(animatedXpValue, {
        toValue: 8,
        duration: timer,
        easing: (value) => customEasing(value),
        useNativeDriver: false,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: timer,
        easing: (value) => customEasing(value),
        useNativeDriver: false,
      }),
    ]).start(() => {
      setTimeout(() => {
      }, timer);
    });
  };

  startPopUpAnimation();
  startXpAnimation();

  return (
    <>
      {/* Pop Up */}
      <Animated.View
        style={{
          opacity: animatedPopUpValue, // Apply the animated value to opacity
          transform: [
            {
              translateY: animatedPopUpValue.interpolate({
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
          <Text testID={'Phrase'} className={`font-sans-bold text-sm ${isCorrectAnswer === true ? 'text-correctAnswer' : 'text-wrongAnswer'}`}>{randomPhrase}</Text>
        </View>

        {isCorrectAnswer === true ?
          <Text testID={'Xp'} className='font-sans-bold text-sm text-correctAnswer'>{xpAmount}xp</Text>
          : null}

      </Animated.View>

      {/* XP Animation */}
      <Animated.View
        style={{
          opacity: animatedXpValue,
          transform: [
            {
              translateY: animatedXpValue.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0], // Adjust the values for the desired effect
              }),
            },
            {
              translateX: 85,
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
      </Animated.View></>
  );
}
