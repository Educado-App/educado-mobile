import React, { useState, useEffect } from 'react';
import { Alert, View, TouchableOpacity, Image, Text } from 'react-native';
import CustomProgressBar from '../../components/exercise/Progressbar';

import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { downloadVideoByFileName, getCourse, getLectureById } from '../../api/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoLectureScreen from './VideoLectureScreen';
import TextImageLectureScreen from './TextImageLectureScreen';
import Swiper from 'react-native-swiper';


import { getSectionAndLecturesBySectionId } from '../../api/api';
import LectureScreen from './LectureScreen';
import ProgressTopBar from './ProgressTopBar';


//import healthLogo from '../../assets/healthLogo.png'

export default function LectureSwipeScreen({ route }) {

    const { sectionId, courseId, lectureId } = route.params;
    const [course, setCourse] = useState(null);
    const [lecture, setLecture] = useState(null);
    const [progressPercent, setProgressPercent] = useState(0);
    const [index, setIndex] = useState(null);
    const navigation = useNavigation();
    //const [lecture, setLecture] = useState(null);
    const [lectureObject, setLectureObject] = useState(null);
    const [courseObject, setCourseObject] = useState(null);


    const findCorrectLectureIndexById = (currentLectureId, _allLectures) => {
        let index = 0
        index = _allLectures.findIndex((lecture) => {
            return lecture._id === currentLectureId;
        }
        )

        setIndex(index);

    }



    useEffect(() => {
        console.log("lectureSwipeScreen useEffect")
        console.log("sectionID", sectionId)
        console.log("courseId", courseId)
        console.log("lectureId", lectureId)
        getAllLecturesBySectionId(sectionId);
        getCourseById(courseId);
        setLecture(lectureObject);
        setCourse(courseObject);
        setProgressPercent(calculateProgressInPercent());


    }, [])

    const calculateProgressInPercent = (_index) => {
        const _currentProgress = Math.round(((_index + 1) / allLectures.length) * 100);
        setProgressPercent(_currentProgress);

    }

    const handleIndexChange = (_index) => {
        calculateProgressInPercent(_index)
        getCurrentLectureType(_index);
    }


    const getCurrentLectureType = (_index) => {
        const _currentLecture = allLectures[_index];

        const _currentLectureType = _currentLecture?.video ? "video" : "text";
        setCurrentLectureType(_currentLectureType);
    }

    const [currentLectureType, setCurrentLectureType] = useState("text");

    const [allLectures, setAllLectures] = useState([]); // [lecture1, lecture2, lecture3

    const getAllLecturesBySectionId = async (id) => {

        const res = await getSectionAndLecturesBySectionId(id);
        setAllLectures(res.components);
        findCorrectLectureIndexById(lectureId, res.components);


    }



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
        <View className="flex-1">

            {allLectures &&
                <View className=" absolute top-0 z-10 w-[100%]">
                    <ProgressTopBar progressPercent={progressPercent} lectureType={currentLectureType} className={"bg-projectTransparent"} />
                </View>
            }

            {allLectures && course && index !== null &&
                <Swiper

                    index={index}
                    onIndexChanged={(_index) => handleIndexChange(_index)}
                    key={index}
                    showsButtons={false} // Show next and prev buttons
                    loop={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    showsPagination={false}
                >
                    {allLectures.map((lect, index) => (
                        <LectureScreen key={index} currentIndex={index} indexCount={allLectures.length} lectureObject={lect} courseObject={course} />
                    ))}
                </Swiper>
            }

        </View>
    );
}

