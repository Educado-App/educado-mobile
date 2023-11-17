import React, { useRef, useEffect, useState } from 'react';
import { View, Dimensions, Image } from 'react-native';
import Text from '../../general/Text';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Easing } from 'react-native-reanimated';
import { getStudentInfo } from '../../../services/StorageService';

export default function StatsOverview({ courseObject }) {
  const [percentage, setPercentage] = useState(0);
  const circleSize = Dimensions.get('window').height * 0.17;
  const tailwindConfig = require('../../../tailwind.config.js');
  const projectColors = tailwindConfig.theme.colors;
  const circularProgressRef = useRef(null);

  async function getCompletedCourse() {
    const studentInfo = await getStudentInfo();
    const completedCourse = studentInfo.completedCourses.find((course) => course.courseId === courseObject.id);

    return completedCourse;
  }
  
  async function getPercentage() {
    try {
      const completedCourse = await getCompletedCourse();
      let totalExercises = 0;
      let totalExercisesWithFirstTry = 2;
  
      if (completedCourse) {
        completedCourse.completedSections.forEach((completedSection) => {
          completedSection.completedExercises.forEach((completedExercise) => {
            totalExercises++;
  
            // Assuming completedExercise has a property named firstTry
            if (completedExercise.firstTry === true) {
              totalExercisesWithFirstTry++;
            }
          });
        });
      } else {
        return 0;
      }

      return Math.round((totalExercisesWithFirstTry / totalExercises) * 100);
      } catch (error) {
        console.error('Error fetching completed courses:', error);
        return 0;
      }
  }
  
  useEffect(() => {
    getPercentage().then((percentage) => {
      // Check if the ref is available before calling the animate method
      if (circularProgressRef.current) {
        circularProgressRef.current.animate(percentage, 1250, Easing.quad);
        setPercentage(percentage);
      }
    });
  }, []);

  return (
    <View className="flex w-full h-full justify-start items-center">
      <Text className="text-center font-sans-bold text-3xl text-primary p-5">Veja suas estatísticas do curso</Text>

      <View className="w-full items-center mt-5 mb-8">
        <AnimatedCircularProgress
          ref={circularProgressRef}
          fill={percentage}
          size={circleSize}
          width={7.5}
          rotation={0.25}
          tintColor= {projectColors.primary}
          backgroundColor={projectColors.projectWhite}
          >
            {(fill) => (
              <Text className="text-center font-sans-bold text-2xl text-primary">
                {percentage}%
              </Text>
            )}
          </AnimatedCircularProgress>
        <Text className="text-center text-base text-projectBlack pt-10 px-10">Você respondeu {percentage}% correta na primeira tentativa, bravo!</Text>
      </View>

      
      <Text className="text-center font-sans-bold text-base text-projectBlack mb-3">Placar Educado</Text>

      <View className="px-6 w-screen">
        <View className="bg-lightGray h-14 rounded-full flex flex-row justify-between items-center px-2">
          <View className="flex flex-row items-center">
            <Image source={require('../../../assets/images/profileEX.jpg')} alt="arrow-right" className="h-10 w-10 rounded-full" />
            <Text className="text-center font-sans-bold text-base text-projectWhite ml-3">Hans Zimmer</Text>
          </View>
          <Text className="text-center font-sans-bold text-base text-projectWhite">1099</Text>
        </View>
      </View>

      <View className="px-6 w-screen z-10 -mt-3">
        <View className="bg-primary h-14 rounded-full flex flex-row justify-between items-center px-2">
          <View className="flex flex-row items-center">
            <Image source={require('../../../assets/images/profileEX.jpg')} alt="arrow-right" className="h-10 w-10 rounded-full" />
            <Text className="text-center font-sans-bold text-base text-projectWhite ml-3">Hans Zimmer</Text>
          </View>
          <Text className="text-center font-sans-bold text-base text-projectWhite">1100</Text>
        </View>
      </View>

      <View className="px-6 w-screen -mt-3">
        <View className="bg-lightGray h-14 rounded-full flex flex-row justify-between items-center px-2">
          <View className="flex flex-row items-center">
            <Image source={require('../../../assets/images/profileEX.jpg')} alt="arrow-right" className="h-10 w-10 rounded-full" />
            <Text className="text-center font-sans-bold text-base text-projectWhite ml-3">Hans Zimmer</Text>
          </View>
          <Text className="text-center font-sans-bold text-base text-projectWhite">1101</Text>
        </View>
      </View>
    </View>
  );
}
