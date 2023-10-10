import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Image, TouchableHighlight, Pressable } from "react-native";
import LeaveButton from "../../components/exercise/LeaveButton";
import ExerciseButtons from "../../components/exercise/ExerciseButtons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as StorageService from "../../services/StorageService";
import CustomProgressBar from "../../components/exercise/Progressbar";
import dummyExerciseData from "./dummyExerciseData.json";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, RadioButton } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from 'react-native';
import ExerciseInfo from "../../components/exercise/ExerciseInfo";
import { ScreenWidth } from "@rneui/base";
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';

export default function ExerciseScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const screenHeight = Dimensions.get('window').height;

  const [hasData, setHasData] = useState(false);
  const [signal, setSignal] = useState([]);
  const [exerciseData, setExerciseData] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null); // State to store the selected answer

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId); // Update the selected answer when a radio button is pressed
  };

  let reviewAnswer = 0;

  function handleReviewAnswer() {
    if (dummyExerciseData.answers[selectedAnswer - 1].isCorrect) {
      // Handle the case when the selected answer is correct
      reviewAnswer = 1;
      console.log("Correct answer");
      // Do something for a correct answer, e.g., show a success message or navigate to the next question.
    } else {
      // Handle the case when the selected answer is incorrect
      reviewAnswer = 2;
      console.log("Incorrect answer");
      // Do something for an incorrect answer, e.g., show a failure message or allow the user to try again.
    }
  }

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

  useEffect(() => {
    getExercise().then(() => {
      setHasData(true);
    });
  }, [route.params]);

  return (
    <View className="bg-secondary flex-1 justify-between">
      <SafeAreaView className= "justify-between" >
        <View className = "flex-row items-center justify-around">
          <View>
              <LeaveButton
              //navigationPlace={"Course"}
              //courseId={courseId}
              ></LeaveButton>
          </View>
          <View>
            <CustomProgressBar progress={0.25 / 1}></CustomProgressBar>
          </View>
          <View>
            <Text className="px-3 text-center font-montserrat-bold text-[caption-medium] text-projectBlack"> 
              25% 
            </Text> 
          </View>
        </View>

        {dummyExerciseData === undefined ? (
          // No Data
          <Text> Sem dados</Text>
        ) : (
          <View className="items-center">
            <Text className="pt-6 pb-10 text-center text-body font-montserrat-bold text-projectBlack w-5/6">
              {dummyExerciseData.question}
            </Text>
            <View className={`bg-projectRed items-center justify-center ${reviewAnswer === 2 ? 'bg-projectRed' : ''}`} style={{height: screenHeight * 0.569, width: ScreenWidth * 1}}>
              <ScrollView>
                {/* Map through the answers and render each one */}
                {dummyExerciseData.answers.map((answer) => (
                  <View
                    key={answer.id}
                    className="flex-row w-[390] pb-6 pl-2"
                  >
                    <View>
                      <RadioButton.Android
                        value={answer.id}
                        status={
                          selectedAnswer === answer.id ? "checked" : "unchecked"
                        }
                        onPress={() => handleAnswerSelect(answer.id)}
                        color= "#5ECCE9"
                        uncheckedColor="#5ECCE9"
                      />
                    </View>
                    <View>
                      <Text className="pt-2 pb-1 w-[304] font-montserrat text-body text-projectBlack">{answer.text}</Text>
                        {/*{reviewAnswer === 2 || 1 ? ( 
                          ''
                        ) : (*/}
                      <View className={`flex-row pb-2 w-[310] rounded ${answer.isCorrect ? 'bg-projectGreen' : 'bg-projectRed'}`}>
                        <View className="pl-2 pt-1">
                          {answer.isCorrect === true ? (
                            <Text className="text-success">
                              w
                              {/*//<Icon path={mdiCheck} size={1} />*/}
                            </Text>
                           ) : (
                            <Text className="text-error">w</Text>
                           )}                          
                        </View>
                        <Text className={`w-[272] pl-1 pt-2 font-montserrat text-caption-medium ${answer.isCorrect ? 'text-success' : 'text-error'}`}>{answer.feedback}</Text>
                      </View>   
                    </View>
                  </View>
                ))}
                {selectedAnswer !== null && (
                  <View className="items-center">
                    <Pressable onPress={() => handleReviewAnswer()}>
                      <Text className="text-center font-montserrat text-body text-primary underline pb-20">
                        Review answer
                      </Text>
                    </Pressable>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        )}

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
        <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}
