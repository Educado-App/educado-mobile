import { Video } from 'expo-av'
import { StyleSheet } from 'react-native'
import { React } from 'react'
import PropTypes from 'prop-types'

function LaerningInputVideoExample1(uri) {
  LaerningInputVideoExample1.propTypes = {
    uri: PropTypes.string.isRequired
  }

  return (
    <Video
      source={uri}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode="cover"
      //shouldPlay
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

export default LaerningInputVideoExample1
