import React from 'react';
import { View, Modal, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import EducadoLogo from '../images/EducadoLogo';
import Text from './Text';
import { BgLinearGradient } from '../../constants/BgLinearGradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AlertNotificationRoot } from 'react-native-alert-notification';

/**
 * 
 * @param {Object} props Possible properties:
 * - modalVisible: Boolean declaring if modal is visible
 * - closeModal: Function for closing modal
 * - title: String for modal title
 * @returns 
 */
export default function EducadoModal(props) {

  return (
    <Modal
      visible={props.modalVisible}
      animationType="slide"
      className="border-8 border-black"
    >
      <AlertNotificationRoot>
        <BgLinearGradient>
          <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <View className="flex justify-center pt-[40px]">
                  <View className="flex flex-row justify-end px-10">
                    <Pressable onPress={props.closeModal}>
                      <Entypo name="chevron-down" size={24} />
                    </Pressable>
                  </View>
                  <View className="flex flex-row justify-center my-10">
                    <EducadoLogo fill='fill-black' />
                  </View>
                  <View className="flex flex-row justify-start px-10">
                    <Text className="text-center text-[24px]">{props.title ? props.title : ""}</Text>
                  </View>
                </View>
                {props.children}
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
        </BgLinearGradient>
      </AlertNotificationRoot>
    </Modal>
  )
}