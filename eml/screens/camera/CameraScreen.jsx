import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { Camera as CameraIcon, SwitchCamera, Check, X } from 'lucide-react-native';
import { getStudentInfo, updateStudentInfo } from '../../services/StorageService';
import { uploadPhoto } from '../../api/userApi';

const CameraScreen = () => {
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [capturedImage, setCapturedImage] = useState(null);
	const cameraRef = useRef(null);
	const navigation = useNavigation();

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const takePicture = async () => {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync();
			setCapturedImage(photo);
		}
	};

	const toggleCameraType = () => {
		setType(
			type === Camera.Constants.Type.back
				? Camera.Constants.Type.front
				: Camera.Constants.Type.back
		);
	};

	const handleAccept = async () => {
		let profile = await getStudentInfo();
		profile.profilePhoto = capturedImage.uri;
		await updateStudentInfo(profile);
		navigation.navigate('EditProfile');
		let photo = await uploadPhoto(capturedImage.uri);
		profile.photo = photo;
		await updateStudentInfo(profile);
	};

	const handleDeny = () => {
		setCapturedImage(null);
	};

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <View className="flex-1 justify-center items-center bg-gray-900">
			<Text className="text-white text-lg">No access to camera</Text>
		</View>;
	}

	if (capturedImage) {
		return (
			<View className="flex-1">
				<Image
					source={{ uri: capturedImage.uri }}
					className="flex-1"
				/>
				<View className="flex-row justify-around items-center p-4 bg-projectWhite">
					<TouchableOpacity onPress={handleDeny} className="bg-error rounded-full p-3">
						<X size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity onPress={handleAccept} className="bg-success rounded-full p-3">
						<Check size={24} color="white" />
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-gray-900">
			<Camera className="flex-1" type={type} ref={cameraRef}>
				<View className="flex-1 bg-transparent justify-end items-center pb-10">
					<View className="flex-row justify-around items-center w-full px-4">
						<TouchableOpacity onPress={toggleCameraType} className="bg-projectGray rounded-full p-3">
							<SwitchCamera size={24} color="white" />
						</TouchableOpacity>
						<TouchableOpacity onPress={takePicture} className="bg-lightGray rounded-full p-4">
							<CameraIcon size={32} color="black" />
						</TouchableOpacity>
					</View>
				</View>
			</Camera>
		</View>
	);
};

export default CameraScreen;