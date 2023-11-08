import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import ProgressTopBar from './ProgressTopBar';
import LectureScreen from './LectureScreen';
import { getSectionAndLecturesBySectionId, getCourse } from '../../api/api';
import tailwindConfig from '../../tailwind.config';

/**
 * when navigating to this page sectionId, courseId must be passed as parameters
 * @param {} param0 
 * @returns 
 */
export default function LectureSwipeScreen({ route }) {
  const { sectionId, courseId } = route.params;
  const [loading, setLoading] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const [allLectures, setAllLectures] = useState([]);
  const [currentLectureType, setCurrentLectureType] = useState("text");
  const [index, setIndex] = useState(0);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const sectionData = await getSectionAndLecturesBySectionId(sectionId);
        //TODO: get the first uncompleted lecture - set the initial index to that
        const initialIndex = 0;
        const courseData = await getCourse(courseId);
        const progressPercentage = Math.round(((initialIndex + 1) / sectionData.components.length) * 100);


        setAllLectures(sectionData.components);
        setCurrentLectureType(sectionData.components[initialIndex]?.video ? "video" : "text");
        setCourse(courseData);
        setProgressPercent(progressPercentage);
        setIndex(initialIndex);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchData();
  }, [sectionId, courseId]);

  const handleIndexChange = (_index) => {
    const currentLecture = allLectures[_index];
    const currentLectureType = currentLecture?.video ? "video" : "text";
    setCurrentLectureType(currentLectureType);
    const currentProgress = Math.round(((_index + 1) / allLectures.length) * 100);
    setProgressPercent(currentProgress);
    setIndex(_index);
  };

  if (loading) {
    return (
      <View className="flex-col justify-center items-center" >
        <ActivityIndicator size="large" color={tailwindConfig.theme.colors.primary} />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {allLectures && (
        <View className=" absolute top-0 z-10 w-[100%]">
          <ProgressTopBar lectureType={currentLectureType} allLectures={allLectures} currentLectureIndex={index} />
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

LectureSwipeScreen.propTypes = {
  route: PropTypes.object,
};
