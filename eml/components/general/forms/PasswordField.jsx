import React, { useState } from "react";

// Components
import { View } from "react-native";
import FormTextField from "./FormTextField";
import PasswordEye from "./PasswordEye";
import FormFieldAlert from "./FormFieldAlert";

const PasswordField = (props) => {

	const [showPassword, setShowPassword] = useState(false);
	const [passwordAlert, setPasswordAlert] = useState('');

	const toggleShowPassword = () => {	
		setShowPassword(!showPassword);
	}

	return <>
		<View className="relative">
			<FormTextField
				testId="passwordInput"
				placeholder={props.placeholder ?? "Insira sua senha"} // Type your password
				value={props.password}
				onChangeText={(inputPassword) => props.setPassword(inputPassword)}
				label={props.label ?? "Senha"} // Password
				required={props.required ?? true} // Default to true
				secureTextEntry={!showPassword}
			/>
			<PasswordEye
				showPasswordIcon={showPassword}
				toggleShowPassword={toggleShowPassword}
			/>
			<FormFieldAlert label={passwordAlert} />
		</View>
	</>
}

export default PasswordField;
