import React from 'react';
import { View, TextInput } from 'react-native';
import Text from '../Text';
import PropTypes from 'prop-types';

/**
 * Text field component for forms (e.g. login, register, etc.). 
 * @param {Obj} props Possible props:
 * - label: Label to be displayed
 * - required: Whether the field is required
 * - placeholder: Placeholder text to be displayed
 * - keyboardType: Keyboard type (e.g. numeric, email-address, etc.)
 * - autoComplete: Whether to enable auto-completion
 * - secureTextEntry: Whether to mask the input (for passwords, etc.)
 * - passwordGuidelines: Whether to display password guidelines
 * - onChangeText: Callback function to be called when the text changes
 * - value: Value of the input
 * - bordered: Whether to display a border
 * - error: Whether to display an error border
 * @returns {React.Element} Text component for entering data
 */
export default function FormTextField(props) {
  return (
    <View>
      <View className="flex flex-row">
        <Text className={'ml-2 text-xs'}>
          {props.label ?? ''}
        </Text>
        <Text className={'ml-1 text-xs text-error'}>
          {props.required ? '*' : ''}
        </Text>
      </View>
      <View className=''>
        <TextInput className={'h-50 br-25 py-1 pl-[10px] bg-white rounded-lg' +
          (props.bordered ? ' border-2 border-gray' : '') + (props.error ? ' border-2 border-error' : '')}
        placeholder={props.placeholder ?? ''} // Placeholder text to be displayed
        keyboardType={props.keyboardType ?? 'default'} // Keyboard type (e.g. numeric, email-address, etc.)
        autoComplete={props.autoComplete ?? 'off'} // Whether to enable auto-completion
        secureTextEntry={props.secureTextEntry ?? false} // Whether to mask the input (for passwords, etc.)
        passwordGuidelines={props.passwordGuidelines ?? false} // Whether to display password guidelines
        onChangeText={props.onChangeText ? value => props.onChangeText(value) : null} // Callback function to be called when the text changes
        value={props.value} // Value of the input
        />
      </View>
    </View>
  );
}

FormTextField.propTypes = {
  autoComplete: PropTypes.string,
  bordered: PropTypes.bool,
  error: PropTypes.bool,
  keyboardType: PropTypes.string,
  label: PropTypes.string,
  onChangeText: PropTypes.func,
  passwordGuidelines: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  value: PropTypes.string,
};