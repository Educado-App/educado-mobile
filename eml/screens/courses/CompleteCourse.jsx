import React from 'react';
import { View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { BgLinearGradient } from '../../constants/BgLinearGradient';
import CompleteCourseSlider from '../../components/courses/CompleteCourseSlider';
import Text from '../../components/general/Text.js';
import { useNavigation } from '@react-navigation/native';

// Both components are brokey
import CircleProgressBar from '../../components/courses/CircleProgressBar';
import LottieView from 'lottie-react-native';

export default function CompleteCourseScreen() {

  const navigation = useNavigation();

  return (
    <BgLinearGradient>
      <SafeAreaView >
        <View className="justify-center items-center flex flex-col">
          
          <View className="flex mb-[15%] pt-[10%]">
            <Image 
              source={require('../../assets/images/logo.png')}
              className="w-[175.88] h-[25.54]"
            />
          </View>

          {/* Testing lottiefiles and Circle Progress Bar here */}
          <View className="flex flex-row w-screen justify-center items-center mb-[15%]">
            <CircleProgressBar progress={50}/>
            <LottieView
                className="z-10 absolute top-0 w-full"
                source={require('../../assets/animations/CompleteCourse.json')}
                autoPlay
            />
          </View>
    
          <View className="flex flex-row w-screen justify-center items-center mb-[15%]">
            <CompleteCourseSlider />
          </View>

          <View className="justify-around">

            <View className="px-6 w-screen">
              <TouchableOpacity className="bg-primary px-10 py-4 rounded-medium"
                onPress={() => {console.log('Jump to next slide');}}
              >
                <Text className="text-center font-sans-bold text-body text-projectWhite">Continuar</Text>
              </TouchableOpacity>
            </View>

            <View className="mt-6">
              <TouchableOpacity 
                onPress={() => { console.log('Navigate to certification'); }}
              >
                <Text className="text-center font-sans-bold text-body underline">Ver Certificado</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>
      </SafeAreaView>
    </BgLinearGradient>
  );
}

