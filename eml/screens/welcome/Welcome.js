import React from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { BgLinearGradient } from "../../constants/BgLinearGradient";
import { isFontsLoaded } from "../../constants/Fonts";
import WelcomeSlider from "../../components/welcome/WelcomeSlider"; 

const WelcomePage = ({ navigation }) => {

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
            <WelcomeSlider />
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

