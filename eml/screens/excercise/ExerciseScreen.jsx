import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import Text from '../../components/general/Text';
import { RadioButton } from "react-native-paper";
import ExerciseInfo from "../../components/exercise/ExerciseInfo";
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import PopUp from '../../components/gamification/PopUp';
import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import { getLoginToken, getUserInfo } from '../../services/StorageService';

export default function ExerciseScreen({ exerciseObject, sectionObject, courseObject, onContinue }) {
  const tailwindConfig = require('../../tailwind.config.js');
  const projectColors = tailwindConfig.theme.colors;

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

  async function retrieveUserInfoAndLoginToken() {
    try {
      // Retrieve the user info object and parse it from JSON
      const userInfoString = await getUserInfo();
      const userInfo = JSON.parse(userInfoString);
      const loginToken = await getLoginToken();

      return { userInfo, loginToken };
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving data:', error);
    }
  }

  async function handleReviewAnswer(selectedAnswer) {
    const continueText = 'Continuar';
    //const { userInfo, loginToken } = await retrieveUserInfoAndLoginToken();

    setIsCorrectAnswer(selectedAnswer);

    setButtonClassName(
      `bg-project${selectedAnswer ? 'Green' : 'Red'}`
    );


    // if (selectedAnswer) {
    //   setPoints(await givePoints(userInfo, exerciseObject._id, true, 10, loginToken));
    // } else {
    //   setPoints(await givePoints(userInfo, exerciseObject._id, false, 0, loginToken));
    // }

    setShowFeedback(true);
    setButtonText(continueText);
    if (buttonText !== continueText) {
      setIsPopUpVisible(true);
    } else {
      setIsPopUpVisible(false);
      if (onContinue()) {
        console.log('Continue to section complete screen');
        // TODO: navigate to section complete screen
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
                    color={projectColors.primary}
                    uncheckedColor={projectColors.primary}
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
            className={`${selectedAnswer !== null ? 'opacity-100' : 'opacity-30'} bg-primary px-10 py-4 rounded-medium`}
            onPress={() => handleReviewAnswer(exerciseObject.answers[selectedAnswer].correct)}
          >
            <Text className='text-center font-sans-bold text-body text-projectWhite'>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    

    {isPopUpVisible ? (
      <PopUp pointAmount={points} isCorrectAnswer={isCorrectAnswer} />
    ) : null}

    {<ExerciseInfo courseId={courseObject.title} sectionId={sectionObject.title} />}
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

