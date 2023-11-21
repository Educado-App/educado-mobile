import React, { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import AnimatedNumbers from '../gamification/AnimatedNumber';
import { getStudentInfo, saveCourseTotalPointsLocally } from '../../services/StorageService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tailwindConfig from '../../tailwind.config';
import PropTypes from 'prop-types';
import { getPointsFromExerciseReceiver, getPointsFromExerciseUnsubscribe } from '../events/receiverEvents';

const CoursePoints = (courseId) => {
  const [coursePoints, setCoursePoints] = useState(0);
  const [scale, setScale] = useState(1);
  
  const getCompletedCourse = async () => {
    const studentInfo = await getStudentInfo();
    return studentInfo.completedCourses;
  };

  const updateCoursePoints = (newPoints) => {
    let isFirstIteration = true;
    let finalValue;
    let counter = 0;
    setScale(1.5);
    const interval = setInterval(() => {
      counter++;
      setCoursePoints((prevNumber) => {
        if (isFirstIteration) {
          finalValue = prevNumber + newPoints;
          isFirstIteration = false;
        }
        const nextNumber = prevNumber + 1;
        if (nextNumber >= finalValue) {
          clearInterval(interval);
          saveCourseTotalPointsLocally(courseId, finalValue);
          setTimeout(() => {
            setScale(1);
          }, 75 * counter);
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
    <Animated.View className="flex flex-row items-center justify-around pr-2"
      style={[
        {
          transform: [
            {
              scale: scale,
            },
          ],
        },
      ]}
    >
      <AnimatedNumbers
        animateToNumber={coursePoints}
        animationDuration={500}
        fontStyle={'font-sans-bold text-center'}
      />
      <MaterialCommunityIcons name="crown-circle" size={20} color={tailwindConfig.theme.colors.yellow} />
    </Animated.View>
  );
};

CoursePoints.propTypes = {
  courseId: PropTypes.string,
};

export default CoursePoints;