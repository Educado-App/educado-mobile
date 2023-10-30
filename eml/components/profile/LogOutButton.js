import { View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

const LOGIN_TOKEN = '@loginToken';
const USER_INFO = '@userInfo';

export default function LogOutButton() {
	

	const navigation = useNavigation();

	async function logOut() {

		await AsyncStorage.removeItem(await AsyncStorage.getItem(LOGIN_TOKEN));
		await AsyncStorage.removeItem(await AsyncStorage.getItem(USER_INFO));

		navigation.navigate('Login');

	}

	const logoutAlert = () =>
		Alert.alert('Sair', 'Tem certeza que deseja sair?', [
			{
				text: 'Não',
				onPress: () => console.log('No Pressed'),
				style: 'cancel'
			},
			{ text: 'Sim', onPress: logOut }
		]);

	return (
		<View className="flex-row items-center justify-end px-6 mt-[-40%] mb-[20%]">
			<TouchableOpacity className="bg-[#dc2626] items-center py-2 pl-1 rounded-medium w-[15%]" onPress={logoutAlert}>
				<View>
					<MaterialCommunityIcons
						name="logout"
						size={40}
						color="white"

					/>
				</View>
			</TouchableOpacity>
		</View>
	);
}