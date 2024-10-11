import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const StartLaterButton = () => {
	const navigation = useNavigation();

	return (
		<View className="">
			<Pressable
				onPress={() => navigation.navigate('Explorar')}
				className="w-full flex items-center justify-center rounded-lg  p-4"
			>
				<Text className="text-projectBlack p-1 font-bold text-lg underline">
                    Começar depois
				</Text>
			</Pressable>
		</View>
	);
};


export default StartLaterButton;