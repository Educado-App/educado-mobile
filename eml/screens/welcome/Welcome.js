import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import { BgLinearGradient } from "../../constants/BgLinearGradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { isFontsLoaded } from "../../constants/Fonts";

const phrases = [
  "Aqui, tornamos o aprendizado acessível e divertido para todos. Explore nossos conteúdos e comece sua jornada de desenvolvimento.",
  "Este é o seu espaço para aprender de forma interativa e envolvente. Faça o download dos conteúdos e acesse offline quando quiser!",
  "Faça parte de nossa comunidade e descubra um mundo de aprendizado ao seu alcance, não importa sua formação acadêmica.",
];

const WelcomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);
  const navigation = useNavigation();
  const AUTO_SWIPE_INTERVAL = 10000; // 10 seconds
  const logo = require("../../assets/images/logo.png");

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

  useEffect(() => {
    let autoSwipeInterval;

    const startAutoSwipe = () => {
      autoSwipeInterval = setInterval(() => {
        if (currentIndex < phrases.length - 1) {
          swiperRef.current.scrollBy(1);
        } else {
          clearInterval(autoSwipeInterval); // Stop auto-swiping at the end
        }
      }, AUTO_SWIPE_INTERVAL);
    };

    startAutoSwipe();

    return () => {
      clearInterval(autoSwipeInterval); // Clean up the interval on unmount
    };
  }, [currentIndex]);

  const goToLoginStack = () => {
    navigation.navigate("LoginStack");
  };

  return (
    <BgLinearGradient>
      <SafeAreaView className="justify-center">
        <View>
          <Image source={logo} />
        </View>

        <View>
          <TouchableOpacity onPress={swipeLeft}>
            <Text>Swipe Left</Text>
          </TouchableOpacity>
          <Swiper
            loop={false}
            onIndexChanged={onIndexChanged}
            //dotStyle={styles.dot}
            //activeDotStyle={styles.activeDot}
            ref={swiperRef}
          >
            {phrases.map((phrase, index) => (
              <SafeAreaView key={index}>
                <Text>{phrase}</Text>
              </SafeAreaView>
            ))}
          </Swiper>
          <TouchableOpacity onPress={swipeRight}>
            <Text>Swipe Right</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={goToLoginStack}>
            <Text>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToLoginStack}>
            <Text>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </BgLinearGradient>
  );
};

export default WelcomePage;
