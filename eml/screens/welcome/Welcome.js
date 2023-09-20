import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BgLinearGradient } from "../../constants/BgLinearGradient";
import { isFontsLoaded } from "../../constants/Fonts";
import Slick from 'react-native-slick';

const sections = [
  {
    id: 1,
    title: 'SEJA BEM-VINDO!',
    description: 'Aqui, tornamos o aprendizado acessível e divertido para todos. Explore nossos conteúdos e comece sua jornada de desenvolvimento.',
  },
  {
    id: 2,
    title: 'FAÇA DOWNLOAD E ACESSE OFFLINE',
    description: 'Este é o seu espaço para aprender de forma interativa e envolvente. Faça o download dos conteúdos e acesse offline quando quiser!',
  },
  {
    id: 3,
    title: 'CADASTRE-SE E EXPLORE',
    description: 'Faça parte de nossa comunidade e descubra um mundo de aprendizado ao seu alcance, não importa sua formação acadêmica.',
  },
];

const WelcomePage = () => {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const slick = useRef(null);

  const onIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  const swipeLeft = () => {
    if (currentIndex > 0) {
      swiperRef.current.scrollBy(-1);
    }
  };

  const swipeRight = () => {
    if (currentIndex < phrases.length - 1) {
      swiperRef.current.scrollBy(1);
    }
  };

  // useEffect(() => {
  //   let autoSwipeInterval;

  //   // const startAutoSwipe = () => {
  //   //   autoSwipeInterval = setInterval(() => {
  //   //     if (currentIndex < phrases.length - 1) {
  //   //       swiperRef.current.scrollBy(1);
  //   //     } else {
  //   //       clearInterval(autoSwipeInterval); // Stop auto-swiping at the end
  //   //     }
  //   //   }, AUTO_SWIPE_INTERVAL);
  //   // };

  //   startAutoSwipe();

  //   return () => {
  //     clearInterval(autoSwipeInterval); // Clean up the interval on unmount
  //   };
  // }, [currentIndex]);

  const tailwindConfig = require('../../tailwind.config.js');
  const projectColors = tailwindConfig.theme.colors;

  if (!isFontsLoaded()) {
    return null;
  }

  return (
    <BgLinearGradient>
      <SafeAreaView >
        <View className="justify-center items-center flex flex-col">
          
          <View className="flex mb-20 pt-40">
            <Image 
              source={require("../../assets/images/logo.png")}
            />
          </View>
            
          <View className="flex mb-20">
            <View className="flex flex-row w-screen justify-center items-center px-6">
              <Image 
                source={require('../../assets/images/left_arrow.png')}
              />
          

              <Slick
                ref={slick}
                scrollEnabled={true}
                loop={false}
                index={0}
                dotColor={projectColors.projectWhite}
                activeDotColor={projectColors.primary}
                height={250}
              >
                {sections.map((sections, index) => (
                  <View key={index} className="gap-6">
                  
                      <View className="px-6">
                        <Text className="text-center font-montserrat-bold text-subheading">{sections.title}</Text>
                      </View>
                      <View className="px-4">
                        <Text className="text-center font-montserrat text-body">{sections.description}</Text>
                      </View>

                    
                  </View>
                ))}
              </Slick>

              <Image 
                source={require('../../assets/images/right_arrow.png')}
              />
            </View>
          </View>

          <View className="flex gap-6 items-center">

            <View className="px-6 w-screen">
              <TouchableOpacity className="bg-primary px-10 py-4 rounded-medium"
                onPress={() => { navigation.navigate('Login'); }}
              >
                <Text className="text-center font-montserrat-bold text-body text-projectWhite">Entrar</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity 
                onPress={() => { navigation.navigate('Register'); }}
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

