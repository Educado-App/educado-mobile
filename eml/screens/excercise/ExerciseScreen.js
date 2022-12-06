import { StatusBar } from 'expo-status-bar'
import { React, useEffect, useRef, useState } from 'react'
import { Alert, StyleSheet, View, Text } from 'react-native'
import LeaveButton from '../../components/exercise/LeaveButton'
import ExerciseButtons from '../../components/exercise/ExerciseButtons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Video } from 'expo-av'
import * as StorageService from "../../services/StorageService";

export default function ExerciseScreen() {

  const navigation = useNavigation()

  const route = useRoute()

  const { sectionId, courseId } = route.params

  const [flag, setFlag] = useState(false)

  const [status, setStatus] = useState([])
  const [signal, setSignal] = useState([])
  const [exerciseData, setExerciseData] = useState({})

//Dead loop here: getExercise triggers useEffect that again calls on getExercise and so on!
  async function getExercise() {
      const exercise = await StorageService.getNextExercise(sectionId)
      setExerciseData(exercise)
  }

  useEffect(() => {
      getExercise().then(() => {
        setFlag(true)
    });
  }, [exerciseData])

  const video = useRef(0)

  useEffect(() => {
    if (signal === 0 && status.isPlaying) {
      video.current.pauseAsync()
    }
    console.log(signal)
    setSignal(1)
  }, [signal])

  return (
    <View style={styles.container} className="bg-babyBlue">
      <View style={{ flex: 1 }}>
        <View style={[{ paddingTop: '7%' }, styles.row]}>
          <View style={[{ paddingTop: '15%' }, { right: '120%' }]}>
            <LeaveButton
              navigationPlace={'Course'}
              courseId={courseId}
            ></LeaveButton>
          </View>
          <View>
            {flag ?  <Text>{exerciseData.answers[0].text}</Text>  : <Text>loading</Text>}
          </View>
          <View
            style={[
              styles.buttonShadow,
              { paddingLeft: '17%' },
              { shadowColor: '#00e600' }
            ]}
          ></View>
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
        <View>
          {/* <CustomProgressBar
            progress={Math.round((answerNr / answerArray.length) * 10) / 10}
          ></CustomProgressBar> */}
        </View>
      </View>
      <View style={{ flex: 2, width: '100%' }}>
        {exerciseData === null ? (
          Alert.alert(
            'Good job you completed the section!',
            'Congratulations!',
            [
              {
                text: 'Back',
                onPress: () => navigation.navigate('Course')
              }
            ]
          )
        ) : (
          /* <LearningInputVideoExample1
            uri={exercise.content.uri} signal={status}
          ></LearningInputVideoExample1> */
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
        <ExerciseButtons
          answers={exerciseData.answers}
          exerciseId={exerciseData.id}
          courseId={courseId}
          sectionId={sectionId}
          setSignal={setSignal}
        ></ExerciseButtons>
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
