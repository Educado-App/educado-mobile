import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Text from '../../components/general/Text';
import CustomProgressBar from "../../components/exercise/Progressbar";
import { RadioButton } from "react-native-paper";
import ExerciseInfo from "../../components/exercise/ExerciseInfo";
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import PopUp from '../../components/gamification/PopUp';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getExerciseByid } from '../../api/api';

/**
 * Exercise screen component for displaying and handling exercises in a course.
 * @module ExerciseScreen
 * @param {string} givenId - The ID of the exercise (default: '65181a4f4c78b45368126ed7').
 * @returns {JSX.Element} React component for the exercise screen.
 */
// givenId is used for testing purposes, in the future an exercise object should be passed by the previous screen

export default function ExerciseScreen({ givenId = '65181a4f4c78b45368126ed8' }) {

  const xp = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Replace with intricate point system

  const navigation = useNavigation();
  const route = useRoute();
  const tailwindConfig = require('../../tailwind.config.js');
  const projectColors = tailwindConfig.theme.colors;

  const [hasData, setHasData] = useState(false);
  const [exerciseData, setExerciseData] = useState({});
  const [sectionData, setSectionData] = useState({});
  const [courseData, setCourseData] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [buttonClassName, setButtonClassName] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [buttonText, setButtonText] = useState("Confirmar Resposta"); // Used to change the text of a button
  const [isPopUpVisible, setIsPopUpVisible] = useState(false); // Used to render the pop up
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  function handleSecondOnclick() {
    navigation.navigate('Lecture', {
      sectionId: '6540ffe3536b2b37a494582a', // hardcoded for testing
      courseId: '6540ffd7536b2b37a494581c', // hardcoded for testing
    });
  }
  function handleReviewAnswer(selectedAnswer) {
    const continueText = "Continuar";
    setIsCorrectAnswer(selectedAnswer);

    setButtonClassName(
      `bg-project${selectedAnswer ? 'Green' : 'Red'}`
    );

    setShowFeedback(true);
    setButtonText(continueText);

    if (!buttonClicked) {
      setButtonClicked(true);
      setIsPopUpVisible(true);  
    } else {
      handleSecondOnclick();
    }
  }
  const fetchData = async () => {
    /* This is how the fetch data should look like,
     * however, it is commented out as the API functions are not correctly implemented yet.
     * They should be called through storage service, not directly.
     * Title and other data should be set in storage service as well.
     * For now, dummy data is used instead.
     */

    const exercise = await getExerciseByid(givenId);
    setExerciseData(exercise);

    setSectionData.title = 'Section 1 test';
    setCourseData.title = 'Course 1 test';
    setHasData(true);

    /*
    const exercise = await getExerciseByid(givenId);
    if (exercise !== null) {
      setExerciseData(exercise);
      setHasData(true);
    } else {

      setHasData(false);
      navigation.navigate('ErrorScreen');
    }

    const section = await getSectionByid(exercise.parentSection);
    if (section !== null) {
      setSectionData(section);
      setHasData(true);
    } else {
      setHasData(false);
      navigation.navigate('ErrorScreen');
    }

    const course = await getCourse(section.parentCourse);
    if (course !== null) {
      setCourseData(course);
      setHasData(true);
    } else {
      setHasData(false);
      navigation.navigate('ErrorScreen');
    }

    */

  };

  useEffect(() => {
    fetchData();
  }, [route.params]);


  return (
    <SafeAreaView className="h-screen bg-secondary">
      <View className='flex-row items-center justify-around top-0'>
        {/* Back Button */}
        <TouchableOpacity className="pr-3" onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={25} color="black" />
        </TouchableOpacity>
        <CustomProgressBar progress={50} width={65} height={1.2}></CustomProgressBar>
      </View>

      {hasData === false ? (
        // No data
        <Text>Sem dados</Text>
      ) : (
        <View className='items-center'>
          <Text testID='exerciseQuestion'
            className='pt-6 pb-10 text-center text-body font-sans-bold text-projectBlack w-11/12'>
            {exerciseData.description}
          </Text>

          <View className={`${buttonClassName} items-center justify-center h-96 w-full`}>
            <ScrollView className="py-2">
              {/* Map through the answers and render each one */}
              {exerciseData.answers.map((answer, index) => (
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
                      <View className={`flex-row pb-2 w-fit rounded-medium ${answer.isCorrect ? 'bg-projectGreen' : 'bg-projectRed'}`}>
                        <View className='pl-2 pt-1'>
                          <View className='pt-1.5'>
                            {answer.isCorrect === true ? (
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
                        <Text className={`w-72 pl-1 pt-2 pr-2 text-caption-medium ${answer.isCorrect ? 'text-success' : 'text-error'}`}>{answer.feedback}</Text>
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
              onPress={() => handleReviewAnswer(exerciseData.answers[selectedAnswer].isCorrect)}
            >
              <Text className='text-center font-sans-bold text-body text-projectWhite'>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {isPopUpVisible ? (
        <PopUp xpAmount={xp} isCorrectAnswer={isCorrectAnswer} />
      ) : null}

      <ExerciseInfo courseId={courseData.title} sectionId={sectionData.title} />
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

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
