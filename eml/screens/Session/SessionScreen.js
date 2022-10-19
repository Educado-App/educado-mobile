import { StatusBar } from 'expo-status-bar'
import { React, useState, useEffect } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import LeaveButton from '../../components/sessions/LeaveButton'
import CustomProgressBar from '../../components/sessions/Progressbar'
import LearningInputVideo from '../../components/sessions/video/LearningInputVideoExample1'
import FourButtons from '../../components/sessions/FourButtons2'
import HeaderIcon from '../../components/sessions/headerIcon'
import Victory from '../../components/gamificationElements/Confetti'
import { useNavigation } from '@react-navigation/native'

export default function SessionComponent() {
  const navigation = useNavigation()
  const answerArray = ['star', 'circle', 'square']

  const [answerNr, setAnswerNr] = useState(0)

  useEffect(() => {
    if (answerNr > answerArray.length - 1) {
      setAnswerNr(-1)
    }
  })

  function sendDataToParent() {
    setAnswerNr((current) => current + 1)
    console.log(answerNr)
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
            <LeaveButton></LeaveButton>
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
        </View>
        <View>
          <CustomProgressBar
            progress={Math.round((answerNr / answerArray.length) * 10) / 10}
          ></CustomProgressBar>
        </View>
      </View>
      <View style={{ flex: 2, width: '100%' }}>
        <LearningInputVideo></LearningInputVideo>
        {answerNr === -1
          ? Alert.alert('Good job you completed the course!', 'Pogchamp', [
              {
                text: 'Back',
                onPress: () => console.log(navigation.navigate('Course'))
              }
            ])
          : null}
      </View>
      <View style={{ flex: 3 }}>
        <FourButtons
          correctAnswer={correctAnswer}
          sendDataToParent={sendDataToParent}
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
