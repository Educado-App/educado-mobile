import React, { useEffect, useState } from 'react';
import {
	View,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import ProfileName from '../../components/profile/profileName';
import LogOutButton from '../../components/profile/LogOutButton';
import SettingsButton from '../../components/profile/settingsButton.js';
import { BgLinearGradient } from '../../constants/BgLinearGradient';
import { getUserInfo } from '../../services/StorageService';


export default function ProfileComponent() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');


	const getProfile = async () => {
		try {
			const fetchedProfile = await getUserInfo();

			if (fetchedProfile !== null) {
				setFirstName(fetchedProfile.firstName); 
				setLastName(fetchedProfile.lastName);

			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getProfile();
	}, []);
  
	return (
		<BgLinearGradient>
			<SafeAreaView>
				<ScrollView>
					<View className="flex-1 flex-col justify-center h-screen">
						<ProfileName Name={`${firstName} ${lastName}`}></ProfileName>
						<SettingsButton></SettingsButton>
						<LogOutButton testID='logoutBtn'></LogOutButton>
					</View>
				</ScrollView>
			</SafeAreaView>
		</BgLinearGradient>
	);
}