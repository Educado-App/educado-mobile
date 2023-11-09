import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import Text from '../general/Text';
import Icon from '@mdi/react';
import { mdiStarCircleOutline } from '@mdi/js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchedProfile from '../../test/mockData/test.users.json';
import { getExerciseByid, getSectionByid, getCourse } from '../../api/api';
import AnimatedNumbers from '../gamification/AnimatedNumber';

const CoursePoints = () => {
    const [coursePoints, setCoursePoints] = useState(0);

    const updatedCoursePoints = 50;

    /*
    const getProfile = async () => {
        
        // USE THIS TO FETCH USER FROM STORAGE WHEN DONE
        //const fetchedProfile = JSON.parse(await AsyncStorage.getItem(USER_INFO));
        console.log(fetchedProfile[0].email);
        setCoursePoints(10);
        console.log(coursePoints);
    }
    */

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

    /*
    useEffect(() => {
        const fetchData = async () => {
          try {
            setExerciseData(exercise = await getExerciseByid(givenId));
            setSectionData(section = await getSectionByid(exercise.parentSection));
            setCourseData(course = await getCourse(section.parentCourse));
            setHasData(true);
          } catch (error) {
            console.log('Error fetching data:', error);
            navigation.navigate('ErrorScreen');
          }
        };
      
        fetchData();
      }, [route.params]);
      */
    /*
    useEffect(() => {
        getProfile();
    }, []);
    */

    useEffect(() => {
      animation(coursePoints, updatedCoursePoints);
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