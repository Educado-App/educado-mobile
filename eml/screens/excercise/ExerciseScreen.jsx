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

export default function ExerciseScreen({ exerciseObject, sectionObject, courseObject, onContinue }) {
	const tailwindConfig = require('../../tailwind.config.js');
	const projectColors = tailwindConfig.theme.colors;
	const navigation = useNavigation();

	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [buttonClassName, setButtonClassName] = useState('');
	const [showFeedback, setShowFeedback] = useState(false);
	const [buttonText, setButtonText] = useState('Confirmar Resposta'); 
	const [isPopUpVisible, setIsPopUpVisible] = useState(false); 
	const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
	const [points, setPoints] = useState(10);

	const handleAnswerSelect = (answerIndex) => {
		setSelectedAnswer(answerIndex);
	};
  
	async function handleReviewAnswer(selectedAnswer) {
		const continueText = 'Continuar';

		setIsCorrectAnswer(selectedAnswer);

		setButtonClassName(
			`bg-project${selectedAnswer ? 'Green' : 'Red'}`
		);

		setShowFeedback(true);
		setButtonText(continueText);
		if (buttonText !== continueText) {
			const obj = await completeComponent(exerciseObject, courseObject.courseId, selectedAnswer);
			setPoints(obj.points);
			setIsPopUpVisible(true);
		} else {
			setIsPopUpVisible(false);
			if (onContinue()) {
				handleLastComponent(exerciseObject, courseObject, navigation);
			}
		}
	}
  

	return (
		<SafeAreaView className="h-full bg-secondary">

			<View className='items-center'>
				<Text testID='exerciseQuestion'
					className='pt-20 pb-10 text-center text-body font-sans-bold text-projectBlack w-11/12'>
					{exerciseObject.question}
				</Text>

				<View className={`${buttonClassName} items-center justify-center h-96 w-full`}>
					<ScrollView className="py-2">
						{/* Map through the answers and render each one */}
						{exerciseObject.answers.map((answer, index) => (
							<View
								key={index}
								className='flex-row w-96 pb-6 pl-2'
							>
								<View>
									<RadioButton.Android
										disabled={showFeedback}
										value={index}
										status={
											selectedAnswer === index ? 'checked' : 'unchecked'
										}
										onPress={() => handleAnswerSelect(index)}
										color={projectColors.primary_custom}
										uncheckedColor={projectColors.primary_custom}
									/>
								</View>

								<View>
									<TouchableOpacity onPress={() => handleAnswerSelect(index)} disabled={showFeedback}>
										<Text className='pt-2 pb-1 w-72 font-montserrat text-body text-projectBlack'>{answer.text}</Text>
									</TouchableOpacity>

									{showFeedback ? (
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
					<TouchableOpacity
						disabled={selectedAnswer === null ? true : false}
						className={`${selectedAnswer !== null ? 'opacity-100' : 'opacity-30'} bg-primary_custom px-10 py-4 rounded-medium`}
						onPress={() => handleReviewAnswer(exerciseObject.answers[selectedAnswer].correct)}
					>
						<Text className='text-center font-sans-bold text-body text-projectWhite'>{buttonText}</Text>
					</TouchableOpacity>
				</View>
			</View>
    

			{isPopUpVisible ? (
				<PopUp pointAmount={points} isCorrectAnswer={isCorrectAnswer} />
			) : null}

			{<ExerciseInfo courseTitle={courseObject.title} sectionTitle={sectionObject.title} />}
			<StatusBar style='auto' />
		</SafeAreaView>
	);
}

ExerciseScreen.propTypes = {
	exerciseObject: PropTypes.object,
	sectionObject: PropTypes.object,
	courseObject: PropTypes.object,
	onContinue: PropTypes.func,
};

/*
async function getExercise() {
  const exercise = await StorageService.getNextExercise(sectionId);

  if (exercise !== null) {
    console.log(exercise);

    if (exercise === true) {
      navigation.navigate("SectionComplete", {
        courseId: courseId,
        sectionId: sectionId,
      });
    } else {
      setExerciseData(exercise);
    }
  } else {
    navigation.navigate("ErrorScreen");
  }
}*/

/*async function isSectionComplete(courseId, sectionId) {
const course = await StorageService.getCourseById(courseId);
const sections = course.sections;

for (let i = 0; i < sections.length; i++) {
  console.log("Section is complete: ", sections[i].isComplete);
  if (sections[i].id === sectionId) {
    return sections[i].isComplete;
  }
}
}

async function getExercise() {
  // Instead of calling StorageService.getNextExercise, use the dummy data
  const exercise = dummyExerciseData;

  if (exercise !== null) {
    const courseId = exercise.courseId || "defaultCourseId";
    const sectionId = exercise.sectionId || "defaultSectionId";

    if (exercise === true) {
        navigation.navigate("SectionComplete", {
        courseId: courseId,
        sectionId: sectionId,
      });
    } else {
      setExerciseData(exercise);
    }
  } else {
    navigation.navigate("ErrorScreen");
  }
}
*/

