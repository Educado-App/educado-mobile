import React from "react";

// Components
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import Text from "../Text";

/**
 * Button component for eg. login and register screens.
 * @param {Object} props Should contain the following properties:
 * - label: String
 * - onPress: Function
 * @returns {React.Element} Button component
 */
export default function FormButton(props) {

	// Put this here for possible custom styling
	const typeStyles = {
		primary: "bg-primary",
		error: "bg-error",
	}

	return <>
		<View>
			<TouchableOpacity
				className={"px-4 py-4 rounded-medium " +
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
	</>
}
