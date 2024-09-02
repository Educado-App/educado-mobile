import React, { useEffect } from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RegisterForm from '../../components/login/RegisterForm';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoBackButton from '../../components/login/LogoBackButton';
import Text from '../../components/general/Text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as StorageService from '../../services/StorageService';

export default function Register() {

	const navigation = useNavigation();
	const route = useRoute();
	const previousScreen = route.params?.previousScreen || 'Home';


	const checkLoginToken = async () => {
		try {
			const isValid = await StorageService.isLoginTokenValid();
			if (isValid) {
				navigation.navigate('HomeStack');
			}
		} catch (error) {
			console.log('Failed to fetch the login token from storage');
		}
	};

	useEffect(() => {
		checkLoginToken();
	}, []);

	return (
		<SafeAreaView className="flex-1 justify-start bg-secondary">
			<KeyboardAwareScrollView
				className="flex-1"
				resetScrollToCoords={{ x: 0, y: 0 }}
				scrollEnabled={true}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View>
						<View className="mt-10">
							<LogoBackButton navigationPlace={previousScreen} />
						</View>
						<View className="mx-6">
							<View className="mt-8">
								<RegisterForm />
							</View>
							<View className="flex-row justify-center items-end">
								<Text className="text-projectGray leading-5 text-base">
									{/* Already have an account? */}
                  Já possui conta?
								</Text>
								<Text
									testId={'loginNav'}
									className={'text-projectBlack leading-5 text-base underline'}
									onPress={() => navigation.navigate('Login')}
								>
									{/* Log in now */}
                  Entre agora
								</Text>
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}
