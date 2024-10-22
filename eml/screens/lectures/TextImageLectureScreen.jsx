import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Text from '../../components/general/Text';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import * as StorageService from '../../services/StorageService';
import { useNavigation } from '@react-navigation/native';
import StandardButton from '../../components/general/StandardButton';
import { completeComponent, handleLastComponent } from '../../services/utilityFunctions';

const TextImageLectureScreen = ({ lectureObject, courseObject, isLastSlide, onContinue, onReturn }) => {
	const [imageUrl, setImageUrl] = useState(null);
	const [paragraphs, setParagraphs] = useState(null);
	const navigation = useNavigation();

	const handleContinue = async () => {
		await completeComponent(lectureObject, courseObject.courseId, true);
		if (isLastSlide) {
			handleLastComponent(lectureObject, courseObject, navigation);
		} else {
			onContinue(); // Call onContinue to advance the slide
		}
	};

	const handleReturn = () => onReturn();

	useEffect(() => {
		if (lectureObject.image) {
			getLectureImage();
		}
		splitText(lectureObject.content);
	}, []);

	const getLectureImage = async () => {
		try {
			const imageRes = await StorageService.fetchLectureImage(lectureObject.image, lectureObject._id);
			setImageUrl(imageRes);
		} catch (err) {
			setImageUrl(null);
		}
	};

	//split text into paragraphs and don't cut words
	const splitText = (text) => {
		let _paragraphs = [];

		if (text.length < 250) {
			_paragraphs.push(text);
			setParagraphs(_paragraphs);
			return;
		}

		// Function to find the nearest space to break the string.
		const findBreakPoint = (str, start, direction = 1) => {
			let pos = start;
			while (pos > 0 && pos < str.length) {
				if (str[pos] === ' ') return pos;
				pos += direction;
			}
			return pos;
		};

		// If the text is less than 300 characters, then the first chunk should be the entire text.
		if (text.length <= 250) {
			_paragraphs.push(text);
		} else {
			// Find the nearest space to 300th character to break the string.
			const breakPoint1 = findBreakPoint(text, 250);
			_paragraphs.push(text.substring(0, breakPoint1));

			// Remaining text to be divided into 150 character chunks.
			let remainingText = text.substring(breakPoint1);

			while (remainingText.length > 0) {
				const breakPoint = findBreakPoint(remainingText, 100);
				const chunk = remainingText.substring(0, breakPoint);
				_paragraphs.push(chunk);
				remainingText = remainingText.substring(breakPoint);
			}
		}

		// Now, `_paragraphs` contains the split text.
		setParagraphs(_paragraphs);
	};

	return (
		<View className={'absolute w-full h-full px-4'}>
			{/* Course and Lecture Name in the center */}
			<View className="flex-col w-full items-center mt-24">
				<Text className="text-projectGray">Nome do curso: {courseObject.title}</Text>
				<Text className="text-xl font-bold text-projectBlack">{lectureObject.title}</Text>
			</View>

			{/* Content */}
			<Text className="text-center text-2xl font-bold">BEM VINDO!</Text>
			<ScrollView>
				{paragraphs &&
					paragraphs.map((paragraph, index) => {
						if (paragraphs.length <= 2 || index !== paragraphs.length - 1) {
							return (
								index === 0 ? (
									<Text key={index} className="text-lg pt-4 px-4 text-primary_custom">
										{paragraph}
									</Text>
								) : (
									<Text key={index} className="text-lg pt-4 px-4 text-projectGray">
										{paragraph}
									</Text>
								)
							);
						}
						return null;
					})}

				{/* Image */}
				{imageUrl && (
					<View className="w-full h-[25vh] px-4 pt-8">
						<Image source={{ uri: imageUrl }} className="w-full h-full" />
					</View>
				)}

				{paragraphs && paragraphs.length > 2 && (
					<Text className="text-[18px] px-4 text-projectGray">{paragraphs[paragraphs.length - 1]}</Text>
				)}
			</ScrollView>

			<View className="my-5">
				<StandardButton
					props={{
						buttonText: 'Continuar',
						onPress: handleContinue,
					}}
				/>
			</View>
            <View className="mb-20">
			<StandardButton
				props={{
					buttonText: 'Return',
					onPress: handleReturn,
				}}
			/>
			</View>
		</View>
	);
};

TextImageLectureScreen.propTypes = {
	lectureObject: PropTypes.object,
	courseObject: PropTypes.object,
	isLastSlide: PropTypes.bool,
	onContinue: PropTypes.func.isRequired,
};

export default TextImageLectureScreen;
