import { Text, View, Animated, Modal, Pressable } from "react-native";
import { React, useEffect, useState } from "react";
import FormTextField from "./FormTextField";
import FormButton from "./FormButton";
import EducadoLogo from "../images/EducadoLogo";

export default function ResetPassword(props) {

  const [emailSent, setEmailSent] = useState(false);

  const closeModal = () => {
    props.onModalClose();
  }

  return (
    <Modal visible={props.modalVisible} animationType='slide'>
      <View className='flex justify-center pt-[40px]'>
        <View className='flex flex-row justify-end px-10'>
        <Pressable onPress={closeModal}>
            <Text>Close modal</Text>
          </Pressable>
        </View>
        <View className='flex flex-row justify-center my-10'>
          <EducadoLogo className='' />
        </View>
        <View className='flex flex-row justify-start px-10'>
          <Text className='text-center text-[24px]'>Redefinção de senha</Text>
        </View>
      </View>
      <View className='my-10'>
        <FormTextField
          placeholder='user@email.com'
          label='Email'
          required={true}
          onChangeText={''}
        />
        <View className='mt-[40px]'>
          {emailSent ?
            <View>
              <Text className='text-center mx-10 mb-[40px]'>Enviamos um código par ao seu email de redefinição de senha, por favor, insira o mesmo abaixo</Text>
              <FormTextField
                placeholder='X X X X'
                onChangeText={''}
              />
              <View className='mt-[40px] mb-[24px]'>
                <FormButton label='Continuar' />
              </View>
              <View className='mx-10 flex-row'>
                <Text className='text-center' >O código não chegou?</Text>
                <Text className='underline ml-1' >Reenviar cógio</Text>
              </View>
            </View>
            : <FormButton label='Enviar código' onPress={() => setEmailSent(true)} />}
        </View>
      </View>
    </Modal>
  )

}
