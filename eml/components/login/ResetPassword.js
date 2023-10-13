import { View } from "react-native";
import { React, useState } from "react";
import FormTextField from "./FormTextField";
import FormButton from "./FormButton";
import EducadoModal from "../general/EducadoModal";
import EnterNewPasswordScreen from "./EnterNewPasswordScreen";
import Text from '../general/Text';
import { sendResetPasswordEmail } from "../../api/userApi";

/**
 * Component to create modal (popup) that prompts user for
 * email and code from email to reset password
 * @param {Object} props Should contain the following properties
 * - modalVisible: Boolean to show if modal should be visible
 * - onModalClose: Function to do when modal closes
 */
export default function ResetPassword(props) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [codeEntered, setCodeEntered] = useState(false);

  async function sendEmail(email) {
    const obj = {
      email,
    };

    console.log("Sending email: " + email);

    try {
      await sendResetPasswordEmail(obj)
        .then( async () => {
          console.log("Email sent");
          console.log(email);
          setEmailSent(true);
        }).catch((error) => {
          console.log(error + "YUH"); //HERE
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <EducadoModal modalVisible={props.modalVisible} closeModal={props.onModalClose} id="EducadoModal" title="Redefinção de senha">
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
            <View className="mt-[40px]">
              {emailSent ? (
                <View>
                  <Text className="text-left mb-[10px]">
                    {/* We have sent a code to your mail to reset password,
                    please enter the same code below */}
                    Enviamos um código par ao seu email de redefinição de senha,
                    por favor, insira o mesmo abaixo
                  </Text>
                  <FormTextField placeholder="X X X X" onChangeText={""} />
                  <View className="mt-[40px] mb-[24px]">
                    <FormButton
                      // Continue 
                      label="Continuar"
                      onPress={() => setCodeEntered(true)}
                    />
                  </View>
                  <View className="mx-10 flex-row justify-center">
                    {/* Didn't the code arrive?*/}
                    <Text>O código não chegou?</Text>
                    {/* Resend code*/}
                    <Text className="underline ml-1">Reenviar cógio</Text>
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
          <EnterNewPasswordScreen />
        )}
      </View>

    </EducadoModal>
  );
}
