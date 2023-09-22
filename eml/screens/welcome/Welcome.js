import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { BgLinearGradient } from "../../constants/BgLinearGradient";
import { isFontsLoaded } from "../../constants/Fonts";
import Sections from "../../constants/PreviewSections";
import Slick from "react-native-slick";

const WelcomePage = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slick = useRef(null);

  const onIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  const swipeLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const swipeRight = () => {
    if (currentIndex < Sections.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const slickSlider = () => {
    return (
      <Slick
        ref={slick}
        scrollEnabled={true}
        loop={false}
        index={currentIndex}
        dotColor={projectColors.projectWhite}
        dotStyle={{ width: 10, height: 10 }}
        activeDotColor={projectColors.primary}
        activeDotStyle={{ width: 10, height: 10 }}
        height={250}
      >
        {Sections.map((sections, index) => (
          <View key={index} className="gap-6">
            <View className="px-6">
              <Text className="text-center font-montserrat-bold text-subheading">
                {sections.title}
              </Text>
            </View>

            <View className="px-4">
              <Text className="text-center font-montserrat text-body">
                {sections.description}
              </Text>
            </View>
          </View>
        ))}
      </Slick>
    );
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

  const tailwindConfig = require("../../tailwind.config.js");
  const projectColors = tailwindConfig.theme.colors;

  if (!isFontsLoaded()) {
    return null;
  }

  return (
    <BgLinearGradient>
      <SafeAreaView>
        <View className="justify-center items-center flex flex-col">
          <View className="flex mb-20 pt-40">
            <Image source={require("../../assets/images/logo.png")} />
          </View>

          <View className="flex mb-20">
            <View className="flex flex-row w-screen justify-center items-center px-6">
              <TouchableOpacity onPress={() => swipeLeft()}>
                <Image source={require("../../assets/images/left_arrow.png")} />
              </TouchableOpacity>
              {slickSlider()}
              <TouchableOpacity
                onPress={() => {
                  swipeRight();
                }}
              >
                <Image
                  source={require("../../assets/images/right_arrow.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex gap-6 items-center">
            <View className="px-6 w-screen">
              <TouchableOpacity
                className="bg-primary px-10 py-4 rounded-medium"
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text className="text-center font-montserrat-bold text-body text-projectWhite">
                  Entrar
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text className="text-center font-montserrat-bold text-body underline"></Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </BgLinearGradient>
  );
};

export default WelcomePage;
