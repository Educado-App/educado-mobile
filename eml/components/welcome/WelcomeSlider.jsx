import React, { useRef } from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Sections from '../../constants/PreviewSections';
import Slick from 'react-native-slick';
import Text from '../general/Text';

export default function WelcomeSlider() {
  const slick = useRef(null);
  const tailwindConfig = require('../../tailwind.config.js');
  const projectColors = tailwindConfig.theme.colors;

  return (
    <Slick
      ref={slick}
      scrollEnabled={true}
      loop={false}
      index={0}
      dotColor={projectColors.projectWhite}
      dotStyle={{ width: 10, height: 10 }}
      activeDotColor={projectColors.primary}
      activeDotStyle={{ width: 10, height: 10 }}
      height={265}
      showsButtons={true}
      autoplayTimeout={10}
      autoplay={true}
      nextButton={
        <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color="projectBlack"
      />
      }
      prevButton={
        <MaterialCommunityIcons
        name="chevron-left"
        size={24}
        color="projectBlack"
      />
      }
    >
      {Sections.map((sections, index) => (
        <View key={index} className="relative h-full px-10 items-center">

          <View className="top-0 px-4">
            <Text className="text-center font-sans-bold text-subheading">{sections.title}</Text>
          </View>

          <View className="bottom-0 absolute pb-[27.5%] px-6">
            <Text className="text-center text-body">{sections.description}</Text>
          </View>

        </View>
      ))}
    </Slick>
  );
};