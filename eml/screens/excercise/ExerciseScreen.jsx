import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import LeaveButton from '../../components/exercise/LeaveButton';
import { getUserInfo } from '../../services/StorageService';
import Text from '../../components/general/Text';
import CustomProgressBar from "../../components/exercise/Progressbar";
import dummyExerciseData from "./dummyExerciseData.json";
import { RadioButton } from "react-native-paper";
import ExerciseInfo from "../../components/exercise/ExerciseInfo";
import { ScreenWidth } from "@rneui/base";
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PopUp, XpPopUp } from '../../components/gamification/PopUp';
import { generateSuccessPhrases, generateEncouragementPhrases } from '../../constants/PopUpPhrases';
import * as StorageService from '../../services/StorageService';

export default function ExerciseScreen() {
  const xp = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

  const navigation = useNavigation();
  const route = useRoute();
  const screenHeight = Dimensions.get('window').height;
  const tailwindConfig = require('../../tailwind.config.js');
  const projectColors = tailwindConfig.theme.colors;

  const [hasData, setHasData] = useState(false);
  const [signal, setSignal] = useState([]);
  const [exerciseData, setExerciseData] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null); // State to store the selected answer
  const [buttonClassName, setButtonClassName] = useState(""); // Used to change color of a view
  const [showFeedback, setShowFeedback] = useState(false); // Used to render feedback
  const [buttonText, setButtonText] = useState("Confirmar Resposta"); // Used to change the text of a button
  const [isPopUpVisible, setIsPopUpVisible] = useState(false); // Used to render the pop up
  const [isXpPopUpVisible, setIsXpPopUpVisible] = useState(false); // Used to render the pop up
  const [randomPhrase, setRandomPhrase] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
  };

  /*async function getExercise() {
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
}*/

  async function getExercise() {
    // Instead of calling StorageService.getNextExercise, use the dummy data
    const exercise = dummyExerciseData;

    if (exercise !== null) {
      /* const courseId = exercise.courseId || "defaultCourseId";
      const sectionId = exercise.sectionId || "defaultSectionId";*/

      if (exercise === true) {
        /* navigation.navigate("SectionComplete", {
          courseId: courseId,
          sectionId: sectionId,
        });*/
      } else {
        setExerciseData(exercise);
      }
    } else {
      navigation.navigate("ErrorScreen");
    }
  }

  const getRandomPhrase = (answeredCorrectly) => {
    let randomMessage = '';
    let randomIndex = 0;

    const phrases = answeredCorrectly
      ? generateSuccessPhrases(firstName)
      : generateEncouragementPhrases(firstName);

    randomIndex = Math.floor(Math.random() * phrases.length);
    randomMessage = phrases[randomIndex];
    if (randomMessage.length > 69) {
      randomMessage = randomMessage.substring(0, 69) + "...";
    }

    setRandomPhrase(randomMessage);
  };

  // Update this function to look like handleAnswerSelect, looks better
  function handleReviewAnswer() {
    const selectedAnswerData = dummyExerciseData.answers[selectedAnswer - 1];
    const continueText = "Continuar";
    setIsCorrectAnswer(selectedAnswerData.isCorrect);

    setButtonClassName(
      `bg-project${selectedAnswerData.isCorrect ? 'Green' : 'Red'}`
    );

    setShowFeedback(true);
    setButtonText(continueText);
    if (buttonText !== continueText) {
      getRandomPhrase(selectedAnswerData.isCorrect);
      setIsXpPopUpVisible(true);
      setIsPopUpVisible(true);
    }
  }

  useEffect(() => {
    getExercise().then(() => {
      setHasData(true);
    });

    const fetchUserFirstName = async () => {
      const userInfo = await StorageService.getUserInfo();
      setFirstName(userInfo.firstName);
    };
    fetchUserFirstName();
  }, []);

  return (
    <SafeAreaView className="h-screen bg-secondary">

      <View className="flex-row items-center justify-around top-0">
        <View>
          <LeaveButton
            navigationPlace={"Course"}
            courseId={dummyExerciseData.courseId}
          />
        </View>
        <View>
          <CustomProgressBar progress={0.25 / 1}></CustomProgressBar>
        </View>
        <View>
          <Text className="px-3 text-center font-sans-bold text-caption-medium text-projectBlack">
            25%
          </Text>
        </View>
      </View>

      {dummyExerciseData === undefined ? (
        // No Data
        <Text>Sem dados</Text>
      ) : (
        <View className="items-center">
          <Text className="pt-6 pb-10 px-6 text-center text-body font-sans-bold text-projectBlack w-5/6">
            {dummyExerciseData.question}
          </Text>

          <View className={`${buttonClassName} items-start justify-start`} style={{ height: screenHeight * 0.5, width: ScreenWidth * 1 }}>
            <ScrollView className="py-2">
              {/* Map through the answers and render each one */}
              {dummyExerciseData.answers.map((answer) => (
                <View key={answer.id} className="flex-row pb-6 px-6 w-screen h-fit">

                  <View className="">
                    <RadioButton.Android
                      disabled={showFeedback}
                      value={answer.id}
                      status={
                        selectedAnswer === answer.id ? "checked" : "unchecked"
                      }
                      onPress={() => handleAnswerSelect(answer.id)}
                      color={projectColors.primary}
                      uncheckedColor={projectColors.primary}
                    />
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={() => handleAnswerSelect(answer.id)}
                      disabled={showFeedback}
                    >
                      <Text className="w-[304] text-body text-projectBlack">{answer.text}</Text>
                    </TouchableOpacity>

                    {showFeedback ? (
                      <View className={`flex-row py-2 rounded-medium ${answer.isCorrect ? 'bg-projectGreen' : 'bg-projectRed'}`}>

                        <View className="pt-0.5 pl-2">
                          {answer.isCorrect === true ? (
                            <Icon
                              size={10}
                              name="check"
                              type="material"
                              color={projectColors.success}
                            />
                          ) : (
                            <Icon
                              size={10}
                              name="close"
                              type="material"
                              color={projectColors.error}
                            />
                          )}
                        </View>

                        <Text className={`w-[272] pl-1 text-caption-medium ${answer.isCorrect ? 'text-success' : 'text-error'}`}>{answer.feedback}</Text>
                      </View>
                    ) : null}
                  </View>

                </View>
              ))}
            </ScrollView>
          </View>

          <View className="px-6 pt-10 w-screen">
            <TouchableOpacity
              disabled={selectedAnswer === null ? true : false}
              className={`${selectedAnswer !== null ? 'opacity-100' : 'opacity-30'} bg-primary px-10 py-4 rounded-medium`}
              onPress={() => handleReviewAnswer()}
            >
              <Text className="text-center font-sans-bold text-projectWhite">{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {isPopUpVisible ? (
        <PopUp randomPhrase={randomPhrase} xpAmount={xp} isCorrectAnswer={isCorrectAnswer} />
      ) : null}

      {isXpPopUpVisible ? (
        <XpPopUp randomPhrase={randomPhrase} xpAmount={xp} isCorrectAnswer={isCorrectAnswer} />
        ) : null}

      {/* Old exercise buttons
        <View style={{ flex: 3 }}>
          {exerciseData === undefined ? (
            //No data
            <Text> Sem dados</Text>
          ) : (
            <ExerciseButtons
              answers={exerciseData.answers}
              exerciseId={exerciseData.id}
              courseId={exerciseData.courseId}
              sectionId={exerciseData.sectionId}
              setSignal={setSignal}
              hasData={hasData}
            ></ExerciseButtons>
          )}
        </View>
        */}

      <ExerciseInfo courseId={dummyExerciseData.courseId} sectionId={dummyExerciseData.sectionId} />

      {/* <StatusBar style="auto" /> */}
    </SafeAreaView>
  );
}
