import React, { useState, useEffect, useRef } from 'react';

// For animating play button

import { View, Pressable } from 'react-native';
import Text from '../../components/general/Text';
import VideoActions from '../../components/lectures/VideoActions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomExpoVideoPlayer from '../../components/lectures/VideoPlayer';
import ReactSliderProgress from './ReactSliderProgress';
import { getVideoDownloadUrl } from '../../api/api';
import PropTypes from 'prop-types';


export default function VideoLectureScreen({ lecture, course }) {


  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // Keep track of playback status
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // Keep track of mute status


  const onStatusUpdate = (status) => {
    setPositionMillis(status.positionMillis || 0);
    setDurationMillis(status.durationMillis || 0);

  };



  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const _videoUrl = getVideoDownloadUrl(lecture.video, "180p")



    //test if video is available for download from internet

    setVideoUrl(_videoUrl)
  }, [])

  /* This block does nothing?
    useEffect(() => {
      if (videoRef.current) {
      }
    }, [videoRef]);
  */

  const handlePress = () => {


    if (!videoRef.current) {
      return;
    }


    setIsPlaying(!isPlaying);
  };

  const handleMutepress = () => {

    setIsMuted(!isMuted);
  }

  /* check if video url is valid
  useEffect(() => {
    const _videoUrl = getVideoDownloadUrl(lecture._id, "180p");

    //check for video url validity maybe not needed
    // fetch(_videoUrl, {
    //     method: 'HEAD'
    // })
    //     .then(response => {
    //         if (response.ok) {
    //             // HTTP status between 200-299 or equals 304.
    //             setVideoUrl(_videoUrl);
    //         } else {
    //             console.error('Video URL is not valid');
    //             Alert.alert("Error", "The video is corrupted. Please try again later", "OK");
    //         }
    //     })
    //     .catch(error => {
    //         Alert.alert("Error", "The video is corrupted. Please try again later", "OK");
    //     });
  }, []);
  */



  //Animation vars

  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(false);

  useEffect(() => {
    setShowPlayPauseIcon(true);
    const timer = setTimeout(() => {
      setShowPlayPauseIcon(false);
    }, 500);
    // Clear the timer when the component is unmounted or when isPlaying changes
    return () => clearTimeout(timer);
  }, [isPlaying]);




  return (

    <View className="relative">

      {/* Video - currently just black image */}
      <View className="w-full h-full bg-projectBlack" >

        <View className="w-full h-full  bg-projectBlack" >
          {videoUrl ? <CustomExpoVideoPlayer

            videoUrl={videoUrl}
            ref={videoRef}
            isPlaying={isPlaying}
            isMuted={isMuted}
            onStatusUpdate={onStatusUpdate}
          /> :
            <Text>Loading</Text>
          }
        </View>
      </View>
      {/* Layers on top of video */}

      <View className="absolute w-full h-full p-5">
        <View className="w-full h-full flex-col justify-end items-center  bg-opacity-20" >
          {/* Progress bar (on top) */}
          {/* <ProgressTopBar progressPercent={progress} /> */}
          {/* Lecture information */}

          <View className="w-full flex-col items-start justify-left" >

            <View className="w-full flex-row justify-between items-end">

              <View className=" flex-col">
                <Text className=" text-projectGray"  >Nome do curso: {course.title}</Text>
                <Text className="text-xl text-projectWhite" >{lecture.title && lecture.title}</Text>
              </View>
              <VideoActions isPlaying={isPlaying} isMuted={isMuted} onVolumeClick={handleMutepress} onPlayClick={handlePress} />
            </View>

            <View className="h-[3vh]" />

            {/* Video Progress Bar Component */}
            {/* <VideoProgressBar elapsedMs={positionMillis} totalMs={durationMillis} videoRef={videoRef} /> */}
            <ReactSliderProgress elapsedMs={positionMillis} totalMs={durationMillis} videoRef={videoRef} />



          </View>

        </View>

      </View>

      <Pressable className="absolute top-[12%] bottom-[50%]  right-0 left-0 " onPress={handlePress} />
      <Pressable className="absolute top-[24%] bottom-[22%]  right-[20%] left-0 " onPress={handlePress} />
      {/* Fade in out play /pause icon shown for one second */}
      {/* Fade in/out play/pause icon */}

      {showPlayPauseIcon && (
        <View className="absolute top-0 left-0 right-0 bottom-0 flex-row justify-center items-center" pointerEvents='none'
        >
          <View>
            <MaterialCommunityIcons
              name={isPlaying ? "play" : "pause"}
              size={50}
              color="white"
            />
          </View>
        </View>
      )}
    </View>
  );
}

VideoLectureScreen.propTypes = {
  lecture: PropTypes.object,
  course: PropTypes.object
};