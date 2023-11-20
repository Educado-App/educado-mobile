import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import VideoLectureScreen from './VideoLectureScreen';
import TextImageLectureScreen from './TextImageLectureScreen';
import StandardButton from '../../components/general/StandardButton';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

export default function LectureScreen({ lectureObject, courseObject, currentIndex, indexCount }) {

  const navigation = useNavigation();
  const [lecture, setLecture] = useState(lectureObject);
  const [progressPercent, setProgressPercent] = useState(null);
  useEffect(() => {
    setLecture(lectureObject);
    setCourse(courseObject);
    const _progressPercent = calculateProgressInPercent();
    setProgressPercent(_progressPercent);

  }, []);

  const [course, setCourse] = useState(courseObject);

  const calculateProgressInPercent = () => {
    return Math.round((currentIndex / indexCount) * 100);
  };

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

          {/*currentIndex === indexCount - 1 ?
           need to send course (courseObject._id) and section (lecture.parentSection) id to completeSection screen */
            /* <StandardButton
              props={{
                buttonText: 'Continuar',
                onPress: () => {navigation.navigate('CompleteSection', 
                  { courseId: courseObject._id, sectionId: lectureObject.parentSection }
                );}
              }}
            />
            : null */
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

LectureScreen.propTypes = {
  lectureObject: PropTypes.object,
  courseObject: PropTypes.object,
  currentIndex: PropTypes.number,
  indexCount: PropTypes.number,
};