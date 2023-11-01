import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

import ProgressTopBar from './ProgressTopBar';
import LectureScreen from './LectureScreen';
import { getSectionAndLecturesBySectionId, getCourse } from '../../api/api';

export default function LectureSwipeScreen({ route }) {
    const { sectionId, courseId, lectureId } = route.params;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [progressPercent, setProgressPercent] = useState(0);
    const [allLectures, setAllLectures] = useState([]);
    const [currentLectureType, setCurrentLectureType] = useState("text");
    const [index, setIndex] = useState(0);
    const [course, setCourse] = useState(null);


    async function fetchData() {
        try {
            const sectionData = await getSectionAndLecturesBySectionId(sectionId);
            const initialIndex = sectionData.components.findIndex(lecture => lecture._id === lectureId);
            const courseData = await getCourse(courseId);
            const progressPercentage = Math.round(((initialIndex + 1) / sectionData.components.length) * 100);

            console.log("lectures", sectionData.components);
            setAllLectures(sectionData.components);
            setCurrentLectureType(sectionData.components[initialIndex]?.video ? "video" : "text");
            setCourse(courseData);
            setProgressPercent(progressPercentage);
            setIndex(initialIndex);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [sectionId, courseId, lectureId]);

    const handleIndexChange = (_index) => {
        console.log("Index Changed:", _index);
        const currentLecture = allLectures[_index];
        const currentLectureType = currentLecture?.video ? "video" : "text";
        setCurrentLectureType(currentLectureType);
        const currentProgress = Math.round(((_index + 1) / allLectures.length) * 100);
        setProgressPercent(currentProgress);
        setIndex(_index);
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {progressPercent && (
                <View style={{ position: 'absolute', top: 0, zIndex: 10, width: '100%' }}>
                    <ProgressTopBar progressPercent={progressPercent} lectureType={currentLectureType} allLectures={allLectures} currentLectureIndex={index} style={{ backgroundColor: 'transparent' }} />
                </View>
            )}

            {allLectures.length > 0 && course && index !== null && (
                <Swiper
                    index={index}
                    onIndexChanged={(_index) => handleIndexChange(_index)}
                    showsButtons={false}
                    loop={false}
                    showsPagination={false}
                >
                    {allLectures.map((lect, _index) => (
                        <LectureScreen key={_index} currentIndex={index} indexCount={allLectures.length} lectureObject={lect} courseObject={course} />
                    ))}
                </Swiper>
            )}
        </View>
    );
}
