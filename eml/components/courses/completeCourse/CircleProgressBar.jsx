import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const CircleProgressBar = ({ progress }) => {
  const radius = 70;
  const strokeWidth = 10;
  const color = '#383838';

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedValue]);

  const circumference = (2 * Math.PI * (radius - strokeWidth / 2)) * (progress/100);
  console.log(circumference);

  const animatedStrokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  console.log("log: " + animatedStrokeDashoffset.inputRange + " " + animatedStrokeDashoffset.outputRange);

  return (
    <View className="align-middle justify-center">
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeLinecap="round"
        />
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke="white"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeLinecap="round"
          strokeDashoffset={animatedStrokeDashoffset}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text className="font-sans-bold text-xl">{`${Math.round(progress)}%`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CircleProgressBar;
