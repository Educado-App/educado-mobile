import { React } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import EducadoLogo from '../images/EducadoLogo';


export default function EducadoModal(props) {

  return (
    <Modal
      visible={props.modalVisible}
      animationType="slide"
      className="border-8 border-black bg-modalBackground"
    >
      <View className="flex justify-center pt-[40px]">
        <View className="flex flex-row justify-end px-10">
          <Pressable onPress={props.closeModal}>
            <Entypo name="chevron-down" size={24} />
          </Pressable>
        </View>
        <View className="flex flex-row justify-center my-10">
          <EducadoLogo className="" />
        </View>
        <View className="flex flex-row justify-start px-10">
          <Text className="text-center text-[24px]">{props.title ? props.title : ""}</Text>
        </View>
      </View>
      {props.children}
    </Modal>
  )
}