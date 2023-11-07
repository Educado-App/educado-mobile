import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import Text from '../general/Text';
import Icon from '@mdi/react';
import { mdiStarCircleOutline } from '@mdi/js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchedProfile from '../../test/mockData/test.users.json';

const CoursePoints = () => {
    const [coursePoints, setCoursePoints] = useState("0");

    const getProfile = async () => {
        
        // USE THIS TO FETCH USER FROM STORAGE WHEN DONE
        //const fetchedProfile = JSON.parse(await AsyncStorage.getItem(USER_INFO));
        console.log(fetchedProfile.email);
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <View className="flex-row items-center justify-around">
            <Text className='px-5 text-center font-montserrat-bold text-caption-medium text-projectBlack'>
                {coursePoints}
            </Text>
        </View>
    );
}

export default CoursePoints;