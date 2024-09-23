import React from 'react';
import { View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { BgLinearGradient } from '../../constants/BgLinearGradient';
import WelcomeSlider from '../../components/welcome/WelcomeSlider';
import Text from '../../components/general/Text.js';
import { useNavigation } from '@react-navigation/native';

/* 
Description: 	This is the welcome screen that is shown when the user opens the app for the first time.
				It is a slider that explains the app and its features. It also has a button to login and a button to register.
				When the user clicks on the login button, it is redirected to the login screen.
				When the user clicks on the register button, it is redirected to the register screen.
*/

export default function WelcomeScreen() {

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
							{/* Replace with standard button */}
							<TouchableOpacity className="bg-primary px-10 py-4 rounded-medium"
											  onPress={() => { navigation.navigate('Register', {previousScreen: 'Welcome'}); }}
							>
								<Text className="text-center font-sans-bold text-body text-projectWhite">Cadastrer</Text>
							</TouchableOpacity>
						</View>

						<View className="flex-row justify-center">
							<Text className="text-base text-projectGray mr-1">
								{/* Already have an account? */}
								Já tem uma conta?
							</Text>
							<Text
								testId="loginNav"
								className={'text-base text-projectBlack underline'}
								onPress={() => navigation.navigate('Login', { previousScreen: 'Welcome' })}
							>
								{/* Login now */}
								Entrar agora
							</Text>
						</View>

					</View>

				</View>
			</SafeAreaView>
		</BgLinearGradient>
	);
}

