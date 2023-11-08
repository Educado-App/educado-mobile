import React, { useState, useEffect } from "react";

// Components
import { View } from "react-native";
import StandardModal from "../general/StandardModal";
import PasswordField from "../general/forms/PasswordField";
import FormButton from "../general/forms/FormButton";
import ToastNotification from '../../components/general/ToastNotification';

// Services
import { updateUserPassword } from '../../api/userApi';
import { getUserInfo, getJWT } from "../../services/StorageService";
import ShowAlert from "../general/ShowAlert";
import FormFieldAlert from "../general/forms/FormFieldAlert";
import { validatePasswordContainsLetter, validatePasswordLength } from '../general/Validation';

const ChangePasswordModal = (props) => {

	// States
	const [modalVisible, setModalVisible] = useState(false);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isFormFilledOut, setIsFormFilledOut] = useState(false);
	const [passwordAlert, setPasswordAlert] = useState('');

	// useEffects
	useEffect(() => {
		if(newPassword.length == 0) return setPasswordAlert('');
		if(!validatePasswordContainsLetter(newPassword)) {
			// The password doesn't contain a letter TODO: Get confirmation from Luiza
			return setPasswordAlert('Senha deve conter pelo menos 1 letra');
		}
		if(!validatePasswordLength(newPassword)) {
			// The password is too short TODO: Get confirmation from Luiza
			return setPasswordAlert('Senha muito curta');
		}
		if(newPassword !== confirmPassword) {
			// The passwords don't match TODO: Get confirmation from Luiza
			return setPasswordAlert('As senhas não coincidem!');
		}

		return setPasswordAlert('');
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
	}

	const closeModal = () => {
		setModalVisible(false);
	}

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
			
			// This delay is a bodge, but it's the easiest way to show a toast message and close the modal at the same time rn...
			// Too bad!
			// Close modal
			setTimeout(() => closeModal(), 1000);
		} catch(error) {
			// Handle errors
			console.log('Error updating password:',error?.data?.error ?? error);
			switch (error?.data?.error?.code) {
				case 'E0001':
					// User not found!
					ShowAlert("Usuário não encontrado!");
					break;

        case 'E0105':
          // Password is incorrect!
          ShowAlert("Senha incorreta!");
          break;

        case 'E0003':
          // Error connecting to server!
          ShowAlert("Erro de conexão com o servidor!");
          break;

				case 'E0805':
					// Old and new password required. TODO: Get confirmation from Luiza
					ShowAlert("Senha atual e nova senha são obrigatórias!");
					break;

				case 'E0806':
					// Old password is incorrect. TODO: Get confirmation from Luiza
					ShowAlert("Senha atual incorreta!");
					break;

        // TODO: What error should we give here instead? Unknown error? 
        default: // Errors not currently handled with specific alerts
          ShowAlert("Erro desconhecido!");
      }
		}
	}

	return <>
		{/* Button for opening modal */}
		<FormButton
			type='error'
			onPress={() => setModalVisible(true)}
		>
			Alterar senha
		</FormButton>

		{/* Modal */}
		<StandardModal
			modalVisible={modalVisible}
			closeModal={closeModal}
			id="EducadoModal"
			title="Alterar senha"
		>
			{/* I wish they'd properly support gap in nativewind... */}
			<View className='flex flex-col mx-4'>
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
				<FormFieldAlert label={passwordAlert}/>
				<FormButton
					onPress={submitForm}
					disabled={!isFormFilledOut}
					className='mt-4'
				>
					Confirmar
				</FormButton>
			</View>
		</StandardModal>
	</>
}

export default ChangePasswordModal;