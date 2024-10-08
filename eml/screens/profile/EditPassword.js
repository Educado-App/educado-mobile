import React, { useEffect, useState } from 'react';

// Components
import { View,SafeAreaView, } from 'react-native';
import PasswordField from '../../components/general/forms/PasswordField';
import FormButton from '../../components/general/forms/FormButton';
import ToastNotification from '../../components/general/ToastNotification';
import BackButton from '../../components/general/BackButton';
import { useNavigation } from '@react-navigation/native';
import Text from '../../components/general/Text';
// Services
import { updateUserPassword } from '../../api/userApi';
import { getUserInfo, getJWT } from '../../services/StorageService';
import FormFieldAlert from '../../components/general/forms/FormFieldAlert';
import { validatePasswordContainsLetter, validatePasswordLength } from '../../components/general/Validation';
import { alertErrorCode } from '../../services/ErrorAlertService';

/**
 * Edit password screen
 * @returns {React.Element} Component for the edit profile screen
 */
export default function EditPassword() {
	// States
	const [currentPassword, setCurrentPassword] = useState('');
	const [isCurrentPasswordWrong, setIsCurrentPasswordWrong] = useState(false);
	const [isMatchPasswordWrong, setisMatchPasswordWrong] = useState(false);
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isFormFilledOut, setIsFormFilledOut] = useState(false);
	const [passwordAlert, setPasswordAlert] = useState('');
	const navigation = useNavigation();

	// useEffects
	// useEffect(() => {
	// 	if(newPassword.length == 0) return setPasswordAlert('');
	// 	if(!validatePasswordContainsLetter(newPassword)) {
	// 		// The password doesn't contain a letter TODO: Get confirmation from Luiza
	// 		return setPasswordAlert('Senha deve conter pelo menos 1 letra');
	// 	}
	// 	if(!validatePasswordLength(newPassword)) {
	// 		// The password is too short TODO: Get confirmation from Luiza
	// 		return setPasswordAlert('Senha muito curta');
	// 	}
	// 	if(newPassword !== confirmPassword) {
	// 		// The passwords don't match TODO: Get confirmation from Luiza
	// 		return setPasswordAlert('As senhas não coincidem!');
	// 	}

	// 	return setPasswordAlert('');
	// }, [newPassword, confirmPassword]);

	useEffect(() => {
		setIsFormFilledOut(checkIsFormFilledOut());
	}, [currentPassword, newPassword, confirmPassword, passwordAlert]);

	// Gauge whether the form is filled out
	const checkIsFormFilledOut = () => {
		if(currentPassword.length == 0) return false;
		if(newPassword.length == 0) return false;
		if(confirmPassword.length == 0) return false;
		if(passwordAlert != '') return false;
		return true;
	};

	const checkIfPasswordsMatch = (password, confirmPassword) => {
		if (password === confirmPassword) {
			setPasswordAlert('');
		} else {
			// The passwords do not match
			setPasswordAlert('Os campos de senha precisam ser iguais');
		}
	};

	// Submit password change
	const submitForm = async () => {
		try {
			// Get user ID
			const userInfo = await getUserInfo();
			const JWT = await getJWT();
			// Make request
			await updateUserPassword(userInfo.id, currentPassword, newPassword, JWT);
			// Show success message
			ToastNotification('success', 'Senha alterada!');
				
			// Clear fields
			setCurrentPassword('');
			setNewPassword('');
			setConfirmPassword('');
			
			// navigation.navigate('Perfil');
		} catch(error) {
			// Handle errors
			console.log('Error updating password:',error?.data?.error ?? error);
			
			switch (error?.error?.code) {
				case 'E0806':
					// Your password is incorrect!
					console.log('Your password is incorrect!');
					setPasswordAlert('Senha incorreta!');
					setIsCurrentPasswordWrong(true);
					break;
					// TODO: What error should we give here instead? Unknown error? 
				default: // Errors not currently handled with specific alerts
					ShowAlert('Erro desconhecido!');
				}
		}
	};
	return (
		<SafeAreaView className='bg-secondary'>
			<View className='flex flex-col mx-4 z-10'>
				<View>
					<View className='relative mt-12 mb-6'>
						{/* Back button */}
						<BackButton onPress={() => navigation.navigate('Perfil')} />

						{/* Title */}
						<Text className='w-full text-center text-xl font-sans-bold'>
             		 Alterar senha
						</Text>
					</View>
				</View>
				<PasswordField
					label='Senha atual'
					password={currentPassword}
					setPassword={setCurrentPassword}
					className='mb-4'
					/>
				{isCurrentPasswordWrong && <FormFieldAlert testId="passwordAlert" label='Senha incorreta!' />}
				<PasswordField
					label='Nova senha'
					password={newPassword}
					setPassword={setNewPassword}
					className='mb-4'
					/>
				<PasswordField
					label='Confirmar senha'
					password={confirmPassword}
					setPassword={setConfirmPassword}
					/>
				<FormFieldAlert testId="passwordAlert" label={passwordAlert} />
				<FormButton
					onPress={submitForm}
					disabled={!isFormFilledOut}
					className='mt-4'
					>
					Confirmar
				</FormButton>
			</View>
		</SafeAreaView>
	);
}