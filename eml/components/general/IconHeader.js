import React from 'react';
import { View, Image } from 'react-native';
import Text from './Text';
import PropTypes from 'prop-types';
import singleIcon from '../../assets/singleIcon.png';

/**
 * Custom header component with an icon and title.
 * @param {string} title - The title to display next to the icon.
 * @returns {JSX.Element} The IconHeader component.
 */
export default function IconHeader({ title }) {
	
	IconHeader.propTypes = {
		title: PropTypes.string.isRequired
	};

	return (
		<View className="flex flex-row items-center pl-6 pt-[20%] pb-[10%]">
			<Image
				source={singleIcon} 
				alt="Icon"
				className="w-8 h-8 mr-2"
			/>
			<Text className="text-xl font-bold">{title}</Text>
		</View>
	);
}