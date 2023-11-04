import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Text from '../../components/general/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import StandardButton from '../../components/general/StandardButton';
import { useNavigation } from '@react-navigation/native';
import AnimatedNumbers from '../../components/gamification/AnimatedNumber';
import { generateSectionCompletePhrases } from '../../constants/Phrases';

export default function CompleteSectionScreen() {
	const [points, setPoints] = useState(0);
	const [extraPoints, setExtraPoints] = useState(0);
	//const [totalPointsText, setTotalPointsText] = useState('Pontos');
	const navigation = useNavigation();
	const [randomPhrase, setRandomPhrase] = useState('');

  const pointsFinal = 50;
	const extraPointsFinal = 20;

	const getRandomPhrase = () => {
		let randomIndex = 0;
		const phrases = generateSectionCompletePhrases();
	
		randomIndex = Math.floor(Math.random() * phrases.length);
		let randomPhrase = phrases[randomIndex];
		
		return randomPhrase;
	};

	function animation(state, setState, finalValue) {
		return new Promise((resolve) => {
			if (state < finalValue) {
				const interval = setInterval(() => {
					setState((prevNumber) => {
						const nextNumber = prevNumber + 1;
						if (nextNumber >= finalValue) {
							clearInterval(interval);
							resolve(finalValue);
							return finalValue;
						}
						return nextNumber;
					});
				});
			} else {
				resolve(finalValue);
			}
		});
	}

	// function totalPointsAnimation(points, pointsFinal) {
	// 	setTotalPointsText('Pontos na seção');
	// 	return new Promise((resolve) => {
	// 		if (points < pointsFinal) {
	// 			const interval = setInterval(() => {
	// 				setPoints((prevNumber) => {
	// 					const nextNumber = prevNumber + 5;
	// 					if (nextNumber >= pointsFinal) {
	// 						clearInterval(interval);
	// 						resolve(pointsFinal); // Resolve the promise when the animation is finished
	// 						return pointsFinal;
	// 					}
	// 					return nextNumber;
	// 				});
	// 			}, 50); // Adjust the interval for the desired animation speed
	// 		} else {
	// 			resolve(pointsFinal); // If points >= pointsFinal, resolve the promise immediately
	// 		}
	// 	});
	// }

	function pointBox(text, points, color, duration) {
		return (
			<View className={`h-24 w-40 ${'green' === color ? 'bg-success' : 'bg-yellow'} rounded-lg items-center justify-between px-2 pb-2 shadow shadow-projectGray`}>
				<View className="w-full h-2/5 justify-center">
					<Text className="text-projectWhite text-base font-sans-bold text-center capitalize">		
						{text}
					</Text>
				</View>
				<View className="bg-projectWhite w-full h-3/5 rounded justify-center items-center">
					<AnimatedNumbers
						animateToNumber={points}
						animationDuration={duration}
						fontStyle={`text-2xl font-sans-bold ${'green' === color ? 'text-success' : 'text-yellow'} text-center`}
					/>
				</View>
			</View>
		)
	}

	
  useEffect(() => {
		async function animations() {
			await animation(points, setPoints, pointsFinal);
			
			setTimeout(async () => {
				await animation(extraPoints, setExtraPoints, extraPointsFinal);
				// await totalPointsAnimation(points, pointsFinal + extraPointsFinal);
			}, 750);
		}

		setRandomPhrase(getRandomPhrase());
		animations();
  }, []);

  return (
    <SafeAreaView className="flex flex-col justify-center items-center bg-secondary h-screen w-screen">
				<LottieView 
					className="z-10 absolute top-0 w-full"
					source={require('../../assets/animations/completeSection.json')} 
					autoPlay
				/>
				<View className="absolute bottom-0 px-6 w-full z-20 items-center justify-end h-3/4">
					<View className="w-fit h-40 justify-center mb-8">
						<Text className="text-center text-3xl font-sans-bold text-primary bg-secondary">
						{randomPhrase}
						</Text>
					</View>

					<View className="flex flex-row justify-between w-full mb-20">
						{pointBox('Pontos', points, 'yellow', 750)}
						{pointBox('Pontos Extras', extraPoints, 'green', 750)}
					</View>

					<View className="w-full mb-20"> 
						<StandardButton
							props={{
								buttonText: "Continuar",
								onPress: () => {navigation.navigate('Section')}
							}}
						/>
					</View>
				</View>


			
    </SafeAreaView>
  );
};