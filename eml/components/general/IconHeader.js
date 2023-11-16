import React from 'react';
import { View, Image } from 'react-native';
import Text from './Text';
import OfflineBanner from './OfflineBanner';
import PropTypes from 'prop-types';

/**
 * Custom header component with an icon and title.
 * @param {string} title - The title to display next to the icon.
 * @returns {JSX.Element} The IconHeader component.
 */
export default function IconHeader({ title }) {
  return (

    <>
      <OfflineBanner/>
      <View className="flex flex-row items-center pl-6 pt-[22%] pb-[5%]">
        <Image
          source={require('../../assets/images/singleIcon.png')}
          alt="Icon"
          className="w-8 h-8 mr-2"
        />
        <Text className="text-xl font-bold">{title}</Text>
      </View>
    </>
  );
}

IconHeader.propTypes = {
  title: PropTypes.string.isRequired
};
