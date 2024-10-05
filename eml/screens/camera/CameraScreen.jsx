import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Camera as CameraIcon, SwitchCamera, Check, X, Image as ImageIcon } from 'lucide-react-native';
import { getStudentInfo, updateStudentInfo } from '../../services/StorageService';
import { uploadPhoto } from '../../api/userApi';
import BackButton from '../../components/general/BackButton';
import { getLoginToken } from '../../services/StorageService';
import { getBucketImage } from '../../api/api';

const CameraScreen = () => {
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [capturedImage, setCapturedImage] = useState(null);
	const cameraRef = useRef(null);
	const navigation = useNavigation();
	const screenWidth = Dimensions.get('window').width;

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
			setHasPermission(status === 'granted' && galleryStatus.status === 'granted');
		})();
	}, []);

	const takePicture = async () => {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync();
			setCapturedImage(photo);
		}
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.cancelled) {
			setCapturedImage(result);
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
		profile.photo = capturedImage.uri; // Temporarily set photo to local uri
		await updateStudentInfo(profile);
		navigation.navigate('EditProfile');
		try {
			await uploadPhoto(profile.baseUser, capturedImage.uri, await getLoginToken()).then(async (res) => {
				let photo = await getBucketImage(res.profilePhoto);
				profile.photo = photo;
				await updateStudentInfo(profile);
			});
		} catch (e) {
			console.log(e);
		}
	};

	const handleDeny = () => {
		setCapturedImage(null);
	};

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <View className="flex-1 justify-center items-center bg-gray-900">
			<Text className="text-white text-lg">No access to camera or gallery</Text>
		</View>;
	}

	if (capturedImage) {
		return (
			<View className="flex-1 bg-black">
				<View className="absolute top-12 left-4">
					<BackButton onPress={() => navigation.navigate('EditProfile')} />
				</View>
				<View className="flex-1 justify-center items-center">
					<Image
						source={{ uri: capturedImage.uri }}
						style={{
							width: screenWidth,
							height: screenWidth,
							resizeMode: 'cover'
						}}
					/>
				</View>
				<View className="absolute bottom-4 left-10 right-10 flex-row justify-around items-center p-4">
					<TouchableOpacity onPress={handleDeny} className="bg-error rounded-full p-3">
						<X size={24} className="text-projectWhite"/>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleAccept} className="bg-success rounded-full p-3">
						<Check size={24} className="text-projectWhite"/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-projectGray">
			<Camera className="flex-1" type={type} ref={cameraRef}>
				<View className="mx-4 mt-12 mb-6">
					<BackButton onPress={() => navigation.navigate('EditProfile')} />
				</View>
				<View className="flex-1 bg-transparent justify-end items-center pb-10">
					<View className="flex-row justify-around items-center w-full px-4">
						<TouchableOpacity onPress={pickImage} className="bg-projectGray rounded-full p-3">
							<ImageIcon size={24} color="white" />
						</TouchableOpacity>
						<TouchableOpacity onPress={takePicture} className="bg-lightGray rounded-full p-4">
							<CameraIcon size={32} color="black" />
						</TouchableOpacity>
						<TouchableOpacity onPress={toggleCameraType} className="bg-projectGray rounded-full p-3">
							<SwitchCamera size={24} color="white" />
						</TouchableOpacity>
					</View>
				</View>
			</Camera>
		</View>
	);
};

export default CameraScreen;