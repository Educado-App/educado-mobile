import React from 'react';
import {
	View,
	SafeAreaView,
	TouchableOpacity,
	Image,
} from 'react-native';
import ProfileImage from '../../components/profile/profileImage';
import { BgLinearGradient } from '../../constants/BgLinearGradient';
import ReturnButton from '../../components/profileSettings/returnButton';
import DeleteAccountButton from '../../components/profileSettings/deleteAccountButton';
import ChangeFirstNameButton from '../../components/profileSettings/changeFirstNameButton';
import ChangeLastNameButton from '../../components/profileSettings/changeLastNameButton';
import ChangeEmailButton from '../../components/profileSettings/changeEmailButton';

export default function ProfileComponent() {
  

	return (
		<BgLinearGradient>
			<SafeAreaView>
				<View className="justify-center items-center flex flex-col">

					<View className="flex p-10">
						<View className="flex-row items-start justify-start w-screen pl-6">
							<ReturnButton/>
							<Image
								className = "h-[25.54] w-[175.88]"
								source={require('../../assets/images/logo.png')}
							/>
						</View>
					</View>

					<View>
						<TouchableOpacity>
							<ProfileImage/>
						</TouchableOpacity>
					</View>

					<View className="flex flex-col gap-6 items-center px-6 w-screen mr-3">
						<View className="flex justify-center w-full">
							<ChangeFirstNameButton></ChangeFirstNameButton>
						</View>

						<View className="flex justify-center w-full">
							<ChangeLastNameButton></ChangeLastNameButton>
						</View>

						<View className="flex justify-center w-full">
							<ChangeEmailButton></ChangeEmailButton>
						</View>

						<View className="flex justify-center w-full">
							<DeleteAccountButton></DeleteAccountButton>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</BgLinearGradient>
	);
}  