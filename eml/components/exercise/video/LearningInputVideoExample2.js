import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import { StyleSheet, Text, View } from 'react-native';
const LearningInputVideoExample2 = () => {
    return (
        <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          },
        }}
        slider={{
          visible: true,
        }}
        fullscreen={{
          visible: false,
        }}
        timeVisible={false}
        style={styles.video}
      />
    )
}


const styles = StyleSheet.create({
  video: {
      },
});

export default LearningInputVideoExample2;