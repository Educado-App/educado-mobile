import React, { useRef } from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { BgLinearGradient } from "../../constants/BgLinearGradient";
import { isFontsLoaded } from "../../constants/Fonts";
import Svg, { Path } from 'react-native-svg';
import Sections from '../../constants/PreviewSections';
import Slick from 'react-native-slick';

const WelcomePage = ({ navigation }) => {
  const slick = useRef(null);
  const tailwindConfig = require('../../tailwind.config.js');
  const projectColors = tailwindConfig.theme.colors;

  const slickSlider = () => {
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
          <Svg className="h-[25px] w-[25px] mr-4">
            <Path
              d="M8.59003 17.1239L13.17 12.5439L8.59003 7.95385L10 6.54385L16 12.5439L10 18.5439L8.59003 17.1239Z"
              fill={projectColors.projectBlack}
            />
          </Svg>
        }
        prevButton={
          <Svg className="h-[25px] w-[25px] ml-4">
            <Path
              d="M15.41 17.1239L10.83 12.5439L15.41 7.95385L14 6.54385L8 12.5439L14 18.5439L15.41 17.1239Z"
              fill={projectColors.projectBlack}
            />
          </Svg>
        }
      >
        {Sections.map((sections, index) => (
          <View key={index} className="relative h-full px-10 items-center">
          
              <View className="top-0 px-4">
                <Text className="text-center font-montserrat-bold text-subheading">{sections.title}</Text>
              </View>

              <View className="bottom-0 absolute pb-[27.5%] px-6">
                <Text className="text-center font-montserrat text-body">{sections.description}</Text>
              </View>
            
          </View>
        ))}
      </Slick>
    );
  };

  if (!isFontsLoaded()) {
    return null;
  }

  return (
    <BgLinearGradient>
      <SafeAreaView >
        <View className="justify-center items-center flex flex-col">
          
          <View className="flex mb-[20%] pt-[30%]">
            <Image 
              source={require("../../assets/images/logo.png")}
              className="w-[175.88] h-[25.54]"
            />
          </View>
            
    
          <View className="flex flex-row w-screen justify-center items-center mb-[15%]">
        
            {slickSlider()}

          </View>


          <View className="flex gap-6 items-center">

            <View className="px-6 w-screen">
              <TouchableOpacity className="bg-primary px-10 py-4 rounded-medium"
                onPress={() => { navigation.navigate('LoginStack'); }}
              >
                <Text className="text-center font-montserrat-bold text-body text-projectWhite">Entrar</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity 
                onPress={() => { navigation.navigate('LoginStack', { initialRoute: 'Register' }); }}
              >
                <Text className="text-center font-montserrat-bold text-body underline">Cadastrer</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>
      </SafeAreaView>
    </BgLinearGradient>
  );
};

export default WelcomePage;

