import {
  View,
  TouchableOpacity
} from 'react-native';
import Text from '../general/Text';
import React from 'react'
import { Icon } from '@rneui/base';
import tailwindConfig from "../../tailwind.config";

/**
 * Component for profile navigation buttons on profile page
 * @param {Object} props should contain the following properties:
 * - label: String
 * - onPress: Function
 * @returns {React.Element} JSX element
 */
export default function ProfileNavigationButton(props) {

  const tailwindColors = tailwindConfig.theme.colors;

  return (
    <View className="px-6 w-screen my-3">
      <TouchableOpacity className="border-b border-projectGray py-4 w-full" onPress={props.onPress}>
        <View className="flex flex-row">
          <Text className="flex-1 text-body items-start mt-0.5">{props.label}</Text>
          <View className='items-end'>
            <Icon
              size={25}
              name='chevron-right'
              type='material-community'
              color={tailwindColors.projectGray}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}