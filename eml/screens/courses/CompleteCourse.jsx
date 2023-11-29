import React, { useRef } from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { BgLinearGradient } from '../../constants/BgLinearGradient';
import CompleteCourseSlider from '../../components/courses/completeCourse/CompleteCourseSlider';
import Text from '../../components/general/Text.js';
import { useNavigation } from '@react-navigation/native';

export default function CompleteCourseScreen() {
	const completeCourseSliderRef = useRef(null);
	let currentSlide = 0;

	const courseObject = {
		id: '6540f668536b2b37a49457dc',
		title: 'Curso de Teste',
	};

	const navigation = useNavigation();

	const handleIndexChange = (index) => {
		currentSlide = index;
	};

	const handleNextSlide = () => {
		if (completeCourseSliderRef.current) {
			if (currentSlide === 2) {
				navigation.reset({
					index: 0,
					routes: [{ name: 'HomeStack' }],
				});
			} else {
				completeCourseSliderRef.current.scrollBy(1);
			}
		}
	};

	return (
		<BgLinearGradient>
			<SafeAreaView >
				<View className="justify-around items-center flex flex-col h-full w-full">
					<View className="flex w-screen h-5/6 justify-center items-center">
						<CompleteCourseSlider 
							onIndexChanged={handleIndexChange}
							ref={completeCourseSliderRef}  
							courseObject={courseObject}
						/>
					</View>

					<View className="px-6 w-screen">
						<TouchableOpacity className="bg-primary px-10 py-4 rounded-medium"
							onPress={() => {handleNextSlide();}}
						>
							<Text className="text-center font-sans-bold text-body text-projectWhite">Continuar</Text>
						</TouchableOpacity>
					</View>

				</View>
			</SafeAreaView>
		</BgLinearGradient>
	);
}

