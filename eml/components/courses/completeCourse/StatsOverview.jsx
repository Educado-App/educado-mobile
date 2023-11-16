import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import Text from '../../general/Text';
import CircleProgressBar from './CircleProgressBar';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';
import { Easing } from 'react-native-reanimated';

export default function StatsOverview() {
  const tailwindConfig = require('../../../tailwind.config.js');
  const projectColors = tailwindConfig.theme.colors;
  const percentage = 25;

  const circularProgressRef = useRef();

  useEffect(() => {
    // Check if the ref is available before calling the animate method
    if (circularProgressRef.current) {
      circularProgressRef.current.animate(100, 8000, Easing.quad);
    }
  }, []);

  return (
    <View className="flex w-full h-full justify-start items-center">
      <Text className="text-center font-sans-bold text-3xl text-primary px-5 py-5">Veja suas estatísticas do curso</Text>

      <View className="h-80 w-full items-center py-5">
        {/* <CircleProgressBar progress={70}/> */}
        <AnimatedCircularProgress
          ref={circularProgressRef}
          fill={percentage}
          size={150}
          width={10}
          rotation={0.25}
          tintColor= {projectColors.primary}
          backgroundColor={projectColors.projectWhite}
          />
        <Text className="text-center text-base text-projectBlack py-5 px-11">Você respondeu PERCENTAGE correta na primeira tentativa, bravo!</Text>
      </View>

      <View className="h-30 w-full items-center">
        <Text className="text-center font-sans-bold text-base text-projectBlack">Placar Educado</Text>
      </View>
    </View>
  );
}
