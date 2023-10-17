import { View, Alert } from "react-native";
import { React, useState, useEffect } from "react";
import FormTextField from "./FormTextField";
import FormButton from "./FormButton";
import EducadoModal from "../general/EducadoModal";
import EnterNewPasswordScreen from "./EnterNewPasswordScreen";
import Text from '../general/Text';
import { sendResetPasswordEmail, validateResetPasswordCode } from "../../api/userApi";
import FormFieldAlert from "./FormFieldAlert";
import { validateEmail } from "../general/Validation";

/**
 * Component to create modal (popup) that prompts user for
 * email and code from email to reset password
 * @param {Object} props Should contain the following properties
 * - modalVisible: Boolean to show if modal should be visible
 * - onModalClose: Function to do when modal closes
 */
export default function ResetPassword(props) {
  const emailAlertMessage = "Não existe nenhum usuário com este email!";
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [codeEntered, setCodeEntered] = useState(false);
  const [passwordResetAlert, setPasswordResetAlert] = useState("");
  const [tokenAlert, setTokenAlert] = useState("");

  useEffect(() => {
    if (email === '') {
      setPasswordResetAlert('');
      return;
    }

    const validationError = validateEmail(email);
    setPasswordResetAlert(validationError);
  }, [email]);

  /**
   * Function to send mail to user with code to reset password
   * @param {*} email 
   */

  async function sendEmail(email) {
    const obj = {
      email,
    };

    try {
      await sendResetPasswordEmail(obj)
        .then(async () => {
          setEmailSent(true);
          setPasswordResetAlert("");
          showEmailSentSuccess(email);
        }).catch((error) => {
          switch (error?.error?.code) {
            case 'E0401':
              // No user exists with this email!
              setPasswordResetAlert(emailAlertMessage);
              break;

            case 'E0406':
              // Too many resend attempts!
              setPasswordResetAlert("Muitas tentativas de reenvio! Espere 5 minutos...");
              break;

            case 'E0004':
              // User not found!
              setPasswordResetAlert("Usuário não encontrado!");
              break;

            // TODO: What error should we give here instead? Unknown error? 
            default: // Errors not currently handled with specific alerts
              console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Function to validate the code entered by the user
   * @param {String} email 
   * @param {String} token 
   */

  async function validateCode(email, token) {
    const obj = {
      email,
      token,
    };

    try {
      await validateResetPasswordCode(obj)
        .then(async () => {
          setCodeEntered(true);
        }).catch((error) => {
          switch (error?.error?.code) {
            case 'E0401':
              // No user exists with this email!
              setPasswordResetAlert(emailAlertMessage);
              break;

            case 'E0404':
              // Code expired!
              setTokenAlert("Código expirado!");
              break;

            case 'E0405':
              // Incorrect code!
              setTokenAlert("Código incorreto!");
              break;
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  const resetState = () => {
    setEmailSent(false);
    setCodeEntered(false);
    setPasswordResetAlert("");
    setTokenAlert("");
  };

  const showEmailSentSuccess = (email) => {
    Alert.alert(
      "Sucesso!", // Success!
      "Código enviado para: " + email, // Code sent to: email
      [{
        text: "OK", 
        style: "cancel",
      }],
      {
        cancelable: true,
      }
    );
  }

  return (
    <EducadoModal modalVisible={props.modalVisible} closeModal={props.onModalClose} id="EducadoModal" title="Redefinição de senha">
      <View className="my-[80px] px-10">
        {!codeEntered ? (
          <View>
            <FormTextField
              bordered={true}
              placeholder="user@email.com"
              label="E-mail"
              required={true}
              onChangeText={(email) => setEmail(email)}
              keyboardType="email-address"
              testId="emailInput"
            />
            <FormFieldAlert testId="emailAlert" label={passwordResetAlert} />
            <View className="mt-[40px]">
              {emailSent ? (
                <View>
                  <Text className="text-left mb-[10px]">
                    {/* We have sent a code to your mail to reset your password,
                     please enter the code you have received below: */}
                    Enviamos para o seu email um código de redefinição de senha. Insira o código abaixo.
                  </Text>
                  <FormTextField
                    bordered={true}
                    placeholder="X X X X"
                    onChangeText={(token) => setToken(token)}
                    testId="tokenInput"
                  />
                  <FormFieldAlert testId="tokenAlert" label={tokenAlert} />
                  <View className="mt-[40px] mb-[24px]">
                    <FormButton
                      // Continue 
                      label="Continuar"
                      onPress={() => validateCode(email, token)}
                      testId="validateCodeBtn"
                    />
                  </View>
                  <View className="mx-10 flex-row justify-center">
                    {/* Did not receieve the code? */}
                    <Text>O código não chegou?</Text>
                    {/* Resend code*/}
                    <Text className="underline ml-1" onPress={() => sendEmail(email)}>Reenviar código</Text>
                  </View>
                </View>
              ) : (
                <FormButton
                  // Send code
                  label="Enviar código"
                  onPress={() => sendEmail(email)}
                  testId="resetPasswordButton"
                />
              )}
            </View>
          </View>
        ) : (
          <EnterNewPasswordScreen
            email={email}
            token={token}
            hideModal={props.onModalClose}
            resetState={resetState}
          />
        )}
      </View>
    </EducadoModal>
  );
}
