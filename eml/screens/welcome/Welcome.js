import React from 'react';
import { View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { BgLinearGradient } from '../../constants/BgLinearGradient';
import WelcomeSlider from '../../components/welcome/WelcomeSlider';
import Text from '../../components/general/Text.js';
import { useNavigation } from '@react-navigation/native';
export default function WelcomeScreen({ }) {

const navigation = useNavigation();

	return (
		<BgLinearGradient>
			<SafeAreaView >
				<View className="justify-center items-center flex flex-col">
          
					<View className="flex mb-[20%] pt-[30%]">
						<Image 
							source={require('../../assets/images/logo.png')}
							className="w-[175.88] h-[25.54]"
						/>
					</View>        
    
					<View className="flex flex-row w-screen justify-center items-center mb-[15%]">
						<WelcomeSlider />
					</View>

					<View className="justify-around">

						<View className="px-6 w-screen">
							<TouchableOpacity className="bg-primary px-10 py-4 rounded-medium"
								onPress={() => { navigation.navigate('LoginStack'); }}
							>
								<Text className="text-center font-sans-bold text-body text-projectWhite">Entrar</Text>
							</TouchableOpacity>
						</View>

						<View className="mt-6">
							<TouchableOpacity 
								onPress={() => { navigation.navigate('LoginStack', { screen: 'Register' }); }}
							>
								<Text className="text-center font-sans-bold text-body underline">Cadastrar</Text>
							</TouchableOpacity>
						</View>

					</View>

				</View>
			</SafeAreaView>
		</BgLinearGradient>
	);
}
