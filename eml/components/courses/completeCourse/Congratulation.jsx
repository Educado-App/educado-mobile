import React from 'react';
import { View } from 'react-native';
import Text from '../../general/Text';
import LottieView from 'lottie-react-native';

export default function Congratulation() {
  return (
    <View className="flex w-full h-full justify-start items-center">
      <Text className="text-center font-sans-bold text-3xl text-primary p-5">Excelente trabalho, você terminou!</Text>

      <View className="h-80 w-full items-center">
        <LottieView
          style={{
            width: '100%',
            height: '100%',
          }}
          source={require('../../../assets/animations/rocket.json')}
          autoPlay
        />
      </View>

      <View>
        <Text className="text-center text-base text-projectBlack px-5 mt-12">
          Bom trabalho, NAME! Você pode ver suas estatísticas, placar educado e certificação antes de continuar.
        </Text>
      </View>
    </View>
  );
}
