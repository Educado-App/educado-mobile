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
import BaseScreen from '../../components/general/BaseScreen';

/**
 * Edit password screen
 * @returns {React.Element} Component for the edit profile screen
 */
export default function EditPassword() {
	// States
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isFormFilledOut, setIsFormFilledOut] = useState(false);
	const [passwordAlert, setPasswordAlert] = useState('');
	const navigation = useNavigation();

	// password validation
	useEffect(() => {
		// reset alert if no new passsword has been entered
		if (newPassword.length == 0) return setPasswordAlert('');

		// password must contain at least one letter
	 	if (!validatePasswordContainsLetter(newPassword)) {
	 		return setPasswordAlert('Senha deve conter pelo menos 1 letra');
	 	}

		// validating password length (at least 8 characters)
	 	if (!validatePasswordLength(newPassword)) {
	 		return setPasswordAlert('Senha muito curta! Mínimo 8 caracteres');
	 	}

		// newPassword and confirmPassword must match
	 	if (newPassword !== confirmPassword) {
	 		return setPasswordAlert('As senhas não coincidem!');
	 	}

	 	setPasswordAlert('');
	 }, [newPassword, confirmPassword]);

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

			// reset error state
			setPasswordAlert('');
			
			// navigation.navigate('Perfil');
		} catch(error) {
			// Handle errors
			console.log('Error updating password:',error?.data?.error ?? error);
			
			switch (error?.error?.code) {
				case 'E0806':
					// Your password is incorrect!
					console.log('Your password is incorrect!');
					setPasswordAlert('Senha atual está incorreta!');
					break;
					// TODO: What error should we give here instead? Unknown error? 
				default: // Errors not currently handled with specific alerts
					ShowAlert('Erro desconhecido!');
				}
		}
	};
	return (
		<BaseScreen>
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
		</BaseScreen>
	);
}