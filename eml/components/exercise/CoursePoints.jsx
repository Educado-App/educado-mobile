import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import Text from '../general/Text';
import Icon from '@mdi/react';
import { mdiStarCircleOutline } from '@mdi/js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchedProfile from '../../test/mockData/test.users.json';
import { getExerciseByid, getSectionByid, getCourse } from '../../api/api';
import AnimatedNumbers from '../gamification/AnimatedNumber';

const CoursePoints = (courseId) => {
  const [coursePoints, setCoursePoints] = useState(0);
  const updatedCoursePoints = 100;

  const getProfile = async () => {
      // USE THIS TO FETCH USER FROM STORAGE WHEN DONE
      //const fetchedProfile = JSON.parse(await AsyncStorage.getItem(USER_INFO));
      console.log(courseId.courseId)
      console.log(fetchedProfile[0].completedCourses[0].courseId.$oid);
  }

  function animation(state, finalValue) {
      if (state < finalValue) {
        const interval = setInterval(() => {
          setCoursePoints((prevNumber) => {
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

    const findCourseByCourseId = (profile, courseId) => {
      if (profile && profile[0] && profile[0].completedCourses) {
        for (let i = 0; i < profile[0].completedCourses.length; i++) {
          if (profile[0].completedCourses[i].courseId?.$oid === courseId.courseId) {
            return profile[0].completedCourses[i].points;
          }
        }
      }
      return null; // Course not found
    };
  
    const course = findCourseByCourseId(fetchedProfile, courseId);
    if (course) {
      console.log('Found course:', course.courseId);
    } else {
      console.log('Course not found');
    }

    useEffect(() => {
      animation(coursePoints, updatedCoursePoints);
      getProfile();
    }, []);

    return (
        <View className="flex-row items-center justify-around">
                <AnimatedNumbers
                    animateToNumber={coursePoints}
                    animationDuration={50}
                    fontStyle={`font-sans-bold text-center`}
                />
        </View>
    );
}

export default CoursePoints;