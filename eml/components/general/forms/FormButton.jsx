import React from 'react';

// Components
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Text from '../Text';
import PropTypes from 'prop-types';

/**
 * Button component for eg. login and register screens.
 * @param {Object} props Should contain the following properties:
 * - label: String
 * - onPress: Function
 * @returns {React.Element} Button component
 */
export default function FormButton(props) {

	FormButton.propTypes = {
		children: PropTypes.string,
		disabled: PropTypes.bool,
		onPress: PropTypes.func,
		style: PropTypes.array,
		type: PropTypes.string
	};

	// Put this here for possible custom styling
	const typeStyles = {
		primary: 'bg-primary',
		error: 'bg-error',
		warning: 'bg-yellow',
	};

	return <>
		<View>
			<TouchableOpacity
				className={'px-4 py-4 rounded-medium ' +
					(typeStyles[props.type] ?? typeStyles.primary) +
					(props.disabled ? ' opacity-50' : '')}
				style={props.style ?? null}
				onPress={props.onPress}
				disabled={props.disabled}
			>
				<Text className="text-center font-sans-bold text-body text-projectWhite">
					{props.children}
				</Text>
			</TouchableOpacity>
		</View>
	</>;
}
