import React from 'react';

// Components
import { View, Modal, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Icon } from '@rneui/base';
import Text from './Text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AlertNotificationRoot } from 'react-native-alert-notification';

// Misc
import tailwindConfig from '../../tailwind.config';

/**
 * 
 * @param {Object} props Properties:
 * - modalVisible: Boolean declaring if modal is visible
 * - closeModal: Function for closing modal
 * - title: String for modal title
 * @returns 
 */
const StandardModal = (props) => {

  return (
    <Modal
      visible={props.modalVisible}
      animationType='slide'
      className='border-8 border-black'
    >
      <AlertNotificationRoot>
        <KeyboardAwareScrollView className='bg-secondary'>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View className='relative mx-4 my-6'>
                {/* Back button */}
                <Pressable
                  onPress={props.closeModal}
                  className='absolute z-50 p-4 -m-4'
                >
                  <Icon
                    size={25}
                    name='chevron-left'
                    type='material-community'
                    color={tailwindConfig.theme.colors.projectBlack}
                  />
                </Pressable>

                {/* Title */}
                <Text className='w-full text-center text-xl font-sans-bold'>
                  {props.title}
                </Text>
              </View>

              {props.children}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </AlertNotificationRoot>
    </Modal>
  )
}

export default StandardModal;