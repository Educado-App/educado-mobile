import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

import ProgressTopBar from './ProgressTopBar';
import LectureScreen from './LectureScreen';
import { getSectionAndLecturesBySectionId, getCourse } from '../../api/api';
import tailwindConfig from '../../tailwind.config';

import { getExerciseBySectionId } from '../../api/api';
import ExerciseScreen from '../excercise/ExerciseScreen';

import PropTypes from 'prop-types';

/**
 * when navigating to this page sectionId, courseId must be passed as parameters
 * @param {} param0 
 * @returns 
 */
export default function LectureSwipeScreen({ route }) {
  const { sectionId, courseId } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [currentLectureType, setCurrentLectureType] = useState('text');
  const [index, setIndex] = useState(0);
  const [course, setCourse] = useState(null);


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
            type: 'lecture',
            done: true
          });

        });

        if (_exercisesInSection.length > 0) {
          //then add all exercises
          _exercisesInSection.forEach(exercise => {
            _combinedLecturesAndExercises.push({
              component: exercise,
              type: 'exercise',
              done: false
            });
          });

        }


        setCombinedLecturesAndExercises(_combinedLecturesAndExercises);
        setCurrentLectureType(sectionData.components[initialIndex]?.video ? 'video' : 'text');
        setCourse(courseData);
        setIndex(initialIndex);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchData();
  }, [sectionId, courseId]);


  const swiperRef = useRef(null);

  const handleExerciseContinue = (_index) => {

    //update the exercise to be marked as done
    const _combinedLecturesAndExercises = [...combinedLecturesAndExercises];
    _combinedLecturesAndExercises[_index].done = true;
    setCombinedLecturesAndExercises(_combinedLecturesAndExercises);
    //scroll to next if not last index
    if (_index < combinedLecturesAndExercises.length - 1) {
      swiperRef.current.scrollTo(_index + 1, true);
    }
    else {
      navigation.goBack();
    }
  };

  const handleIndexChange = (_index) => {
    const currentLecture = combinedLecturesAndExercises[_index];


    if (_index > 0) {
      const previousLecture = combinedLecturesAndExercises[_index - 1];

      // Check if the current component is not marked as done
      if (!previousLecture.done) {
        // Disable scrolling to the next slide
        swiperRef.current.scrollBy(0);
      }
    }

    const currentLectureType = currentLecture?.component?.video ? 'video' : 'text';
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
          ref={swiperRef}
          index={index}
          onIndexChanged={(_index) => handleIndexChange(_index)}
          showsButtons={false}
          loop={false}
          showsPagination={false}
        >
          {combinedLecturesAndExercises.map((comp, _index) => (
            comp.type === 'lecture' ?
              <LectureScreen key={_index} currentIndex={index} indexCount={combinedLecturesAndExercises.length} lectureObject={comp.component} courseObject={course} />
              :
            /**
                             * The exercise screen is not yet implemented because it didnt work in this branch
                             * I made a function for fecthing the exercises
                             * the exercise components are can be accessed via:
                             * comp.component
                             */
              <ExerciseScreen key={_index} givenId={comp.component._id} onContinue={() => handleExerciseContinue(_index)} />
          ))}
        </Swiper>
      )}
    </View>
  );
}

LectureSwipeScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      sectionId: PropTypes.string,
      courseId: PropTypes.string
    }).isRequired,
  }).isRequired,
};
