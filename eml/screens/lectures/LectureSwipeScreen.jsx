import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

import ProgressTopBar from './ProgressTopBar';
import LectureScreen from './LectureScreen';
import { getSectionAndLecturesBySectionId, getCourse } from '../../api/api';
import tailwindConfig from '../../tailwind.config';

import { getExerciseBySectionId } from '../../api/api';
import ExerciseScreen from '../excercise/ExerciseScreen';

/**
 * when navigating to this page sectionId, courseId must be passed as parameters
 * @param {} param0 
 * @returns 
 */
export default function LectureSwipeScreen({ route }) {
    const { sectionId, courseId } = route.params;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [allLectures, setAllLectures] = useState([]);
    const [currentLectureType, setCurrentLectureType] = useState("text");
    const [index, setIndex] = useState(0);
    const [course, setCourse] = useState(null);
    const [exercises, setExercises] = useState([]);

    const [combinedLecturesAndExercises, setCombinedLecturesAndExercises] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const sectionData = await getSectionAndLecturesBySectionId(sectionId);
                //TODO: get the first uncompleted lecture - set the initial index to that

                const initialIndex = 0;
                const courseData = await getCourse(courseId);

                //get exercises
                const _exercisesInSection = await getExerciseBySectionId(sectionId);
                const _lectures = sectionData.components;
                let _combinedLecturesAndExercises = [];

                //first add all lectures
                _lectures.forEach(lecture => {
                    _combinedLecturesAndExercises.push({
                        component: lecture,
                        type: "lecture"
                    });

                });

                if (_exercisesInSection.length > 0) {

                    console.log("exercises", _exercisesInSection)
                    setExercises(_exercisesInSection);

                    //then add all exercises
                    _exercisesInSection.forEach(exercise => {
                        _combinedLecturesAndExercises.push({
                            component: exercise,
                            type: "exercise"
                        });
                    });

                }


                setCombinedLecturesAndExercises(_combinedLecturesAndExercises);
                setAllLectures(sectionData.components);
                setCurrentLectureType(sectionData.components[initialIndex]?.video ? "video" : "text");
                setCourse(courseData);
                setIndex(initialIndex);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }

        fetchData();
    }, [sectionId, courseId]);


    const handleIndexChange = (_index) => {

        const currentLecture = combinedLecturesAndExercises[_index];
        const currentLectureType = currentLecture?.component?.video ? "video" : "text";
        setCurrentLectureType(currentLectureType);
        setIndex(_index);
    };

    if (loading) {
        return (
            <View className="flex-col justify-center items-center" >
                <ActivityIndicator size="large" color={tailwindConfig.theme.colors.primary} />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1">
            {combinedLecturesAndExercises && (
                <View className=" absolute top-0 z-10 w-[100%]">
                    <ProgressTopBar lectureType={currentLectureType} allLectures={combinedLecturesAndExercises} currentLectureIndex={index} />
                </View>
            )}

            {combinedLecturesAndExercises.length > 0 && course && index !== null && (
                <Swiper
                    index={index}
                    onIndexChanged={(_index) => handleIndexChange(_index)}
                    showsButtons={false}
                    loop={false}
                    showsPagination={false}
                >
                    {combinedLecturesAndExercises.map((comp, _index) => (
                        comp.type === "lecture" ?
                            <LectureScreen key={_index} currentIndex={index} indexCount={combinedLecturesAndExercises.length} lectureObject={comp.component} courseObject={course} />
                            :
                            /**
                             * The exercise screen is not yet implemented because it didnt work in this branch
                             * I made a function for fecthing the exercises
                             * the exercise components are can be accessed via:
                             * comp.component
                             */
                            <View className="flex-1 flex-col justify-center items-center">
                                <Text>Exercise team,</Text>
                                <Text>Add you exercise screen here</Text>
                            </View>
                    ))}
                </Swiper>
            )}
        </View>
    );
}
