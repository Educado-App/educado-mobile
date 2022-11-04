import { Video } from 'expo-av'
import { StyleSheet } from 'react-native'
import { React } from 'react'
import PropTypes from 'prop-types'
import GetContent from '../video/Content'

function LaerningInputVideoExample1({pathVideo}){
  LaerningInputVideoExample1.propTypes = {
    pathVideo: PropTypes.number,
  }

  const items = GetContent()
  
  return (
    <Video
      source={items[pathVideo].video}
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

export default LaerningInputVideoExample1
