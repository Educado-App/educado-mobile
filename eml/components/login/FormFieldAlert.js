import { React } from 'react';
import { Text, View } from 'react-native';

/**
 * Component for showing an alert below a form field
 * @param {Object} props should contain the following properties:
 * - label: String
 * @returns {React.Element} JSX element for showing alerts
 */
export default function FormFieldAlert(props) {
  return (
    <View className="flex-row items-center">
      <Text className="text-xs text-error mx-2 font-montserrat">
        {props.label}
      </Text>
    </View>
  )
}