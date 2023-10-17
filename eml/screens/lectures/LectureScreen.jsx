import { React, useState, useEffect } from 'react';
import { Alert, View, TouchableOpacity } from 'react-native';
import Text from '../../components/general/Text';
import ProgressBar from '../../components/progress/ProgressBar';

import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { getCourse, getLectureById } from '../../api/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoLectureScreen from './VideoLectureScreen';
import { downloadFromBucketByFileName } from '../../api/api';

export default function LectureScreen({ route }) {

    const { lectureId, courseId } = route.params;
    const navigation = useNavigation();
    const [lecture, setLecture] = useState(null);

    useEffect(() => {
        console.log("THIS IS THE LECTURE SCREEN")
        getLecture(lectureId);
        getCourseById(courseId);
        downloadVideo(lectureId);
    }, [])

    const [video, setVideo] = useState(null);

    //download video
    const downloadVideo = async (fileId) => {

        try {
            console.log("DOWNLOADINGVIDEO")
            const vidRes = await downloadFromBucketByFileName(fileId + "_transcoded360x640.mp4");
            setVideo(vidRes)
            console.log("vidRes", vidRes)
        }
        catch (err) {
            console.log(err)
        }
    }



    const getLecture = async (id) => {
        const res = await getLectureById(id);
        setLecture(res);
    }

    const [course, setCourse] = useState(null);

    const getCourseById = async (id) => {

        try {
            const res = await getCourse(id);
            console.log(res)
            setCourse(res);
        }
        catch (err) {
            console.log("error", err)
        }
    }




    return (

        <View className="flex-1 bg-[#f1f9fb]">
            <SafeAreaView>
                {lecture && course ?

                    <View>
                        {video ?
                            <VideoLectureScreen lecture={lecture} course={course} videoUri={video} />
                            :
                            <View className="w-full h-full items-center justify-center align-middle">
                                {/* REPLACE THIS WHEN MERGED, THERE SHOULD BE A COMPONENT FOR THIS TOP BAR */}
                                <View className="flex-row w-full items-center p-[10]">
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
            </SafeAreaView>
        </View>
    );
}

