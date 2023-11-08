import React, { useState } from "react";

// Components
import { View } from "react-native";
import StandardModal from "../general/StandardModal";
import PasswordField from "../general/forms/PasswordField";
import FormButton from "../general/forms/FormButton";

const ChangePassword = (props) => {

	const [modalVisible, setModalVisible] = React.useState(false);
	const [currentPassword, setCurrentPassword] = React.useState('');
	const [newPassword, setNewPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');

	const closeModal = () => {
		setModalVisible(false);
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
			<View className='flex flex-col mx-4'>
				<PasswordField
					password={currentPassword}
					setPassword={setCurrentPassword}
				/>
				<PasswordField
					password={newPassword}
					setPassword={setNewPassword}
				/>
				<PasswordField
					password={confirmPassword}
					setPassword={setConfirmPassword}
				/>
				<FormButton>Confirmar</FormButton>
			</View>
		</StandardModal>
	</>
}

export default ChangePassword;