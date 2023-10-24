import React, { useState, useEffect } from 'react';
import { Alert, View, TouchableOpacity, Image, Text} from 'react-native';
import ProgressBar from '../../components/progress/ProgressBar';
import CustomProgressBar from '../../components/progress/ProgressBar2';

import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { downloadVideoByFileName, getCourse, getLectureById } from '../../api/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoLectureScreen from './VideoLectureScreen';
import TextImageLectureScreen from './TextImageLectureScreen';


//import healthLogo from '../../assets/healthLogo.png'

export default function LectureScreen({ route }) {

    const { lectureId, courseId } = route.params;
    const navigation = useNavigation();
    const [lecture, setLecture] = useState(null);

    useEffect(() => {
        getLecture(lectureId);
        getCourseById(courseId);
    }, [])

    const getLecture = async (id) => {
        const res = await getLectureById(id);
        setLecture(res);
    }

    const [course, setCourse] = useState(null);

    const getCourseById = async (id) => {

        try {
            const res = await getCourse(id);
            setCourse(res);
        }
        catch (err) {

        }
    }

    //Safe area should not be used if we want to use the full screen
    return (
        <View className="flex-1 bg-projectWhite ">

            {lecture && course ?

                <View className="w-full h-full flex-col justify-center items-center">
                    <Text>Hej</Text>
                    {lecture.video ?
                        <VideoLectureScreen lecture={lecture} course={course} />
                        :
                        <TextImageLectureScreen lecture={lecture} course={course} />
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

