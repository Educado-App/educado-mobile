import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
      <SafeAreaView style={styles.container}>
        <Swiper
          loop={false}
          onIndexChanged={onIndexChanged}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          ref={swiperRef}
        >
          {phrases.map((phrase, index) => (
            <SafeAreaView style={styles.slide} key={index}>
              <Text style={styles.text}>{phrase}</Text>
            </SafeAreaView>
          ))}
        </Swiper>
        <SafeAreaView style={styles.buttonContainer}>
          <TouchableOpacity onPress={swipeLeft} style={styles.button}>
            <Text style={styles.buttonText}>Swipe Left</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={swipeRight} style={styles.button}>
            <Text style={styles.buttonText}>Swipe Right</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <TouchableOpacity onPress={goToLoginStack} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Go to Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </BgLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
  dot: {
    backgroundColor: "#ccc",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#007AFF",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default WelcomePage;
