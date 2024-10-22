import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import Text from '../../components/general/Text';
import { RadioButton } from 'react-native-paper';
import ExerciseInfo from '../../components/exercise/ExerciseInfo';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import PopUp from '../../components/gamification/PopUp';
import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import { completeComponent, handleLastComponent } from '../../services/utilityFunctions';
import { useNavigation } from '@react-navigation/native';
import StandardButton from '../../components/general/StandardButton';


/*
Description: 	This screen is displayed when the student is doing an exercise.
				It displays the question and the answers, and the student can select one answer.
				When the student presses the confirm button, the answer is checked and the student is given feedback.
				When the student presses the continue button, the next component is displayed.
				The student can only continue if an answer is selected.
				The student is given 10 points when the answer is correct in the first try,
				otherwise the student gets 5 points when the answer is correct.
				The student gets 0 points when the answer is incorrect or they have completed the exercise before.
Dependencies: 	CompSwipeScreen, the screen which contains all the components in the section
Props:			- exerciseObject: The exercise object, which contains the question and the answers
				- sectionObject: The section object, which contains the section title
				- courseObject: The course object, which contains the course title
				- onContinue: A function that is called when the student presses the continue button,
				when the exercise is completed and it is the last component in the section, the student is taken to the section complete screen
*/


export default function ExerciseScreen({ componentList, exerciseObject, sectionObject, courseObject, onContinue, onReturn }) {
	const tailwindConfig = require('../../tailwind.config.js');
	const projectColors = tailwindConfig.theme.colors;
	const navigation = useNavigation();

	// Using arrays to track state per component
	const [selectedAnswers, setSelectedAnswers] = useState(Array(componentList.length).fill(null));
	const [buttonTexts, setButtonTexts] = useState(Array(componentList.length).fill(null));
	const [showFeedbacks, setShowFeedbacks] = useState(Array(componentList.length).fill(false));
	const [attempts, setAttempts] = useState(Array(componentList.length).fill(0));
	const [isPopUpVisible, setIsPopUpVisible] = useState(false);
	const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
	const [points, setPoints] = useState(10);

	const currentIndex = componentList.findIndex(component => component.component._id === exerciseObject._id);


	async function handleReviewAnswer(isAnswerCorrect, answerIndex) {
		const newSelectedAnswers = [...selectedAnswers];
		newSelectedAnswers[currentIndex] = answerIndex;
		setSelectedAnswers(newSelectedAnswers);

		if (buttonTexts[currentIndex] === null) {
			const newButtonTexts = [...buttonTexts];
			newButtonTexts[currentIndex] = 'Continuar';
			setButtonTexts(newButtonTexts);

			const newShowFeedbacks = [...showFeedbacks];
			newShowFeedbacks[currentIndex] = true;
			setShowFeedbacks(newShowFeedbacks);

			if (isAnswerCorrect) {
				setIsCorrectAnswer(true);
				setPoints(attempts[currentIndex] === 0 ? 10 : 5);
				setIsPopUpVisible(true);
			} else {
				setIsCorrectAnswer(false);
				const newAttempts = [...attempts];
				newAttempts[currentIndex]++;
				setAttempts(newAttempts);
			}
		}

		if (buttonTexts[currentIndex] === 'Continuar') {
			setIsPopUpVisible(false);

			const currentLastComponent = componentList[componentList.length - 1];
			const isLastComponent = currentLastComponent.component._id === exerciseObject._id;

			if (isAnswerCorrect && isLastComponent) {
				try {
					await completeComponent(exerciseObject, courseObject.courseId, true);
				} catch (error) {
					throw new Error('Error completing course');
				}

				handleLastComponent(exerciseObject, courseObject, navigation);
			} else {
				// Reset state for the current component
				newSelectedAnswers[currentIndex] = null;
				setSelectedAnswers(newSelectedAnswers);

				const newButtonTexts = [...buttonTexts];
				newButtonTexts[currentIndex] = null;
				setButtonTexts(newButtonTexts);

				const newShowFeedbacks = [...showFeedbacks];
				newShowFeedbacks[currentIndex] = false;
				setShowFeedbacks(newShowFeedbacks);

				const newAttempts = [...attempts];
				newAttempts[currentIndex] = 0;
				setAttempts(newAttempts);

				onContinue(isAnswerCorrect);
			}
		}

	}

	function handleReturn() {

		onReturn(currentIndex - 1);

		// Reset state for the current and subsequent components
		const newSelectedAnswers = [...selectedAnswers];
		const newButtonTexts = [...buttonTexts];
		const newShowFeedbacks = [...showFeedbacks];
		const newAttempts = [...attempts];

		for (let i = currentIndex; i < componentList.length; i++) {
			newSelectedAnswers[i] = null;
			newButtonTexts[i] = null;
			newShowFeedbacks[i] = false;
			newAttempts[i] = 0;
		}

		setSelectedAnswers(newSelectedAnswers);
		setButtonTexts(newButtonTexts);
		setShowFeedbacks(newShowFeedbacks);
		setAttempts(newAttempts);

	}

	return (
		<SafeAreaView className="h-full bg-secondary">
			<View className='items-center'>
                <View className="mt-20">
                			<ExerciseInfo courseTitle={courseObject.title} sectionTitle={sectionObject.title} />
                			</View>
				<Text testID='exerciseQuestion'
					className='pt-0 pb-5 text-center text-body font-sans-bold text-projectBlack w-11/12'>
					{exerciseObject.question}
				</Text>

				<View className={`items-center justify-center h-96 w-full`}>
					<ScrollView className="py-2">
						{exerciseObject.answers.map((answer, index) => (
							<View key={index} className='flex-row w-96 pb-6 pl-2'>
								<View>
									<RadioButton.Android
										disabled={buttonTexts[currentIndex] === 'Continuar'}
										value={index}
										status={
											selectedAnswers[currentIndex] === index ? 'checked' : 'unchecked'
										}
										onPress={() => handleReviewAnswer(exerciseObject.answers[selectedAnswers[currentIndex]]?.correct, index)}
										color={projectColors.primary_custom}
										uncheckedColor={projectColors.primary_custom}
									/>
								</View>

								<View>
									<TouchableOpacity disabled={buttonTexts[currentIndex] === 'Continuar'}>
										<Text className='pt-2 pb-1 w-72 font-montserrat font-bold text-body text-projectBlack'>{answer.text}</Text>
									</TouchableOpacity>

									{showFeedbacks[currentIndex] && selectedAnswers[currentIndex] === index ? (
										<View className={`flex-row pb-2 w-fit rounded-medium ${answer.correct ? 'bg-projectGreen' : 'bg-projectRed'}`}>
											<View className='pl-2 pt-1'>
												<View className='pt-1.5'>
													{answer.correct === true ? (
														<Icon
															size={10}
															name='check'
															type='material'
															color={projectColors.success}
														/>
													) : (
														<Icon
															size={10}
															name='close'
															type='material'
															color={projectColors.error}
														/>
													)}
												</View>
											</View>
											<Text className={`w-72 pl-1 pt-2 pr-2 text-caption-medium ${answer.correct ? 'text-success' : 'text-error'}`}>{answer.feedback}</Text>
										</View>
									) : null}
								</View>
							</View>
						))}
					</ScrollView>
				</View>

				<View className='px-6 pt-10 w-screen'>
{selectedAnswers[currentIndex] !== null && (
    <StandardButton
        props={{
            buttonText: buttonTexts[currentIndex],
            onPress: () => handleReviewAnswer(exerciseObject.answers[selectedAnswers[currentIndex]]?.correct, 8),
            disabled: selectedAnswers[currentIndex] === null,
        }}
    />
)}



				</View>

				{currentIndex > 0 && (
					<View className='px-6 pt-5 w-screen'>
						<StandardButton
							props={{
								buttonText: 'Return',
								onPress: handleReturn,
							}}
						/>
					</View>
				)}
			</View>

			{isPopUpVisible ? (
				<PopUp pointAmount={points} isCorrectAnswer={isCorrectAnswer} />
			) : null}


			<StatusBar style='auto' />
		</SafeAreaView>
	);
}

ExerciseScreen.propTypes = {
	exerciseObject: PropTypes.object,
	sectionObject: PropTypes.object,
	courseObject: PropTypes.object,
	onContinue: PropTypes.func,
	componentList: PropTypes.array,
	onReturn: PropTypes.func,
};
