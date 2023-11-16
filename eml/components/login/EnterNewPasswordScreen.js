import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import FormTextField from '../general/forms/FormTextField';
import FormButton from '../general/forms/FormButton';
import PasswordEye from '../general/forms/PasswordEye';
import { enterNewPassword } from "../../api/userApi";
import FormFieldAlert from "../general/forms/FormFieldAlert";
import { removeEmojis, validatePasswordContainsLetter, validatePasswordLength } from "../general/Validation";
import Text from '../general/Text';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ShowAlert from '../general/ShowAlert';
import DialogNotification from '../general/DialogNotification';


/**
 * Component for entering a new password in the resetPassword modal
 * @param {Object} props not used in this component as of now
 * @returns {React.Element} Modal component for entering new password
 */
export default function EnterNewPasswordScreen(props) {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password constraint variables
  const [passwordContainsLetter, setPasswordContainsLetter] = useState(false);
  const [passwordLengthValid, setPasswordLengthValid] = useState(false);

  // password input alerts
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");

  let isPasswordsEmpty
  let passwordRequirements

  /**
   * Function to toggle the password visibility state
   * @param {Function} setShowPasswordFunction function for handling password visibility state
   * @param {boolean} shouldShowPassword boolean state for visibility of password
   */
  const toggleShowPassword = (setShowPasswordFunction, shouldShowPassword) => {
    setShowPasswordFunction(!shouldShowPassword);
  }

  const checkIfPasswordsMatch = (password, confirmPassword) => {
    if (password === confirmPassword) {
      setConfirmPasswordAlert("");
    } else {
      // The passwords do not match
      setConfirmPasswordAlert("Os campos de senha precisam ser iguais");
    }
  }

  // password input alerts
  useEffect(() => {
    const containsLetter = validatePasswordContainsLetter(newPassword);
    setPasswordContainsLetter(containsLetter);
    const lengthValid = validatePasswordLength(newPassword);
    setPasswordLengthValid(lengthValid);
    checkIfPasswordsMatch(newPassword, confirmPassword);
  }, [newPassword]);

  // password input alerts
  useEffect(() => {
    checkIfPasswordsMatch(newPassword, confirmPassword);
  }, [confirmPassword]);

  /**
   * Function for changing the password
   * @param {String} email 
   * @param {String} token 
   * @param {String} newPassword 
   * @returns 
   */
  async function changePassword(email, token, newPassword) {

    if (!validateInput) {
      return;
    }

    const obj = {
      email,
      token,
      newPassword,
    };

    try {
      await enterNewPassword(obj);
      DialogNotification('success', 'A senha foi alterada.');
      setTimeout(() => {
        props.hideModal();
        props.resetState();
      }, 2500);
    } catch (error) {
      switch (error?.error?.code) {
        case 'E0401':
          // No user exists with this email!
          setPasswordAlert("Não existe nenhum usuário com este email!");
          break;

        case 'E0404':
          // Code expired!
          setPasswordAlert("Código expirado!");
          break;

        case 'E0405':
          // Incorrect code!
          setPasswordAlert("Código incorreto!");
          break;

        default:
          // Errors not currently handled with specific alerts
          ShowAlert("Erro desconhecido!");
          console.log(error);
          break;
      }
    }
  }

  // Function to validate the input
  function validateInput() {
    // Check if passwords are empty
    isPasswordsEmpty = newPassword === "" && confirmPassword === "";
    // Check if password contains a letter and is at least 8 characters long
    passwordRequirements = passwordContainsLetter && passwordLengthValid;
    // Check if passwords match
    return (!isPasswordsEmpty && passwordRequirements && confirmPasswordAlert === "");
  }

  return (
    <View>
      <View>
        <FormTextField
          placeholder="Insira sua senha" // Enter your password
          onChangeText={(password) => setNewPassword(removeEmojis(password))}
          id="password"
          label="Nova senha" // New password
          required={true}
          bordered={true}
          secureTextEntry={!showPassword}
          passwordGuidelines={true}
          testId="passwordInput"
          value={newPassword}
        />
        <PasswordEye id="showPasswordEye" showPasswordIcon={showPassword} toggleShowPassword={() => toggleShowPassword(setShowPassword, showPassword)} />
      </View>
      <View className="flex-row justify-start mt-1 h-6">
        <Text testId="passwordLengthAlert" className={"text-xs" + ((passwordLengthValid || !newPassword) ? " text-gray" : " text-error")}>
          {/* Minimum 8 characters */}
          • Mínimo 8 caracteres
        </Text>
        <View className="flex-row items-center -translate-y-1">
          {passwordLengthValid ? (
            <MaterialCommunityIcons name="check" size={20} color="#4AA04A" />
          ) : null}
        </View>
      </View>
      <View className="flex-row justify-start h-6">
        <Text testId="passwordLetterAlert" className={"text-xs font-sans" + ((passwordContainsLetter || !newPassword) ? " text-gray" : " text-error")}>
          {/* Must contain at least one letter */}
          • Conter pelo menos uma letra
        </Text>
        <View className="flex-row items-center -translate-y-1">
          {passwordContainsLetter ? (
            <MaterialCommunityIcons name="check" size={20} color="#4AA04A" />
          ) : null}
        </View>
      </View>
      <FormFieldAlert label={passwordAlert} />
      <View className="mt-[24px]">
        <FormTextField
          placeholder="Confirme sua senha" // Confirm your password
          bordered={true}
          onChangeText={(confirmPassword) => setConfirmPassword(removeEmojis(confirmPassword))}
          label="Confirmar nova senha" // Confirm new password
          required={true}
          secureTextEntry={!showConfirmPassword}
          testId="confirmPasswordInput"
          value={confirmPassword}
        />
        <PasswordEye showPasswordIcon={showConfirmPassword} toggleShowPassword={() => toggleShowPassword(setShowConfirmPassword, showConfirmPassword)} />
      </View>
      <FormFieldAlert label={confirmPasswordAlert} />
      {/* Enter button */}
      <FormButton
        testId="resetPasswordButton"
        onPress={() => changePassword(props.email, props.token, newPassword)}
        disabled={!validateInput()}
      >
        Entrar
      </FormButton>
      <View className="flex-row justify-center items-end mt-2">
        <Text className="text-gray leading-5 text-base mr-1">
          {/* Wrong email? */}
          E-mail errado?
        </Text>
        <Text
          className="text-black leading-5 text-base underline"
          onPress={() => props.resetState()}
        >
          {/* Go back */}
          Volte aqui
        </Text>
      </View>
    </View>
  );
}
