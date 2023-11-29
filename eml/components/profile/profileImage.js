import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from '@rneui/themed';

const ProfileImage = () => {

	return (
		<View style={styles.container}>
			<Icon
				style={styles.icon}
				name="account-circle"
				type="material-community"
				color="#55747E"
				size={200}/> 
		</View>
	);
};
const styles = StyleSheet.create({
	icon: {

	},
	container: {
		justifyContent: 'center',
		marginBottom: 20
	}
});

export default ProfileImage;
