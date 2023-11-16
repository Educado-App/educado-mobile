import React, { useEffect, useRef, useState } from 'react';
import LottieView from 'lottie-react-native';
import {Alert, TouchableWithoutFeedback} from 'react-native';
import animationAsset from '../../../assets/animations/downloadAnimation.json';
import PropTypes from 'prop-types';

const ANIMATION_STATES = {
  INITIAL: 'initial',
  DOWNLOADING: 'downloading',
  FINISHING: 'finishing',
  COMPLETED: 'completed',
  DELETE: 'delete',
};

/**
 * DownloadCourseButton component displays a button that downloads a course
 * @returns {JSX.Element} - The DownloadCourseButton component
 */
export default function DownloadCourseButton({disabled = false}) {
  const animationRef = useRef(null);
  const [animationState, setAnimationState] = useState(ANIMATION_STATES.INITIAL);

  // Play animation based on animation state
  // Hardcoded frame numbers are based on the animation
  // https://lottiefiles.com/animations/download-ZdWE0VoaZW
  useEffect(() => {
    if (animationRef.current) {
      switch (animationState) {
      case ANIMATION_STATES.INITIAL:
        return animationRef.current.play(17, 17);

      case ANIMATION_STATES.DOWNLOADING:
        return animationRef.current.play(18, 77);

      case ANIMATION_STATES.FINISHING:
        // 2333ms is the duration of the animation from frame 78 to 148
        setTimeout(() => setAnimationState(ANIMATION_STATES.COMPLETED), 2333);
        return animationRef.current.play(78, 148);

      case ANIMATION_STATES.COMPLETED:
        return animationRef.current.play(149, 149);

      case ANIMATION_STATES.DELETE:
        // 1066ms is the duration of the animation from frame 110 to 78
        setTimeout(() => setAnimationState(ANIMATION_STATES.INITIAL), 1066);
        return animationRef.current.play(110, 78);

      default:
        break;
      }
    }
  }, [animationState]);

  const downloadConfirmation = () =>
    Alert.alert('Baixar curso', 'Deseja baixar este curso para acesso offline?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Baixar',
        onPress: () => {
          setAnimationState(ANIMATION_STATES.DOWNLOADING);
          setTimeout(() => setAnimationState(ANIMATION_STATES.FINISHING), 5000);
        },
      },
    ]);


  const removeDownloadConfirmation = () =>
    Alert.alert('Remover curso', 'Tem certeza de que deseja remover este curso baixado?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Remover',
        onPress: () => {
          setAnimationState(ANIMATION_STATES.DELETE);
        },
        style: 'destructive',
      },
    ]);


  // TODO: Implement download functionality
  const handlePress = () => {
    // Disable button if disabled prop is true
    if (disabled) return;

    // For testing purposes - (simulate downloading a course)
    if (animationState === ANIMATION_STATES.INITIAL) {
      downloadConfirmation();
    }
    // For testing purposes (reset to initial state if completed)
    if (animationState === ANIMATION_STATES.COMPLETED) {
      removeDownloadConfirmation();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress} disabled={disabled}>
      <LottieView
        ref={animationRef}
        source={animationAsset}
        height={32}
        width={24}
      />
    </TouchableWithoutFeedback>
  );
}

DownloadCourseButton.propTypes = {
  disabled: PropTypes.bool,
};