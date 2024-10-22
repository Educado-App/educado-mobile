import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../general/Text';
import { Icon } from '@rneui/base';
import tailwindConfig from '../../tailwind.config';
import PropTypes from 'prop-types';

/**
 * Component for profile navigation buttons on profile page
 */
export default function ProfileNavigationButton({ label, onPress }) {
	const tailwindColors = tailwindConfig.theme.colors;

	return (
		<View className="w-screen my-3 px-6">
			<TouchableOpacity className="border-b border-projectGray py-4 w-full" onPress={onPress}>
				<View className="flex flex-row">
					<Text className="flex-1 text-body items-start mt-0.5">{label}</Text>
					<View className="items-end">
						<Icon
							size={25}
							name="chevron-right"
							type="material-community"
							color={tailwindColors.projectGray}
						/>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
}

ProfileNavigationButton.propTypes = {
	label: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
};
