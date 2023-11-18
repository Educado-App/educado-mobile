import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import AnimatedNumbers from '../gamification/AnimatedNumber';
import { getStudentInfo, saveCourseTotalPoints } from '../../services/StorageService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tailwindConfig from '../../tailwind.config';
import PropTypes from 'prop-types';
import { getPointsFromExerciseReceiver, getPointsFromExerciseUnsubscribe } from '../events/receiverEvents';
import Text from '../general/Text';

const CoursePoints = (courseId) => {
  const [coursePoints, setCoursePoints] = useState(0);
  const [completedCoursesList, setCompletedCoursList] = useState([]);
  
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
    setCoursePoints((prevNumber) => {
      const updatedPoints = prevNumber + newPoints;
      // brokey, magnus help
      //saveCourseTotalPoints(completedCoursesList, courseId, updatedPoints);
      return updatedPoints;
    });
  };

  const fetchCourseAndPoints = async () => {
    try {
      const completedCourses = await getCompletedCourse();
      const currentCourse = completedCourses.find((course) => course.courseId === courseId.courseId);

      if (currentCourse && completedCourses) {
        setCompletedCoursList(completedCourses);
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
    getPointsFromExerciseUnsubscribe();
  }, []);

  return (
    <View className="pr-2 flex flex-row items-center justify-around">
      <Text className="font-sans-bold">
        {String(coursePoints)}
      </Text>
      {/* <AnimatedNumbers
        animateToNumber={coursePoints}
        animationDuration={5000}
        fontStyle={`font-sans-bold text-center`}
      /> */}
      <MaterialCommunityIcons name="crown-circle" size={20} color={tailwindConfig.theme.colors.yellow} />
    </View>
  );
}

CoursePoints.propTypes = {
  courseId: PropTypes.string,
};

export default CoursePoints;