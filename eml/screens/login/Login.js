import React, { useEffect, useState } from 'react';
import { View, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LoginForm from '../../components/login/LoginForm';
import LogoBackButton from '../../components/login/LogoBackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native';
import Text from '../../components/general/Text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingScreen from '../../components/loading/Loading';
import * as StorageService from '../../services/StorageService';

const LOGIN_TOKEN = '@loginToken';

/**
 * Login screen component containing a login form and possibilities of resetting password or registering a new user.
 * @param {Object} props not used in this component as of now
 */
export default function Login() {

	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	/**
   * TODO: Refactor error to use new error handling system
   * Function for checking if a login token is stored in async local storage (i.e. if the user is already logged in)
   * If a token is found, the user is redirected to the home screen.
   * 
   */
	const checkLoginToken = async () => {
		try {
			const fetchedToken = await AsyncStorage.getItem(LOGIN_TOKEN);
			if (fetchedToken !== null) {
				await AsyncStorage.setItem('loggedIn', 'true');
				StorageService.updateStoredCourses();
				navigation.navigate('HomeStack');
			}
			setLoading(false);
		} catch (error) {
			console.log('Failed to fetch the login token from storage');
			setLoading(false);
		}
	};

	useEffect(() => {
		checkLoginToken();
	}, []);

	return (
		<SafeAreaView className="justify-start bg-secondary flex-1">
			{loading ? (<LoadingScreen />) :
				(<KeyboardAwareScrollView
					className="flex-1"
					resetScrollToCoords={{ x: 0, y: 0 }}
					scrollEnabled={true}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View>
							<View className="mt-10">
								<LogoBackButton navigationPlace="WelcomeStack" />
							</View>
							<View className="mx-6">
								{/* Login form */}
								<View className="my-8">
									<LoginForm />
								</View>
								{/* Register button */}
								<View className="flex-row justify-center">
									<Text className="text-base text-projectGray mr-1">
										{/* Dont have an account yet? */}
                    Ainda não tem conta?
									</Text>
									<Text
										testId="registerNav"
										className={'text-base text-projectBlack underline'}
										onPress={() => navigation.navigate('Register')}
									>
										{/* Sign up now */}
                    Cadastre-se agora
									</Text>
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</KeyboardAwareScrollView>)}
		</SafeAreaView >
	);
}
