import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Text from '../../components/general/Text';
import StandardButton from '../../components/general/StandardButton';
import AnimatedNumbers from '../../components/gamification/AnimatedNumber';
import { generateSectionCompletePhrases } from '../../constants/Phrases';
import { getStudentInfo } from '../../services/StorageService';
import { findCompletedSection } from '../../services/utilityFunctions';

export default function CompleteSectionScreen() {
  const route = useRoute();
  const { courseId, sectionId } = route.params;
  const [points, setPoints] = useState(0);
  const [extraPoints, setExtraPoints] = useState(0);
  const navigation = useNavigation();
  const [randomPhrase, setRandomPhrase] = useState('');

  const getRandomPhrase = () => {
    let randomIndex = 0;
    const phrases = generateSectionCompletePhrases();

    randomIndex = Math.floor(Math.random() * phrases.length);

    return phrases[randomIndex];
  };

  function animation(state, setState, finalValue) {
    return new Promise((resolve) => {
      if (state < finalValue) {
        const interval = setInterval(() => {
          setState((prevNumber) => {
            const nextNumber = prevNumber + 1;
            if (nextNumber >= finalValue) {
              clearInterval(interval);
              resolve(finalValue);
              return finalValue;
            }
            return nextNumber;
          });
        });
      } else {
        resolve(finalValue);
      }
    });
  }

  function pointBox(text, pointsText, color, duration) {
    return (
      <View className={`h-24 w-40 ${color === 'green' ? 'bg-success' : 'bg-yellow'} rounded-lg items-center justify-between px-2 pb-2 shadow shadow-projectGray`}>
        <View className="w-full h-2/5 justify-center">
          <Text className="text-projectWhite text-base font-sans-bold text-center capitalize">
            {text}
          </Text>
        </View>
        <View className="bg-projectWhite w-full h-3/5 rounded justify-center items-center">
          <AnimatedNumbers
            animateToNumber={pointsText}
            animationDuration={duration}
            fontStyle={`text-2xl font-sans-bold ${color === 'green' ? 'text-success' : 'text-yellow'} text-center`}
          />
        </View>
      </View>
    );
  }

  async function getPointsFromSection() {
    const studentInfo = await getStudentInfo();
    const completedSection = findCompletedSection(
      studentInfo,
      courseId,
      sectionId,
    );
    if (completedSection === null) {
      return 0;
    }
    return { totalPoints: completedSection.totalPoints, extraPoints: completedSection.extraPoints };
  }

  useEffect(() => {
    async function animations() {
      const obj = await getPointsFromSection();
      await animation(points, setPoints, obj.totalPoints);

      setTimeout(async () => {
        await animation(extraPoints, setExtraPoints, obj.extraPoints);
      }, 750);
    }

    setRandomPhrase(getRandomPhrase());
    animations();
  }, []);

  return (
    <SafeAreaView className="flex flex-col justify-center items-center bg-secondary h-screen w-screen">
      <LottieView
        className="z-10 absolute top-0 w-full"
        source={require('../../assets/animations/completeSection.json')}
        autoPlay
      />

      <View className="absolute bottom-0 px-6 w-full z-20 items-center justify-end h-3/4">
        <View className="w-fit h-40 justify-center mb-8">
          <Text className="text-center text-3xl font-sans-bold text-primary bg-secondary">
            {randomPhrase}
          </Text>
        </View>

        <View className="flex flex-row justify-between w-full mb-20">
          {pointBox('Pontos', points, 'yellow', 750)}
          {pointBox('Pontos Extras', extraPoints, 'green', 750)}
        </View>

        <View className="w-full mb-20">
          <StandardButton
            props={{
              buttonText: 'Continuar',
              onPress: () => {
                navigation.reset({
                  index: 1,
                  routes: [
                    { name: 'HomeStack' },
                    {
                      name: 'Section',
                      params: { courseId },
                    },
                  ],
                });
              },
            }}
          />
        </View>
      </View>

    </SafeAreaView>
  );
};
