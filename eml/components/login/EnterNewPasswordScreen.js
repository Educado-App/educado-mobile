import { React, useState } from 'react';
import { View } from 'react-native';
import FormTextField from '../../components/login/FormTextField';
import FormButton from '../../components/login/FormButton';
import PasswordEye from '../../components/login/PasswordEye';


/**
 * Component for entering a new password in the resetPassword modal
 * @param {Object} props not used in this component as of now
 * @returns {React.Element} Modal component for entering new password
 */
export default function EnterNewPasswordScreen(props) {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * Function to toggle the password visibility state
   * @param {Function} setPasswordFunction function for handling password visibility state
   * @param {boolean} password boolean state for visibility of password
   */
  const toggleShowPassword = (setPasswordFunction, shouldShowPassword) => {
    setPasswordFunction(!shouldShowPassword);
  }

  return (
    <View>
      <View>
        <FormTextField
          placeholder="Entre sua senha" // Enter your password
          onChangeText={""}
          label="Nova senha" // New password
          required={true}
          bordered={true}
          secureTextEntry={!showPassword}
          passwordGuidelines={true}
        />
        <PasswordEye showPasswordIcon={showPassword} toggleShowPassword={() => toggleShowPassword(setShowPassword, showPassword)} />
      </View>
      <View className="mt-[24px] mb-[40px]">
        <FormTextField
          placeholder="Confirme sua senha" // Confirm your password
          bordered={true}
          onChangeText={""}
          label="Confirmar nova senha" // Confirm new password
          required={true}
          secureTextEntry={!showConfirmPassword}
        />
        <PasswordEye showPasswordIcon={showConfirmPassword} toggleShowPassword={() => toggleShowPassword(setShowConfirmPassword, showConfirmPassword)} />
      </View>
      <FormButton 
        label="Entrar" // Enter
        />
    </View>
  );
}
