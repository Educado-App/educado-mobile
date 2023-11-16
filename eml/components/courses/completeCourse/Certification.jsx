import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Text from '../../general/Text';


export default function Certification() {
  return (
    <View className="flex w-full h-full justify-start items-center">
      <Text className="text-center font-sans-bold text-3xl text-primary px-5">Você Recebeu um Certificado!</Text>

      <View className="h-80 w-full items-center">
        <LottieView
          style={{
            width: '100%',
            height: '100%',
          }}
          source={require('../../../assets/animations/diploma.json')}
          autoPlay
        />
      </View>
      
      <View className="-mt-5">
        <TouchableOpacity 
          onPress={() => { console.log('Navigate to certification'); }}
        >
          <Text className="text-center font-sans-bold text-base underline text-projectBlack">Ver Certificado</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center text-base text-projectBlack px-5 mt-8">Parabéns, você concluiu o curso COURSE NAME e recebeu uma certificação. Você pode ver todas as suas certificações em seu perfil.</Text>
    </View>
  );
}
