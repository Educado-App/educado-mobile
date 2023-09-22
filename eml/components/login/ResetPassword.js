import { Text, View, Animated, Modal, Pressable } from "react-native";
import { React, useEffect, useState } from "react";
import FormTextField from "./FormTextField";
import FormButton from "./FormButton";
import { Entypo } from "@expo/vector-icons";
import EducadoLogo from "../images/EducadoLogo";
import EducadoModal from "../general/EducadoModal";
import PasswordEye from "./PasswordEye";

export default function ResetPassword(props) {
  const [emailSent, setEmailSent] = useState(false);
  const [codeEntered, setCodeEntered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const closeModal = () => {
    props.onModalClose();
  };

  const toggleShowPassword = (cb, password) => {
    cb(!password);
  }


  return (
    <EducadoModal modalVisible={props.modalVisible} closeModal={closeModal} title="Redefinção de senha">
      <View className="my-[80px] px-10">
        {!codeEntered ? (
          <View>
            <FormTextField
              bordered={true}
              placeholder="user@email.com"
              label="Email"
              required={true}
              onChangeText={""}
            />
            <View className="mt-[40px]">
              {emailSent ? (
                <View>
                  <Text className="text-left mb-[10px]">
                    Enviamos um código par ao seu email de redefinição de senha,
                    por favor, insira o mesmo abaixo
                  </Text>
                  <FormTextField placeholder="X X X X" onChangeText={""} />
                  <View className="mt-[40px] mb-[24px]">
                    <FormButton
                      label="Continuar"
                      onPress={() => setCodeEntered(true)}
                    />
                  </View>
                  <View className="mx-10 flex-row justify-center">
                    <Text>O código não chegou?</Text>
                    <Text className="underline ml-1">Reenviar cógio</Text>
                  </View>
                </View>
              ) : (
                <FormButton
                  label="Enviar código"
                  onPress={() => setEmailSent(true)}
                />
              )}
            </View>
          </View>
        ) : (
          <View>
            <View>
              <FormTextField
                placeholder="Senha"
                onChangeText={""}
                label="Nova senha"
                required={true}
                bordered={true}
                secureTextEntry={!showPassword}
                passwordGuidelines={true}
              />
              <PasswordEye showPasswordIcon={showPassword} toggleShowPassword={() => toggleShowPassword(setShowPassword, showPassword)} />
            </View>
            <View className="mt-[24px] mb-[40px]">
              <FormTextField
                placeholder="Senha"
                bordered={true}
                onChangeText={""}
                label="Confirmar nova senha"
                required={true}
                secureTextEntry={!showConfirmPassword}
              />
              <PasswordEye showPasswordIcon={showConfirmPassword} toggleShowPassword={() => toggleShowPassword(setShowConfirmPassword, showConfirmPassword)} />
            </View>
            <FormButton label="Entrar" />
          </View>
        )}
      </View>
    </EducadoModal>
  );
}
