import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FeedBackVideo from '../../components/exercise/video/LearningInputVideoExample1'
import { Icon } from '@rneui/themed'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Video } from 'expo-av'
import * as StorageService from '../../services/StorageService'
import { StatusBar } from 'expo-status-bar'

export default function WrongAnswerComponent() {
  const navigation = useNavigation()
  const route = useRoute()
  const { exerciseId, courseId, sectionId } = route.params
  const [feedback, setFeedback] = useState('')
  const [bool, setBool] = useState(false)
  const video = useRef(0)

  const getFeedbackVideo = async () => {
    const feedback = await StorageService.getFeedBackByExerciseId(
      sectionId,
      exerciseId
    )
    setFeedback(feedback)
  }

  useEffect(() => {
    getFeedbackVideo().then(() => {
      setBool(true)
    })
  })

  return bool === true ? (
    <View style={styles.container} className="bg-babyBlue">
      <View style={{ flex: 2, width: '100%' }}>
        <Video
          source={{ uri: feedback }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          useNativeControls
          ref={video}
          style={styles.backgroundVideo}
        />
      </View>
      <View style={{ top: '5%', flex: 0.5 }}>
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
            onPress={() =>
              navigation.navigate('Exercise', {
                sectionId: sectionId,
                courseId: courseId
              })
            }
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  ) : (
    <View>
      <View style={styles.container} className="bg-babyBlue">
        <View style={{ top: '5%', flex: 0.7, paddingTop: 700 }}>
          <View
            style={[
              styles.nextArrow,
              styles.buttonShadow,
              { shadowColor: '#2db300' }
            ]}
          >
            <Icon
              size={70}
              name="reload-alert"
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
  },
  backgroundVideo: {
    height: '100%'
  }
})
