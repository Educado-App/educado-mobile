import React from 'react';
import { View, Modal, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import PropTypes from 'prop-types';

/**
 * 
 * @param {Object} props Possible properties:
 * - modalVisible: Boolean declaring if modal is visible
 * - closeModal: Function for closing modal
 * @returns 
 */
export default function CertificateModal(props) {

  return (
    <Modal
      visible={props.modalVisible}
      animationType="slide"
      className="border-8 border-black"
    >
      <AlertNotificationRoot>
        <KeyboardAwareScrollView className='bg-secondary'>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View className="flex justify-center pt-[10%]">
                <View className="flex flex-row justify-end px-[10%]">
                  <Pressable onPress={props.closeModal}>
                    <Entypo name="chevron-down" size={24} />
                  </Pressable>
                </View>
              </View>
              {props.children}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </AlertNotificationRoot>
    </Modal>
  );
}

CertificateModal.propTypes = {
  children: PropTypes.object,
  closeModal: PropTypes.func,
  modalVisible: PropTypes.bool,
};