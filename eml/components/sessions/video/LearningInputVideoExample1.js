import { Audio, Video } from 'expo-av';
import { StyleSheet} from 'react-native';

const LaerningInputVideoExample1 = () => {
    return (
        <Video
            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            useNativeControls={true}
            isLooping
            style={styles.backgroundVideo}
        /> 
    )
}

const styles = StyleSheet.create({
    backgroundVideo: {
        width: 300, 
        height: 300
    },
  });

export default LaerningInputVideoExample1;