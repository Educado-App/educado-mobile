import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import {Alert, Pressable, View} from "react-native";
import * as StorageService from "../../../services/StorageService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ANIMATION_STATES = {
    INITIAL: "initial",
    DOWNLOADING: "downloading",
    FINISHING: "finishing",
    COMPLETED: "completed",
    DELETE: "delete",
}

/**
 * DownloadCourseButton component displays a button that downloads a course
 * @param {object} course - The course the button is on
 * @returns {JSX.Element} - The DownloadCourseButton component
 */
export default function DownloadCourseButton(course) {
    const animationRef = useRef(null);
    const [animationState, setAnimationState] = useState(ANIMATION_STATES.INITIAL);
    //setAnimationState(course.course.downloaded ? ANIMATION_STATES.COMPLETED : ANIMATION_STATES.INITIAL);

    const storageCheck = async () => {
        if (animationState === ANIMATION_STATES.INITIAL || animationState === ANIMATION_STATES.COMPLETED) {
            let result = !!(await AsyncStorage.getItem(course.course.courseId + await AsyncStorage.getItem('@userId')));
            setAnimationState(result ? ANIMATION_STATES.COMPLETED : ANIMATION_STATES.INITIAL);
        }
    }

    storageCheck();

    // Play animation based on animation state
    // Hardcoded frame numbers are based on the animation
    // https://lottiefiles.com/animations/download-ZdWE0VoaZW

    useEffect(() => {
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
    }, [animationState]);

    const downloadConfirmation = () =>
        Alert.alert("Baixar curso", "Deseja baixar este curso para acesso offline?", [
            {
                text: "Cancelar",
                style: "cancel",
            },
            {
                text: "Baixar",
                onPress: async () => {
                    setAnimationState(ANIMATION_STATES.DOWNLOADING);
                    await StorageService.storeCourseLocally(course.course.courseId).then(result => {
                        if (result){
                            setAnimationState(ANIMATION_STATES.FINISHING);
                        } else {
                            alert("Não foi possível baixar o curso. Certifique-se de estar conectado à Internet."); //Could not download course. Make sure you are connected to the internet
                            setAnimationState(ANIMATION_STATES.INITIAL);
                        }
                    });
                },
            },
        ]);

    const removeDownloadConfirmation = () =>
        Alert.alert("Remover curso", "Tem certeza de que deseja remover este curso baixado?", [
            {
                text: "Cancelar",
                style: "cancel",
            },
            {
                text: "Remover",
                onPress: () => {
                    StorageService.deleteLocallyStoredCourse(course.course.courseId).then(result => {
                        if(result){
                            setAnimationState(ANIMATION_STATES.DELETE);
                        } else {
                            alert("Algo deu errado. Não foi possível remover os dados armazenados do curso."); //Something went wrong. Could not remove stored course data.
                            setAnimationState(ANIMATION_STATES.DELETE);
                        }
                    });

                },
                style: "destructive",
            },
        ]);

    // TODO: Implement download functionality - DONE
    // TODO: Change initial state based on if it have already been stored - DONE
    const handlePress = () => {
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
        <Pressable
            onPress={handlePress}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}>
            <LottieView
                ref={animationRef}
                source={require('../../../assets/animations/downloadAnimation.json')}
                height={32}
                width={24}
            />
        </Pressable>
    );
}
