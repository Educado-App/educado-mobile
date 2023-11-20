import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import AnimatedNumbers from '../gamification/AnimatedNumber';
import { getStudentInfo, saveCourseTotalPointsLocally } from '../../services/StorageService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tailwindConfig from '../../tailwind.config';
import PropTypes from 'prop-types';
import { getPointsFromExerciseReceiver, getPointsFromExerciseUnsubscribe } from '../events/receiverEvents';

const CoursePoints = (courseId) => {
  const [coursePoints, setCoursePoints] = useState(0);
  
  const getCompletedCourse = async () => {
    const studentInfo = await getStudentInfo();
    return studentInfo.completedCourses;
  }

  function animation(state, finalValue) {
    if (state < finalValue) {
      const interval = setInterval(() => {
        setCoursePoints((prevNumber) => {
          console.log('prevNumber', prevNumber);
          const nextNumber = prevNumber + 1;
          if (nextNumber >= finalValue) {
            clearInterval(interval);
            return finalValue;
          }
          return nextNumber;
        });
      });
    }
  };

  const updateCoursePoints = (newPoints) => {
    let isFirstIteration = true;
    let finalValue;
    const interval = setInterval(() => {
      setCoursePoints((prevNumber) => {
        if (isFirstIteration) {
          finalValue = prevNumber + newPoints;
          isFirstIteration = false;
        }
        const nextNumber = prevNumber + 1;
        if (nextNumber >= finalValue) {
          clearInterval(interval);
          saveCourseTotalPointsLocally(courseId, finalValue);
          return finalValue;
        }
        return nextNumber;
      });
    }, 50);

    // TODO: brokey, magnus help
    
    
  };

  const fetchCourseAndPoints = async () => {
    try {
      const completedCourses = await getCompletedCourse();
      const currentCourse = completedCourses.find((course) => course.courseId === courseId.courseId);

      if (currentCourse && completedCourses) {
        setCoursePoints(currentCourse.totalPoints);
      } else {
        console.error('Course not found');
        // Handle the case when the course is not found, e.g., set default points or show an error message.
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  useEffect(() => {
    fetchCourseAndPoints();

    getPointsFromExerciseReceiver(updateCoursePoints);
    return () => {
      getPointsFromExerciseUnsubscribe();
    };
  }, []);

  return (
    <View className="pr-2 flex flex-row items-center justify-around">
      {/* <Text className="font-sans-bold"> */}
        {/* {String(coursePoints)}
      </Text> */}
      <AnimatedNumbers
        animateToNumber={coursePoints}
        animationDuration={500}
        fontStyle={`font-sans-bold text-center`}
      />
      <MaterialCommunityIcons name="crown-circle" size={20} color={tailwindConfig.theme.colors.yellow} />
    </View>
  );
}

CoursePoints.propTypes = {
  courseId: PropTypes.string,
};

export default CoursePoints;