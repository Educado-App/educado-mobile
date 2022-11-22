import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import FeedBackVideo from '../../components/exercise/video/LearningInputVideoExample1'
import { Icon } from '@rneui/themed'
import { useNavigation, useRoute } from '@react-navigation/native'
import StorageController from '../../assets/controller/storageController'

export default function WrongAnswerComponent() {
  const navigation = useNavigation()
  const route = useRoute()
  const { exerciseId, courseId, sectionId } = route.params

  const feedback = StorageController.getFeedBackByExerciseId(exerciseId)

  return (
    <View style={styles.container} className="bg-babyBlue">
      <View style={{ flex: 0.5 }}>
        <View
          style={[styles.row, { paddingTop: '15%', paddingRight: '7%' }]}
        ></View>
      </View>
      <View style={{ flex: 2, width: '100%' }}>
        <FeedBackVideo uri={feedback.on_wrong_feedback.uri}></FeedBackVideo>
      </View>
      <View style={{ top: '5%', flex: 0.7 }}>
        <View
          style={[
            styles.nextArrow,
            styles.buttonShadow,
            { shadowColor: '#2db300' }
          ] } 
        >
          <Icon
          
            size={70}
            name="chevron-right"
            type="material-community"
            color="white"
            onPress={() =>
              navigation.navigate('Exercise', {
                sectionId: sectionId,
                courseId: courseId
              })
            }
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
