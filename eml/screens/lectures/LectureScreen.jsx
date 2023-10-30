import React, { useState, useEffect } from 'react';
import { Alert, View, TouchableOpacity, Image, Text, Pressable} from 'react-native';
import ProgressBar from '../../components/progress/ProgressBar';
import CustomProgressBar from '../../components/progress/ProgressBar2';

import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { downloadVideoByFileName, getCourse, getLectureById } from '../../api/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoLectureScreen from './VideoLectureScreen';
import TextImageLectureScreen from './TextImageLectureScreen';
import { Swipeable } from 'react-native-gesture-handler';
import { useRef } from 'react';



//import healthLogo from '../../assets/healthLogo.png'

export default function LectureScreen({ route }) {

    const { lectureId, courseId, lectures } = route.params;
    const navigation = useNavigation();
    const [lecture, setLecture] = useState(null);
    const [pastLecture, setPastLecture] = useState(null);
    const [nextLecture, setNextLecture] = useState(null);


    useEffect(() => {
        getLecture(lectureId);
        getCourseById(courseId);
        calcPastAndNextLecture();

    }, [])

    const calcPastAndNextLecture = () => {
        let past = null;
        let next = null;
        for (let i = 0; i < lectures.length; i++) {
            if (lectures[i]._id == lectureId) {
                if (i > 0) {
                    past = lectures[i - 1];
                }
                if (i < lectures.length - 1) {
                    next = lectures[i + 1];
                }
                break;
            }
        }
        setPastLecture(past);
        setNextLecture(next);
    }

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

    // const renderRightAction = (progress, dragX) => {
    //     if (!nextLecture) return null;
    //     return (
    //         <TouchableOpacity 
    //             className="flex flex-row justify-center items-center pt-16 bg-error"
    //             onPress={() => {
    //                 navigation.push('Lecture', {
    //                     lectureId: nextLecture._id,
    //                     courseId,
    //                     lectures
    //                 });
    //             }}
    //         >
    //             <Text className="2xl text-black">Next Lecture</Text>
    //         </TouchableOpacity>
    //     );
    // };

    // const renderLeftAction = (progress, dragX) => {
    //     if (!pastLecture) return null;
    //     return (
    //         <TouchableOpacity 
    //             className="flex flex-row justify-center items-center pt-16 bg-success"
    //             onPress={() => {
    //                 navigation.push('Lecture', {
    //                     lectureId: pastLecture._id,
    //                     courseId,
    //                     lectures
    //                 });
    //             }}
    //         >
    //             <Text className="2xl text-black">Previous Lecture</Text>
    //         </TouchableOpacity>
    //     );
    // };

    const swipeableRef = useRef(null);

    const handleSwipe = () => {
        if (swipeableRef.current) {
            const { x } = swipeableRef.current.getTranslateX();
            if (x > 0 && pastLecture) {
                console.log("swipe right")
                navigation.push('Lecture', {
                    lectureId: pastLecture._id,
                    courseId,
                    lectures
                });
            } else if (x < 0 && nextLecture) {
                console.log("swipe left")
                navigation.push('Lecture', {
                    lectureId: nextLecture._id,
                    courseId,
                    lectures
                });
            }
        }
    };

    
    //Safe area should not be used if we want to use the full screen
    return (

        
        
        <View className="flex-1 bg-projectWhite ">
            <Swipeable
                ref={swipeableRef}
                onSwipeableOpen={handleSwipe}
            >
            {lecture && course ?

                <View className="w-full h-full flex-col justify-center items-center">
                    
                    {lecture.video ?
                        <VideoLectureScreen pastLecture={pastLecture} nextLecture={nextLecture} lectures={lectures} lecture={lecture} course={course} />
                        :
                        <TextImageLectureScreen pastLecture={pastLecture} nextLecture={nextLecture} lectures={lectures} lecture={lecture} course={course} />
                    }
                </View>
                :
                <View className="w-full h-full items-center justify-center align-middle">
                    <Text className="text-[25px] font-bold ml-[10]">loading...</Text>
                </View>

            }
            </Swipeable>
        </View>
        
    );
}

