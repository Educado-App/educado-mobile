
import React, {useEffect,useState, Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native';
import {Video} from 'expo-av';

import getPresignedUrlFile from './../../../hooks/getPresignedUrlFile';

export default class VideoElement extends Component {

    state = {
        videoUri: ''
    }

    async componentDidMount() {
        // GET presigned url for video
        // Save in state
        const res = await getPresignedUrlFile(this.props.comp.file);
        this.setState({
            ...this.state,
            videoUri: res
        });
    }

    videoBuffer = (isBuffer) =>{


        console.log(isBuffer)
        //here you could set the isBuffer value to the state and then do something with it
        //such as show a loading icon
        }

    render() {
        
        return (
            <View>
                <Video
                    source={{uri: this.state.videoUri}}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="stretch"
                    useNativeControls
                    isLooping
                    style={styles.video} />
            </View>
            
          );
    }
}

const styles = StyleSheet.create({
    video: {
        backgroundColor: '#fff',
    
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 10,
        margin: 10,
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.2
      }
});
