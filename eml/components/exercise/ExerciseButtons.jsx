import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { Audio } from 'expo-av'
import PropTypes from 'prop-types'
import * as StorageService from '../../services/StorageService';
import * as Speech from 'expo-speech'


const voiceOvers = [
  require('../../assets/voice1.mp3'),
  require('../../assets/voice2.mp3'),
  require('../../assets/voice3.mp3'),
  require('../../assets/voice4.mp3')
]

export default function ExerciseButtons({ exerciseId, answers, sectionId, courseId, setSignal, hasData }) {
  const navigation = useNavigation()

  ExerciseButtons.propTypes = {
    answers: PropTypes.array,
    exerciseId: PropTypes.string,
    sectionId: PropTypes.string.isRequired,
    courseId: PropTypes.string.isRequired,
    setSignal: PropTypes.func.isRequired
  }
  if (hasData === true) {
    console.log(answers)
  }


  function findRightAnswer() {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].correct === true) {
        return i + 1
      }
    }
    return null
  }
  const [selected, setSelected] = useState({
    btn1: false,
    btn2: false,
    btn3: false,
    btn4: false
  })
  const [choice, setChoice] = useState(0)

  const [button, setButton] = useState(true)

  function handlePlaySound(tts) {
    Speech.stop()
    Speech.speak(tts, {
      language: "portuguese",
      voice: "com.apple.ttsbundle.Luciana-compact"
    }
    )
  }
  function handleChange(evt) {
    if (evt === 1) {
      setSelected({
        ...selected,
        btn1: true,
        btn2: false,
        btn3: false,
        btn4: false
      })
    } else if (evt === 2) {
      setSelected({
        ...selected,
        btn1: false,
        btn2: true,
        btn3: false,
        btn4: false
      })
    } else if (evt === 3) {
      setSelected({
        ...selected,
        btn1: false,
        btn2: false,
        btn3: true,
        btn4: false
      })
    } else if (evt === 4) {
      setSelected({
        ...selected,
        btn1: false,
        btn2: false,
        btn3: false,
        btn4: true
      })
    }
    setChoice(evt)
  }

  const updateExercise = async (sectionId, exerciseId) => {
    await StorageService.updateCompletionStatus(sectionId, exerciseId)

  }

  function checkChoice(choice) {

    setSignal(0)
    updateExercise(sectionId, exerciseId);

    const rightAnswer = findRightAnswer();

    setSelected({
      ...selected,
      btn1: false,
      btn2: false,
      btn3: false,
      btn4: false
    })

    if (choice === rightAnswer) {
      navigation.navigate('RightAnswer', { courseId: courseId, sectionId: sectionId })
    } else {
      navigation.navigate('WrongAnswer', { exerciseId: exerciseId, courseId: courseId, sectionId: sectionId })
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        {hasData === true && answers[0] !== undefined ?
          <View
            style={[
              styles.buttonShadow,
              styles.paddingButtons,
              { shadowColor: selected.btn1 ? '#991f00' : '#ff3300' }
            ]}
          >
            <Icon
              style={[
                styles.button,
                { backgroundColor: selected.btn1 ? '#991f00' : '#FF5252' }
              ]}
              size={60}
              name="triangle"
              type="material-community"
              color="#CFE9EF"
              onPress={() => {
                setButton()
                handleChange(1)
                handlePlaySound(answers[0].text)
              }}
            />
          </View> : null}
        {hasData === true && answers[1] !== undefined ?
          <View
            style={[
              styles.buttonShadow,
              styles.paddingButtons,
              { shadowColor: selected.btn2 ? '#003d99' : '#0066ff' }
            ]}
          >
            <Icon
              style={[
                styles.button,
                { backgroundColor: selected.btn2 ? '#003d99' : '#65D4EE' }
              ]}
              size={60}
              name="checkbox-blank-circle"
              type="material-community"
              color='#CFE9EF'
              onPress={() => {
                setButton()
                handleChange(2)
                handlePlaySound(answers[1].text)
              }}
            />
          </View> : null}
      </View>
      <View style={styles.container2}>
        {hasData === true && answers[2] !== undefined ?
          <View
            style={[
              styles.buttonShadow,
              styles.paddingButtons,
              { shadowColor: selected.btn3 ? '#997a00' : '#ffcc00' }
            ]}
          >
            <Icon
              style={[
                styles.button,
                { backgroundColor: selected.btn3 ? '#FAC12F' : '#FFFF8D' }
              ]}
              size={60}
              name="star"
              type="material-community"
              color="#CFE9EF"
              onPress={() => {
                setButton()
                handleChange(3)
                handlePlaySound(answers[2].text)
              }}
            />
          </View> : null}
        {hasData === true && answers[3] !== undefined ?
          <View
            style={[
              styles.buttonShadow,
              styles.paddingButtons,
              { shadowColor: selected.btn4 ? '#267326' : '#009900' }
            ]}
          >
            <Icon
              style={[
                styles.button,
                { backgroundColor: selected.btn4 ? '#267326' : '#9DE89C' }
              ]}
              size={60}
              name="square"
              type="material-community"
              color="#CFE9EF"
              onPress={() => {
                setButton()
                handleChange(4)
                handlePlaySound(answers[3].text)
              }}
            />
          </View> : null}
      </View>
      <View style={{ top: '2%' }}>
        <View
          style={[
            styles.nextArrow,
            { backgroundColor: button ? 'lightgrey' : '#2db300' }
          ]}
        >
          <Icon
            size={70}
            name="check-bold"
            disabledStyle={{ borderRadius: 15 }}
            disabled={button}
            type="material-community"
            color="#CFE9EF"
            onPress={() => {
              setButton(true)
              checkChoice(choice)
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  container2: {
    flexDirection: 'row'
  },
  button: {
    borderRadius: 15,
    justifyContent: 'center',
    width: 140,
    height: 110
  },
  buttonShadow: {
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 }
  },
  nextArrow: {
    borderRadius: 15,
    backgroundColor: '#2db300',
    width: 300,
    height: 75,
    position: 'relative'
  },
  paddingButtons: {
    padding: 10
  }
})
