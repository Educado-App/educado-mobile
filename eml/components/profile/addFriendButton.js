import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from '@rneui/themed';
import Text from '../general/Text';

const AddFriendButton = () => {
	return (
		<View>
			<View style={styles.formButton}>
				<View className="flex flex-row">
					<View className="pr-4">
						<Icon
							name="account-plus"
							type="material-community"
							color="#9DE89C"
							size={30}
						/>
					</View>
					<View>
						{/* Add Friends */}
						<Text style={styles.text}>Adicionar amigos</Text>
					</View>
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 10,
		marginLeft: 50,
		marginRight: 50
	},

	formButton: {
		backgroundColor: 'white',
		height: 55,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 35,
		marginHorizontal: 20,
		marginVertical: 10,
		borderWidth: 1,
		borderColor: 'white',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},

	text: {
		fontSize: 30,
		color: '#9DE89C'
	},
	tinyLogo: {
		width: 50,
		height: 50,
		marginRight: 10
	}
});

export default AddFriendButton;
