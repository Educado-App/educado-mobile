import React, { useState, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import Text from '../general/Text';
import { generateSuccessPhrases, generateEncouragementPhrases } from '../../constants/PopUpPhrases';
import { getUserInfo } from '../../services/StorageService';
import PropTypes from 'prop-types';

export default function PopUp({ xpAmount, isCorrectAnswer }) {

  const animatedPopUpValue = new Animated.Value(0);
  const animatedXpValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(1);
  const [randomPhrase, setRandomPhrase] = useState('');

  const getRandomPhrase = (firstName) => {
    let randomIndex = 0;

    const phrases = isCorrectAnswer
      ? generateSuccessPhrases(firstName)
      : generateEncouragementPhrases(firstName);

    randomIndex = Math.floor(Math.random() * phrases.length);
    let randomPhrase = phrases[randomIndex];
    if (randomPhrase.length > 69) {
      randomPhrase = randomPhrase.substring(0, 69) + '...';
    }

    return randomPhrase;
  };

  const fetchUserFirstName = async () => {
    const userInfo = await getUserInfo();
    return userInfo.firstName;
  };

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

  useEffect(() => {
    fetchUserFirstName().then((firstName) => {
      setRandomPhrase( getRandomPhrase(firstName));
    });
  }, []);

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

PopUp.propTypes = {
  xpAmount: PropTypes.number,
  isCorrectAnswer: PropTypes.bool,
};
