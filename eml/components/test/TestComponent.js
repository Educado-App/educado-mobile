import {React, useEffect} from 'react'
import {StyleSheet} from 'react-native'
import {Video} from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage';

let testUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4';

const TEST_COURSE = '@testCourse';

const getCourse = async () => {
    return JSON.parse(await AsyncStorage.getItem(TEST_COURSE));
}

const testCourse = getCourse();

export default function TestComponent() {

    useEffect(() => {

            console.log(testCourse);

            //console.log("hello")
            //CreateDirectory('test');
            //ReadDirectory('test');
            //DeleteDirectory('test');
        }
    );

    return (
        <Video
            source={{
                uri: ''

            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            useNativeControls
            isLooping
            style={styles.backgroundVideo}
        />
    );
}

const styles = StyleSheet.create({

    backgroundVideo: {
        height: '100%'
    }

})
