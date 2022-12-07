import { StatusBar } from 'expo-status-bar'
import { React, useEffect, useRef, useState } from 'react'
import { Alert, StyleSheet, View, Text } from 'react-native'
import LeaveButton from '../../components/exercise/LeaveButton'
import ExerciseButtons from '../../components/exercise/ExerciseButtons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Video } from 'expo-av'
import * as StorageService from '../../services/StorageService'
import CustomProgressBar from '../../components/exercise/Progressbar'

export default function ExerciseScreen() {
  const navigation = useNavigation()

  const route = useRoute()

  const { sectionId, courseId } = route.params

  const [flag, setFlag] = useState(false)

  const [status, setStatus] = useState([])
  const [signal, setSignal] = useState([])
  const [exerciseData, setExerciseData] = useState({})

  async function getExercise() {
    const exercise = await StorageService.getNextExercise(sectionId)
    if (exercise === undefined) {
      navigation.navigate('ErrorScreen')
    }
    setExerciseData(exercise)
  }
  //Find en anden løsning end useEffect...
  useEffect(() => {
    getExercise().then(() => {
      setFlag(true)
    })
  }, [route.params])

  const video = useRef(0)

  useEffect(() => {
    if (signal === 0 && status.isPlaying) {
      video.current.pauseAsync()
    }
    setSignal(1)
  }, [signal])

  return (
    <View style={styles.container} className="bg-babyBlue">
      <View style={{ flex: 1 }}>
        <View className="pt-8 flex-row w-screen">
          <View className="">
            <LeaveButton
              navigationPlace={'Course'}
              courseId={courseId}
            ></LeaveButton>
          </View>
          <View
            style={{
              left: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            {/* <Star></Star> */}
            {/* <Text style={{ fontSize: 25 }}>
              {correctNr}/{answerArray.length}
            </Text> */}
          </View>
        </View>
        <View className="items-center">
          <CustomProgressBar progress={0.5 / 1}></CustomProgressBar>
        </View>
      </View>
      <View style={{ flex: 2, width: '100%' }}>
        {exerciseData === undefined ? (
          <Text>No Data</Text>
        ) : (
          <Video
            source={{ uri: exerciseData.content }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            useNativeControls
            ref={video}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            style={styles.backgroundVideo}
          />
        )}
      </View>
      <View style={{ flex: 3 }}>
        {exerciseData === undefined ? (
          <Text> No data</Text>
        ) : (
          <ExerciseButtons
            answers={exerciseData.answers}
            exerciseId={exerciseData.id}
            courseId={courseId}
            sectionId={sectionId}
            setSignal={setSignal}
          ></ExerciseButtons>
        )}
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
  },
  backgroundVideo: {
    height: '100%'
  }
})
