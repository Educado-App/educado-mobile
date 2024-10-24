import React, { useEffect, useState, useRef } from 'react';
import { Animated, Text, Easing, View, Pressable, Image  } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NetworkStatusObserver from '../../hooks/NetworkStatusObserver';
import { useNavigation } from '@react-navigation/native';


/**
 * A banner component that shows an offline notification.
 * It checks periodically for backend connectivity and displays a banner if the backend is not reachable.
 * @returns {JSX.Element} - The rendered component.
 */
export default function OfflineScreen() {
	const [isOnline, setIsOnline] = useState(false);
	const translateY = useRef(new Animated.Value(-100)).current;
	const navigation = useNavigation();

	useEffect(() => {
		Animated.timing(translateY, {
			toValue: isOnline ? -100 : 0, // Slide in or out
			duration: 1000,
			easing: Easing.cubic,
			useNativeDriver: true,
		}).start();
	}, [isOnline, translateY]);

	return (
		<>
			<NetworkStatusObserver setIsOnline={setIsOnline} />
				<View className="justify-center px-1 pt-6">
					<View className="mb-20 mt-6 self-center">
						<Image 
							source={require('../../assets/images/logo.png')}
							className="w-[175.88] h-[25.54]"
							/>
					</View>
					<MaterialCommunityIcons name="wifi-off" size={160} color="black" style={{ alignSelf: 'center' }} />
					<Text className="text-center font-montserrat-semi-bold text-[24px]">
						{'\n'}Sem conexão com internet.
					</Text>
					<View className="flex-row flex-wrap justify-center">
						<Text className="text-center text-body">
							{/* You are offline. Connect to the internet to explore the courses. */}
							{'\n'}Você está sem acesso a internet. Vá para
						</Text>
						<View className="flex-row flex-wrap justify-center">
							<Text className="text-center text-body font-montserrat-bold">
								meus cursos
							</Text>
							<Text className="text-center text-body">
								e acesse os cursos baixados.{'\n'}
							</Text>
						</View>
					</View>
					<View className="items-center pt-6">
						<Pressable
							testID={'offlineExploreButton'}
							className="rounded-r-8 rounded-md bg-primary_custom justify-center items-center p-2 h-14 w-80"
							onPress={() => 
								navigation.navigate('Download')}>
							{/* Click to explore courses */}
							<Text className="text-projectWhite font-sans-bold text-center text-body" >Acesse meus cursos baixados</Text>
						</Pressable>
					</View>
				</View>
		</>
	);
}