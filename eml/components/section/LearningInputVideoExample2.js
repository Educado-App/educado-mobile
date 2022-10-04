import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'

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
        style={{ height: 160 }}
      />
    )
}

export default LearningInputVideoExample2;