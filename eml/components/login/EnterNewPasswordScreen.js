import { React, useState } from 'react';
import { View } from 'react-native';
import FormTextField from '../../components/login/FormTextField';
import FormButton from '../../components/login/FormButton';
import PasswordEye from '../../components/login/PasswordEye';
import { enterNewPassword } from "../../api/userApi";


/**
 * Component for entering a new password in the resetPassword modal
 * @param {Object} props not used in this component as of now
 * @returns {React.Element} Modal component for entering new password
 */
export default function EnterNewPasswordScreen(props) {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  /**
   * Function to toggle the password visibility state
   * @param {Function} setPasswordFunction function for handling password visibility state
   * @param {boolean} password boolean state for visibility of password
   */
  const toggleShowPassword = (setShowPasswordFunction, shouldShowPassword) => {
    setShowPasswordFunction(!shouldShowPassword);
  }

  async function changePassword(email, token, newPassword) {
    const obj = {
      email,
      token,
      newPassword,
    };
    
    try {
      await enterNewPassword(obj);
      props.hideModal();
      props.resetState();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <View>
        <FormTextField
          placeholder="Entre sua senha" // Enter your password
          onChangeText={(password) => setNewPassword(password)}
          id = "password"
          label="Nova senha" // New password
          required={true}
          bordered={true}
          secureTextEntry={!showPassword}
          passwordGuidelines={true}
        />
        <PasswordEye id="showPasswordEye" showPasswordIcon={showPassword} toggleShowPassword={() => toggleShowPassword(setShowPassword, showPassword)} />
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
        onPress={() => changePassword(props.email, props.token, newPassword)}
      />
    </View>
  );
}
