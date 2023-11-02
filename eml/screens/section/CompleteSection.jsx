import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import Text from '../../components/general/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import StandardButton from '../../components/general/StandardButton';
import { useNavigation } from '@react-navigation/native';

export default function CompleteSectionScreen() {
  return (
    <SafeAreaView className="flex flex-col justify-center items-center bg-bgPrimary h-screen w-screen">
				<LottieView 
					className="z-10 absolute top-0 h-3/5 w-full"
					source={require('../../assets/animations/completeSection.json')} 
					autoPlay
				/>
				<View className="absolute bottom-0 px-6 w-full z-20 items-center justify-end h-3/4">
					<View className="w-fit h-40 justify-center mb-8">
						<Text className="text-center text-3xl font-sans-bold text-primary bg-bgPrimary">
						{/* This should be made to give different messages */}
						Você está progredindo! Próxima seção, aqui vamos nós!
						</Text>
					</View>

					<View className="flex flex-row justify-between w-full mb-24 ">
						<View className=" h-24 w-44 bg-yellow rounded-lg items-center justify-between px-2 pb-2 shadow shadow-projectGray">
							<View className="w-full h-2/5 justify-center">
								<Text className="text-projectWhite text-base font-sans-bold text-center capitalize">
									{/* Points */}
									Pontos
								</Text>
							</View>
							<View className="bg-projectWhite w-full h-3/5 rounded justify-center">
								<Text className=" text-2xl font-sans-bold text-yellow text-center">
									140
								</Text>
							</View>
						</View>

						<View className=" h-24 w-44 bg-success rounded-lg items-center justify-between px-2 pb-2 shadow shadow-projectGray">
							<View className="w-full h-2/5 justify-center">
								<Text className="text-projectWhite text-base font-sans-bold text-center capitalize">
									{/* Extra points */}
									Pontos Extras
								</Text>
							</View>
							<View className="bg-projectWhite w-full h-3/5 rounded justify-center">
								<Text className=" text-2xl font-sans-bold text-success text-center">
									140
								</Text>
							</View>
						</View>
					</View>

					<View className="w-full mb-24"> 
						<StandardButton
							props={{
							buttonText: "Continuar",
							onPress: () => {useNavigation().navigate('Section')}
							}}
						/>
					</View>
				</View>


			
    </SafeAreaView>
  );
};

