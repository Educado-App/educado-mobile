import { View } from "react-native";
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

  async function sendEmail(email) {
    const obj = {
      email,
    };

    try {
      await sendResetPasswordEmail(obj)
        .then(async () => {
          setEmailSent(true);
          setPasswordResetAlert("");
        }).catch((error) => {
          switch (error?.error?.code) {
            case 'E0401':
              // No user exists with this email!
              setPasswordResetAlert("Não existe nenhum usuário com este email!");
              break;

            case 'E0406':
              // Too many resend attempts!
              setPasswordResetAlert("Muitas tentativas de reenvio!");
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
              setTokenAlert("Não existe nenhum usuário com este email!");
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
  };

  return (
    <EducadoModal modalVisible={props.modalVisible} closeModal={props.onModalClose} id="EducadoModal" title="Redefinição de senha">
      <View className="my-[80px] px-10">
        {!codeEntered ? (
          <View>
            <FormTextField
              bordered={true}
              placeholder="user@email.com"
              label="Email"
              required={true}
              onChangeText={(email) => setEmail(email)}
              keyboardType="email-address"
            />
            <FormFieldAlert testId="emailAlert" label={passwordResetAlert} />
            <View className="mt-[40px]">
              {emailSent ? (
                <View>
                  <Text className="text-left mb-[10px]">
                    {/* We have sent a code to your mail to reset password,
                    please enter the same code below */}
                    Enviamos um código par ao seu email de redefinição de senha,
                    por favor, insira o mesmo abaixo
                  </Text>
                  <FormTextField bordered={true} placeholder="X X X X" onChangeText={(token) => setToken(token)} />
                  <FormFieldAlert testId="tokenAlert" label={tokenAlert} />
                  <View className="mt-[40px] mb-[24px]">
                    <FormButton
                      // Continue 
                      label="Continuar"
                      onPress={() => validateCode(email, token)}
                    />
                  </View>
                  <View className="mx-10 flex-row justify-center">
                    {/* Didn't the code arrive?*/}
                    <Text>O código não chegou?</Text>
                    {/* Resend code*/}
                    <Text className="underline ml-1" onPress={() => sendEmail(email)}>Reenviar cógio</Text>
                  </View>
                </View>
              ) : (
                <FormButton
                  // Send code
                  label="Enviar código"
                  onPress={() => sendEmail(email)}
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
