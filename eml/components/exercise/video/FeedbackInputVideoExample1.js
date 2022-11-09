import { Video } from 'expo-av'
import { StyleSheet } from 'react-native'
import { React } from 'react'
import PropTypes from 'prop-types'
//import GetContent from '../../../assets/video/feedback/Feedback'

function FeedbackInputVideoExample1({ pathVideo }) {
  FeedbackInputVideoExample1.propTypes = {
    pathVideo: PropTypes.number,
  }

  //const items = GetContent()
  // if (pathVideo === -1 || pathVideo > items.length - 1) {
  //   pathVideo = 0;
  // }

  return (
    <Video
      source={require('../../../assets/video/feedback/testvideo.mp4')}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode="cover"
      shouldPlay
      useNativeControls
      isLooping
      style={styles.backgroundVideo}
    />
  )
}

const styles = StyleSheet.create({
  backgroundVideo: {

    height: '100%'
  }
})

export default FeedbackInputVideoExample1