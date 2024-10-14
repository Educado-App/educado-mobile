import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const StartLaterButton = () => {
	const navigation = useNavigation();

	return (
		<View 
            className="flex justify-center items-center"
        >
			<Pressable
				onPress={() => navigation.navigate('Meus cursos')}
				className="w-80 flex items-center justify-center rounded-lg  p-4"
			>
				<Text className="text-projectBlack p-1 font-bold text-lg underline">
					Voltar para a Home
				</Text>
			</Pressable>
		</View>
	);
};


export default StartLaterButton;