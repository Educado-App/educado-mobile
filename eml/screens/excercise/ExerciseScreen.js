import { StatusBar } from 'expo-status-bar'
import { React, useState, useEffect } from 'react'
import { Alert, StyleSheet, View, Text } from 'react-native'
import LeaveButton from '../../components/exercise/LeaveButton'
import CustomProgressBar from '../../components/exercise/Progressbar'
import LearningInputVideoExample1 from '../../components/exercise/video/LearningInputVideoExample1'
import FourButtons from '../../components/exercise/ExerciseButtons'
import HeaderIcon from '../../components/exercise/headerIcon'
import { useNavigation } from '@react-navigation/native'
import Star from '../../components/gamification/Star'
import Exercises from '../../assets/exercises.json'

export default function SessionComponent() {
  const navigation = useNavigation()

  function determineRightAnswers() {
    const rightAnswers = []
    for (let i = 0; i < Exercises.length; i++) {
      for (let j = 0; j < Exercises[i].answers.length; j++) {
        if (Exercises[i].answers[j].correct === true) {
          rightAnswers.push(Exercises[i].answers[j].answerNumber)
        }
      }
    }
    return rightAnswers
  }

  const answerArray = determineRightAnswers()
  // console.log(answerArray)


  const [answerNr, setAnswerNr] = useState(0)
  const [correctNr, setCorrectNr] = useState(0)

  const fraqBot = answerArray.length
  const fraqTop = correctNr

  useEffect(() => {
    if (answerNr > answerArray.length - 1) {
      setAnswerNr(-1)
      console.log("insideinside useEffect " + answerNr)
    }
    console.log("insideoutside useEffect " + answerNr)
  }, [answerNr])

  function sendDataToParent(correct) {
    if (correct) {
      setCorrectNr((current) => current + 1)
    }
    setAnswerNr((current) => current + 1)
  }

  const correctAnswer = answerArray[answerNr]

  const color = '#00e600'
  const type = 'material-community'
  const name = 'finance'

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={[{ paddingTop: '7%' }, styles.row]}>
          <View style={[{ paddingTop: '5%' }, { right: '50%' }]}>
            <LeaveButton navigationPlace={'Home'}></LeaveButton>
          </View>
          <View
            style={[
              styles.buttonShadow,
              { paddingLeft: '17%' },
              { shadowColor: '#00e600' }
            ]}
          >
            <HeaderIcon color={color} name={name} type={type}></HeaderIcon>
          </View>
          <View
            style={{
              left: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Star></Star>
            <Text style={{ fontSize: 25 }}>
              {correctNr}/{answerArray.length}
            </Text>
          </View>
        </View>
        <View>
          <CustomProgressBar
            progress={Math.round((answerNr / answerArray.length) * 10) / 10}
          ></CustomProgressBar>
        </View>
      </View>
      <View style={{ flex: 2, width: '100%' }}>
        {answerNr === -1
          ? Alert.alert('Good job you completed the section!', 'Congratulations!', [
            {
              text: 'Back',
              onPress: () => navigation.navigate('Course')
            }
          ])
          : <LearningInputVideoExample1 pathVideo={answerNr}></LearningInputVideoExample1>}
      </View>
      <View style={{ flex: 3 }}>
        <FourButtons
          correctAnswer={correctAnswer}
          sendDataToParent={sendDataToParent}
          answerNr={answerNr}
        ></FourButtons>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  textStyle: {
    zIndex: 100,
    fontSize: 100
  },
  buttonShadow: {
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 }
  }
})