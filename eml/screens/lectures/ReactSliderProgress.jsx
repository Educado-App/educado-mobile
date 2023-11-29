import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import tailwindConfig from '../../tailwind.config';
import { convertMsToTime } from '../../services/utilityFunctions';
import PropTypes from 'prop-types';

const ReactSliderProgress = ({ elapsedMs = 10000, totalMs = 20000, videoRef }) => {

	const [sliderValue, setSliderValue] = useState(elapsedMs);

	useEffect(() => {
		setSliderValue(elapsedMs);
	}, [elapsedMs]);

	const onSlidingComplete = async (value) => {
		if (videoRef.current) {
			try {
				await videoRef.current.setStatusAsync({
					positionMillis: value,
				});
			} catch (error) {
				console.error('Error seeking:', error);
			}
		}
	};

	return (
		<View className="w-full flex-row justify-between items-center h-8">
			{/* Start Time */}
			<Text className="text-projectWhite">{convertMsToTime(sliderValue)}</Text>
			{/* Slider for Progress Bar */}
			<Slider
				style={{ flex: 1, marginHorizontal: 10, height: 10 }}  // height here adjusts the track height
				minimumValue={0}
				maximumValue={totalMs}
				value={sliderValue}
				onValueChange={value => setSliderValue(value)}
				onSlidingComplete={onSlidingComplete}
				minimumTrackTintColor={tailwindConfig.theme.colors.primary}
				maximumTrackTintColor={tailwindConfig.theme.colors.projectGray}
				thumbTintColor={tailwindConfig.theme.colors.primary}
			/>
			{/* End Time */}
			<Text className="text-projectWhite">{convertMsToTime(totalMs)}</Text>
		</View>
	);
};

ReactSliderProgress.propTypes = {
	elapsedMs: PropTypes.number,
	totalMs: PropTypes.number,
	videoRef: PropTypes.object,
};

export default ReactSliderProgress;
