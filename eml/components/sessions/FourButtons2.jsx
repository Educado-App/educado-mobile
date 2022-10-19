import React, { useState } from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { Audio } from 'expo-av'
import PropTypes from 'prop-types'

const voiceOvers = [
  require('../../assets/questionExample1.mp3'),
  require('../../assets/questionExample2.mp3'),
  require('../../assets/voiceOverTest.mp3')
]

export default function FourButtons2({ correctAnswer, sendDataToParent }) {
  const navigation = useNavigation()

  FourButtons2.propTypes = {
    correctAnswer: PropTypes.string,
    sendDataToParent: PropTypes.func.isRequired
  }

  const [selected, setSelected] = useState({
    btn1: false,
    btn2: false,
    btn3: false,
    btn4: false
  })
  const [choice, setChoice] = useState('')

  const handlePlaySound = async () => {
    const soundObj = new Audio.Sound()

    try {
      const source = voiceOvers[Math.floor(Math.random() * (3 - 0) + 0)]
      await soundObj.loadAsync(source)
      await soundObj
        .playAsync()
        .then(async (playbackStatus) => {
          setTimeout(() => {
            soundObj.unloadAsync()
          }, playbackStatus.playableDurationMillis)
        })
        .catch((error) => {
          console.log(' eroortis' + error)
        })
    } catch (error) {
      console.log(' eroortis' + error)
    }
  }
  function handleChange(evt) {
    if (evt === 'triangle') {
      setSelected({
        ...selected,
        btn1: true,
        btn2: false,
        btn3: false,
        btn4: false
      })
    } else if (evt === 'circle') {
      setSelected({
        ...selected,
        btn1: false,
        btn2: true,
        btn3: false,
        btn4: false
      })
    } else if (evt === 'star') {
      setSelected({
        ...selected,
        btn1: false,
        btn2: false,
        btn3: true,
        btn4: false
      })
    } else if (evt === 'square') {
      setSelected({
        ...selected,
        btn1: false,
        btn2: false,
        btn3: false,
        btn4: true
      })
    }
    console.log(evt)
    setChoice(evt)
  }

  function setButtonState(b1, b2, b3, b4) {
    setSelected({
      ...selected,
      btn1: b1,
      btn2: b2,
      btn3: b3,
      btn4: b4
    })
  }

  function checkChoice(choice) {
    if (choice === correctAnswer) {
      Alert.alert('Wuhuuu you awnsered correct!', 'God job!', [
        {
          text: 'Next question!',
          onPress: () => {
            sendDataToParent()
          }
        }
      ])
      setButtonState(false, false, false, false)
    } else {
      navigation.navigate('Profile')
      setButtonState(false, false, false, false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
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
              { backgroundColor: selected.btn1 ? '#991f00' : '#ff3300' }
            ]}
            size={60}
            name="triangle"
            type="material-community"
            color="white"
            onPress={() => {
              handleChange('triangle')
              handlePlaySound()
            }}
          />
        </View>
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
              { backgroundColor: selected.btn2 ? '#003d99' : '#0066ff' }
            ]}
            size={60}
            name="checkbox-blank-circle"
            type="material-community"
            color="white"
            onPress={() => {
              handleChange('circle')
              handlePlaySound()
            }}
          />
        </View>
      </View>
      <View style={styles.container2}>
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
              { backgroundColor: selected.btn3 ? '#997a00' : '#ffcc00' }
            ]}
            size={60}
            name="star"
            type="material-community"
            color="white"
            onPress={() => {
              handleChange('star')
              handlePlaySound()
            }}
          />
        </View>
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
              { backgroundColor: selected.btn4 ? '#267326' : '#009900' }
            ]}
            size={60}
            name="square"
            type="material-community"
            color="white"
            onPress={() => {
              handleChange('square')
              handlePlaySound()
            }}
          />
        </View>
      </View>
      <View style={{ top: '2%' }}>
        <View
          style={[
            styles.nextArrow,
            styles.buttonShadow,
            { shadowColor: '#2db300' }
          ]}
        >
          <Icon
            size={70}
            name="check-bold"
            type="material-community"
            color="white"
            onPress={() => {
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
