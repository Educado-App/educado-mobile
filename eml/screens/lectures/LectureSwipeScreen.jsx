import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import ProgressTopBar from './ProgressTopBar';
import LectureScreen from './LectureScreen';
import { getSectionByid, getCourse, getExerciseById, getLectureById } from '../../api/api';
import tailwindConfig from '../../tailwind.config';
import ExerciseScreen from '../excercise/ExerciseScreen';

import PropTypes from 'prop-types';

const LectureType = {
    TEXT: 'text',
    VIDEO: 'video',
  };

const ComponentType = {
    LECTURE: 'lecture',
    EXERCISE: 'exercise',
  };

/**
 * when navigating to this page sectionId, courseId must be passed as parameters
 * @param {} param0 
 * @returns 
 */
export default function LectureSwipeScreen({ route }) {
    const { sectionId, courseId } = route.params;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [currentLectureType, setCurrentLectureType] = useState(LectureType.TEXT);
    const [index, setIndex] = useState(0);
    const [section, setSection] = useState(null);
    const [course, setCourse] = useState(null);
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [combinedLecturesAndExercises, setCombinedLecturesAndExercises] = useState([]);
    const swiperRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const sectionData = await getSectionByid(sectionId);
                //TODO: get the first uncompleted lecture - set the initial index to that
                const initialIndex = 0;
                const courseData = await getCourse(courseId);

                let _combinedLecturesAndExercises = [];
                for (comp of sectionData.components) {
                    try {
                        let component, lectureType;
                        if (comp.compType === ComponentType.LECTURE) {
                            component = await getLectureById(comp.compId);
                            lectureType = component.video ? LectureType.VIDEO : LectureType.TEXT;
                        } else {
                            component = await getExerciseById(comp.compId);
                        }
                        
                        const obj = {   
                            component: component,
                            type: comp.compType,
                            lectureType: lectureType
                        };

                        _combinedLecturesAndExercises.push(obj);
                    } catch (error) {
                        console.log(error);
                    }
                }

                if (_combinedLecturesAndExercises[0].type === ComponentType.EXERCISE) {
                    setScrollEnabled(false);
                }

                setCombinedLecturesAndExercises(_combinedLecturesAndExercises);
                setCurrentLectureType(_combinedLecturesAndExercises[initialIndex]?.lectureType === LectureType.VIDEO ? LectureType.VIDEO : LectureType.TEXT);
                setSection(sectionData);
                setCourse(courseData);
                setIndex(initialIndex);
                setLoading(false);
            } catch (error) {
                setLoading(true);
            }
        }

        fetchData();
    }, [sectionId, courseId]);


    const handleExerciseContinue = () => {
        swiperRef.current.scrollBy(1, true);
        setScrollEnabled(true);

        if (index === combinedLecturesAndExercises.length - 1) {
            return true;
        } 

        return false;
    }

    const handleIndexChange = (_index) => {
        const currentSlide = combinedLecturesAndExercises[_index];

        if (currentSlide.type === ComponentType.EXERCISE) {
            setScrollEnabled(false);
        } else {
            const currentLectureType = currentSlide?.lectureType === LectureType.VIDEO ? LectureType.VIDEO : LectureType.TEXT;
            setCurrentLectureType(currentLectureType);
        }
        setIndex(_index);
    };

    if (loading || !section || !course || !combinedLecturesAndExercises) {
        return (
            <View className="flex-col justify-center items-center h-screen" >
                <ActivityIndicator size="large" color={tailwindConfig.theme.colors.primary} />
                <Text>Loading...</Text>
            </View>
        );
    } else {
        return (
            <View className="flex-1">
                {combinedLecturesAndExercises && (
                    <View className=" absolute top-0 z-10 w-[100%]">
                        <ProgressTopBar courseObject={course} lectureType={currentLectureType} allLectures={combinedLecturesAndExercises} currentLectureIndex={index} />
                    </View>
                )}

                {combinedLecturesAndExercises.length > 0 && course && index !== null && (
                    <Swiper
                        ref={swiperRef}
                        index={index}
                        onIndexChanged={(_index) => handleIndexChange(_index)}
                        loop={false}
                        showsPagination={false}
                        scrollEnabled={scrollEnabled}
                    >
                        {combinedLecturesAndExercises.map((comp, _index) => (
                            comp.type === ComponentType.LECTURE ?
                                <LectureScreen key={_index} currentIndex={index} indexCount={combinedLecturesAndExercises.length} lectureObject={comp.component} courseObject={course} />
                                :
                                <ExerciseScreen key={_index} exerciseObject={comp.component} sectionObject={section} courseObject={course} onContinue={() => handleExerciseContinue()} />
                        ))}
                    </Swiper>
                )}
            </View>
        );
  }
}

LectureSwipeScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      sectionId: PropTypes.string,
      courseId: PropTypes.string
    }).isRequired,
  }).isRequired,
};
