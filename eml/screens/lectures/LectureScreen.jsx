import React, { useState, useEffect } from 'react';
import { Alert, View, TouchableOpacity, Image, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import VideoLectureScreen from './VideoLectureScreen';
import TextImageLectureScreen from './TextImageLectureScreen';
import ProgressTopBar from './ProgressTopBar';

export default function LectureScreen({ lectureObject, courseObject, currentIndex, indexCount }) {

    const navigation = useNavigation();
    const [lecture, setLecture] = useState(lectureObject);
    const [progressPercent, setProgressPercent] = useState(null);
    useEffect(() => {
        setLecture(lectureObject);
        setCourse(courseObject);
        const _progressPercent = calculateProgressInPercent();
        setProgressPercent(_progressPercent);

    }, [])

    const [course, setCourse] = useState(courseObject);

    const calculateProgressInPercent = () => {
        return Math.round((currentIndex / indexCount) * 100);
    }

    //Safe area should not be used if we want to use the full screen
    return (
        <View className="flex-1 bg-projectWhite">

            {lecture && course ?
                <View className="w-full h-full flex-col justify-center items-center">

                    {lecture.video ?
                        <VideoLectureScreen lecture={lecture} progress={progressPercent} course={course} />
                        :
                        <TextImageLectureScreen lecture={lecture} course={course} progress={progressPercent} />
                    }
                </View>
                :
                <View className="w-full h-full items-center justify-center align-middle">
                    <Text className="text-[25px] font-bold ml-[10]">loading...</Text>
                </View>

            }
        </View>
    );
}

