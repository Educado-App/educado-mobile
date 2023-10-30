import { Video } from 'expo-av';
import { StyleSheet } from 'react-native';
import React, { useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

function LaerningInputVideoExample1(uri, signal) {
	LaerningInputVideoExample1.propTypes = {
		uri: PropTypes.string.isRequired,
		signal: PropTypes.string.isRequired
	};

	const video = useRef(0);

	useEffect(()=>{
		video.current.pauseAsync();
	}, [signal]);

	console.log('signal from video: ' + signal);
	return (
		<Video
			source={uri}
			rate={1.0}
			volume={1.0}
			isMuted={false}
			resizeMode="cover"
			shouldPlay
			useNativeControls
			isLooping
			ref={video}
			style={styles.backgroundVideo}
		/>
	);
}

const styles = StyleSheet.create({
	backgroundVideo: {
		height: '100%'
	}
});

export default LaerningInputVideoExample1;
