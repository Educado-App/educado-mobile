import { Text, View, Animated, Modal, Pressable } from "react-native";
import { React, useEffect } from "react";
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import FormTextField from "./FormTextField";
import FormButton from "./FormButton";
import { ViewBase } from "react-native";

export default function ResetPassword(props) {
	{/*const translateY = new Animated.Value(400);

	useEffect(() => {
		if (props.modalVisible) {
			Animated.spring(translateY, {
				toValue: 0,
				useNativeDriver: false,
			}).start();
		} else {
			Animated.spring(translateY, {
				toValue: 400,
				useNativeDriver: false,
			}).start();
		}
	}, [props.modalVisible]);*/}

	const closeModal = () => {
		props.onModalClose();
	}

	return (
		<Modal visible={props.modalVisible} animationType='slide' className='border-8 border-black'>
			<View className='py-[40px]'>
				<Text className='text-center text-[24px]'>Redefinção de senha</Text>
				<Pressable onPress={closeModal}>
					<Text>Close modal</Text>
				</Pressable>
			</View>
			<View className='my-[80px]'>
				<FormTextField
					placeholder='user@email.com'
					label='Email'
					required={true}
					onChangeText={''}
				/>
				<View className='mt-[40px]'>
					<FormButton label='Enviar código' />
				</View>
			</View>
		</Modal>
	)

}
