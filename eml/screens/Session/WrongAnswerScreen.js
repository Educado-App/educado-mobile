import React from 'react'
import { StyleSheet, View } from 'react-native'
import LearningInputVideo from '../../components/sessions/video/LearningInputVideoExample1'
import LeaveButton from '../../components/sessions/LeaveButton'
import CustomProgressBar from '../../components/sessions/Progressbar'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

export default function WrongAnswerComponent() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.5 }}>
        <View style={[styles.row, { paddingTop: '15%', paddingRight: '7%' }]}>
          <View style={{}}>
            <LeaveButton></LeaveButton>
          </View>
          <View style={{ paddingTop: '6%' }}>
            <CustomProgressBar></CustomProgressBar>
          </View>
        </View>
      </View>
      <View style={{ flex: 2, width: '100%' }}>
        <LearningInputVideo></LearningInputVideo>
      </View>
      <View style={{ top: '5%', flex: 0.7 }}>
        <View
          style={[
            styles.nextArrow,
            styles.buttonShadow,
            { shadowColor: '#2db300' }
          ]}
        >
          <Icon
            size={70}
            name="chevron-right"
            type="material-community"
            color="white"
            onPress={() => navigation.navigate('Exercise')}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
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
