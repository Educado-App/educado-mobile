import React from 'react';
import { View } from 'react-native';
import Text from '../Text';
import PropTypes from 'prop-types';

/**
 * Component for showing an alert below a form field
 * @param {Object} props should contain the following properties:
 * - label: String
 * - success: Boolean
 * @returns {React.Element} JSX element for showing alerts
 */
export default function FormFieldAlert(props) {
	return (
		<View className="flex-row items-center">
			{props.success ?
				<Text className="text-xs text-success mx-2">{props.label}</Text>
				: <Text className="text-xs text-error mx-2">{props.label}</Text>}
		</View >
	);
}

FormFieldAlert.propTypes = {
	label: PropTypes.string,
	success: PropTypes.bool,
};