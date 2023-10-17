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
                        <View className=" flex-col items-center justify-center  ">
                            {/* REPLACE THIS WHEN MERGED, THERE SHOULD BE A COMPONENT FOR THIS TOP BAR */}
                            <View className="flex-row w-full just items-center p-[10]">
                                <View className="pl-2">
                                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                                        <MaterialCommunityIcons name="chevron-left" size={25} color="black" />
                                    </TouchableOpacity>
                                </View>
                                <Text className="text-[25px] text-black font-bold ml-[10]">{lecture.title}</Text>
                            </View>
                            <Text className="text-[25px] font-bold ml-[10]">INSERT TEXT LECTURE HERE</Text>
                        </View>
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

