import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import LeaveButton from "../../components/exercise/LeaveButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomProgressBar from "../../components/exercise/Progressbar";
import { RadioButton } from "react-native-paper";
import ExerciseInfo from "../../components/exercise/ExerciseInfo";
import { Icon } from '@rneui/themed';
import { SafeAreaView } from "react-native-safe-area-context";
import { getExerciseByid, getSectionByid, getCourseByid } from '../../api/api';

export default function ExerciseScreen({ givenId = "65181a4f4c78b45368126ed7"}) {
  const navigation = useNavigation();
  const route = useRoute();

  const [hasData, setHasData] = useState(false);
  const [exerciseData, setExerciseData] = useState({});
  const [sectionData, setSectionData] = useState({});
  const [courseData, setCourseData] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [buttonClassName, setButtonClassName] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  function handleReviewAnswer(selectedAnswer) {
    setButtonClassName(selectedAnswer ? "bg-projectGreen" : "bg-projectRed");
    setShowFeedback(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setExerciseData(exercise = await getExerciseByid(givenId));
        setSectionData(section = await getSectionByid(exercise.parentSection));
        setCourseData(course = await getCourseByid(section.parentCourse));
        setHasData(true);
      } catch (error) {
        console.log("Error fetching data:", error);
        navigation.navigate("ErrorScreen");
      }
    };
  
    fetchData();
  }, [route.params]);
    

  return (
    <View className="bg-secondary flex-1 justify-between">
      <SafeAreaView className="justify-between">
        <View className="flex-row items-center justify-around">
          <LeaveButton
            navigationPlace="Course"
            courseId={exerciseData.courseId}
          ></LeaveButton>
          <CustomProgressBar progress={50} width={65} height={1.2}></CustomProgressBar>
        </View>

        {hasData === false ? (
          // No data
          <Text> Sem dados</Text>
        ) : (
          <View className="items-center">
            <Text testID="exerciseQuestion" className="pt-6 pb-10 text-center text-body font-montserrat-bold text-projectBlack w-11/12">
              {exerciseData.description}
            </Text>
            <View className={`${buttonClassName} items-center justify-center h-96 w-full`}>
              <ScrollView>
                {/*Map through the answers and render each one*/}
                {exerciseData.answers.map((answer, index) => (
                  <View
                    key={index}
                    className="flex-row w-96 pb-6 pl-2"
                  >
                    <View>
                      <RadioButton.Android
                        value={index}
                        status={
                          selectedAnswer === index ? "checked" : "unchecked"
                        }
                        onPress={() => handleAnswerSelect(index)}
                        color="#5ECCE9"
                        uncheckedColor="#5ECCE9"
                      />
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => handleAnswerSelect(index)}>
                        <Text className="pt-2 pb-1 w-72 font-montserrat text-body text-projectBlack">{answer.text}</Text>
                      </TouchableOpacity>
                      {showFeedback ? (
                        <View className={`flex-row pb-2 w-fit rounded-medium ${answer.isCorrect ? 'bg-projectGreen' : 'bg-projectRed'}`}>
                          <View className="pl-2 pt-1">
                            <View className="pt-1.5">
                              {answer.isCorrect === true ? ( 
                                <Icon
                                  size={10}
                                  name="check"
                                  type="material"
                                  color="#4AA04A"
                                />
                              ) : (
                                <Icon
                                  size={10}
                                  name="close"
                                  type="material"
                                  color="#FF4949"
                                />
                              )}  
                            </View>                        
                          </View>
                          <Text className={`w-72 pl-1 pt-2 pr-2 font-montserrat text-caption-medium ${answer.isCorrect ? 'text-success' : 'text-error'}`}>{answer.feedback}</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                ))}

              </ScrollView>
            </View>
            <View className="px-6 pt-8 w-screen">
              <TouchableOpacity 
                className={`${selectedAnswer !== null ? 'opacity-100' : 'opacity-30'} bg-primary px-10 py-4 rounded-medium`}
                onPress={() => handleReviewAnswer(exerciseData.answers[selectedAnswer].isCorrect)}
              >
                <Text className="text-center font-montserrat-bold text-body text-projectWhite">Confirmar resposta</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <ExerciseInfo courseId={courseData.title} sectionId={sectionData.title} />
        <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}
