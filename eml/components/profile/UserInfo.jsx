import React from 'react';
import { View } from 'react-native';
import Text from '../general/Text';
import ProfileNameCircle from './ProfileNameCircle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

/**
 * Component for showing user information
 * @param {Object} props should contain the following properties:
 * - firstName: string
 * - lastName: string
 * - email: string
 * @returns {React.Element} React component
 */
export default function UserInfo(props) {

  return (
    <View className="p-6 flex flex-row items-center ">
      <View className='pr-5'>
        <TouchableOpacity>
          <ProfileNameCircle firstName={props.firstName} lastName={props.lastName}/>
        </TouchableOpacity>
      </View>
      <View className='w-[70%]'>
        <Text className="text-xl font-sans-bold">{props.firstName} {props.lastName}</Text>
        <Text className="text-m font-sans-bold text-projectGray">{props.email}</Text>
      </View>
    </View> 
  );
}

UserInfo.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
};