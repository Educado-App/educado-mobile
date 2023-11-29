import React, { useRef } from 'react';
import { DrawerLayoutAndroid, StyleSheet, View } from 'react-native';
import CourseProgress from './CourseProgress';
import CourseTitleIcon from './CourseTitleIcon';
import Text from '../../general/Text';

import { Icon } from '@rneui/themed'; // Checkout all supported icons https://oblador.github.io/react-native-vector-icons/
const color = '#006622';
const type = 'material-community';
const name = 'cash';

export default function CourseMenu() {
	const drawer = useRef(null);

	const navigationView = () => (
		<View style={[styles.navigationContainer, styles.container]}>
			<View style={styles.closeButton}>
				<Icon
					size={45}
					name="close"
					type="material-community"
					color="black"
					onPress={() => drawer.current.closeDrawer()}
				/>
			</View>
			<View style={styles.container2}>
				<View style={styles.menuItems}>
					<Icon size={45} name="home" type="material-community" color="black" />
					{/* Home */}
					<Text style={styles.menuText}>Casa</Text>
				</View>
				<View style={styles.menuItems}>
					<Icon
						size={45}
						name="account-circle"
						type="material-community"
						color="black"
					/>
					{/* Profile */}
					<Text style={styles.menuText}>Perfil</Text>
				</View>
			</View>
		</View>
	);

	return (
		<View style={styles.container3}>
			<DrawerLayoutAndroid
				ref={drawer}
				drawerWidth={300}
				drawerPosition={'left'}
				renderNavigationView={navigationView}
			>
				<View
					style={{
						flexDirection: 'row',
						paddingTop: '10%'
					}}
				>
					<Icon
						style={{ left: '20%' }}
						size={50}
						name="menu"
						type="material-community"
						color="black"
						onPress={() => drawer.current.openDrawer()}
					/>
					<CourseTitleIcon
						color={color}
						name={name}
						type={type}
						title={'Personal Finance'}
					></CourseTitleIcon>
				</View>
				<CourseProgress fracTop={45} fracBot={100}></CourseProgress>
			</DrawerLayoutAndroid>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	container3: {
		flex: 1,
		alignContent: 'center',
		justifyContent: 'center'
	},
	container2: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	navigationContainer: {
		backgroundColor: '#ecf0f1'
	},
	paragraph: {
		padding: 16,
		fontSize: 15,
		textAlign: 'center'
	},
	closeButton: {
		left: '40%',
		paddingTop: '5%'
	},
	menuItems: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: '10%'
	},
	menuText: {
		fontSize: 35
	}
});
