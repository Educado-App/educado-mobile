import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import AnimatedNumbers from '../gamification/AnimatedNumber';
import { getStudentInfo } from '../../services/StorageService';

const CoursePoints = (courseId) => {
  const [courseStartPoints, setCourseStartPoints] = useState(0);
  const [courseEndPoints, setCourseEndPoints] = useState(0);

  const getProfile = async () => {
    return await getStudentInfo();
  }

  function animation(state, finalValue) {
    if (state < finalValue) {
      const interval = setInterval(() => {
        setCourseStartPoints((prevNumber) => {
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

  const findCoursePointsByCourseId = (profile, courseId) => {
    if (profile && profile.completedCourses) {
      console.log(profile.completedCourses)
      for (let i = 0; i < profile.completedCourses.length; i++) {
        if (profile.completedCourses[i].courseId === courseId.courseId) {
          return profile.completedCourses[i].totalPoints;
        }
      }
    }
    return null; // Course not found
  };

  useEffect(() => {
    const fetchCourse = async () => {
      const studentInfo = await getProfile();
      console.log('studentInfo', studentInfo)
      const studentCoursePoints = findCoursePointsByCourseId(studentInfo, courseId);
      console.log('studentCoursePoints ',studentCoursePoints)

      if (studentCoursePoints) {
        console.log("completed course points:", studentCoursePoints);

        // Set updatedCoursePoints to course.totalPoints
        setCourseEndPoints(studentCoursePoints);

        // Animate the coursePoints
        animation(courseStartPoints, courseEndPoints);
      } else {
        console.log('Course not found');
      }
    };

    fetchCourse();
  }, []);

  return (
    <View className="pr-2 flex-row items-center justify-around">
      <AnimatedNumbers
        animateToNumber={courseEndPoints}
        animationDuration={50}
        fontStyle={`font-sans-bold text-center`}
      />
    </View>
  );
}

export default CoursePoints;