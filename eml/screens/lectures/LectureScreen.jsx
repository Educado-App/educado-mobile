import { React, useState, useEffect } from 'react';
import { Alert, View, TouchableOpacity, Image } from 'react-native';
import Text from '../../components/general/Text';
import ProgressBar from '../../components/progress/ProgressBar';
import CustomProgressBar from '../../components/progress/ProgressBar2';

import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { downloadVideoByFileName, getCourse, getLectureById } from '../../api/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoLectureScreen from './VideoLectureScreen';

import healthLogo from '../../assets/healthLogo.png'
import TextImageLectureScreen from './TextImageLectureScreen';

export default function LectureScreen({ route }) {

    const { lectureId, courseId } = route.params;
    const navigation = useNavigation();
    const [lecture, setLecture] = useState(null);

    useEffect(() => {
        console.log("THIS IS THE LECTURE SCREEN")
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
            console.log("error", err)
        }
    }




    //Safe area should not be used if we want to use the full screen
    return (
        <View className="flex-1 bg-[#f1f9fb] ">

            {lecture && course ?

                <View className="w-screen h-screen flex-col justify-center items-center">
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

