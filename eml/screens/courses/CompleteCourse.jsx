import React from 'react';
import { View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { BgLinearGradient } from '../../constants/BgLinearGradient';
import CompleteCourseSlider from '../../components/courses/completeCourse/CompleteCourseSlider';
import Text from '../../components/general/Text.js';
import { useNavigation } from '@react-navigation/native';

// Both components are brokey

export default function CompleteCourseScreen() {

  const navigation = useNavigation();

  return (
    <BgLinearGradient>
      <SafeAreaView >
        <View className="justify-around items-center flex flex-col h-full w-full">
          <View className="flex w-screen h-5/6 justify-center items-center">
            <CompleteCourseSlider />
          </View>

          <View className="px-6 w-screen">
            <TouchableOpacity className="bg-primary px-10 py-4 rounded-medium"
              onPress={() => {console.log('Jump to next slide');}}
            >
              <Text className="text-center font-sans-bold text-body text-projectWhite">Continuar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </BgLinearGradient>
  );
}

