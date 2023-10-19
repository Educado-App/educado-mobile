import React, { useState, useEffect, useRef } from 'react';

// For animating play button

import { Alert, View, TouchableOpacity, Pressable } from 'react-native';


import Text from '../../components/general/Text';

import VideoActions from '../../components/lectures/VideoActions';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context';

import CustomExpoVideoPlayer from '../../components/lectures/VideoPlayer';
import ProgressBar from '../../components/progress/ProgressBar';
import VideoProgressBar from './VideoProgressBar';
import ReactSliderProgress from './ReactSliderProgress';
import { getVideoDownloadUrl } from '../../api/api';

import { useNavigation } from '@react-navigation/native';
import ProgressTopBar from './ProgressTopBar';

export default function VideoLectureScreen({ lecture, course }) {


    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true); // Keep track of playback status
    const [positionMillis, setPositionMillis] = useState(0);
    const [durationMillis, setDurationMillis] = useState(0);
    const [isMuted, setIsMuted] = useState(false); // Keep track of mute status


    const onStatusUpdate = (status) => {
        setPositionMillis(status.positionMillis || 0);
        setDurationMillis(status.durationMillis || 0);
        //setIsPlaying(status.isPlaying || false);
        // console.log("onStatusUpdate", status.positionMillis);
    };


    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
        const _videoUrl = getVideoDownloadUrl(lecture._id, "180p")

        console.log("INSIDE VIDEO LECTURE SCREEN", _videoUrl)
        setVideoUrl(_videoUrl)
    }, [])


    useEffect(() => {
        console.log(course)
        if (videoRef.current) {
            // console.log("Video Ref is now set:");
        }
    }, [videoRef]);

    const handlePress = () => {


        if (!videoRef.current) {
            console.log("Video Ref is not set:");
            return;
        }


        setIsPlaying(!isPlaying);
        console.log("handlePress,", !isPlaying ? "pausing" : "playing");
    };

    const handleMutepress = () => {
        console.log("handleMutepress,", isMuted ? "unmuting" : "muting");

        setIsMuted(!isMuted);
    }





    const navigation = useNavigation();




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


    //get ios or android version
    const [ios, setIos] = useState(false);
    useEffect(() => {
        if (Platform.OS === 'ios') {
            setIos(true);
        }
    }, [])

    return (

        <View className=" relative  w-screen h-screen">

            {/* Video - currently just black image */}
            <View className="w-full h-full bg-black" >

                <View className="w-full h-full " >
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

            <View className={"absolute w-full h-full p-5 pb-20"}>
                <View className="w-full h-full flex-col justify-between items-center  bg-opacity-20" >
                    {/* Progress bar (on top) */}
                    <ProgressTopBar progressPercent={75} />
                    {/* Lecture information */}

                    <View className="w-full flex-col items-start justify-left" >

                        <View className="w-full flex-row justify-between items-end">

                            <View className=" flex-col">
                                <Text className=" text-gray " >Course Name: {course.title}</Text>
                                <Text className=" text-2xl font-bold text-white " >{lecture.title && lecture.title}</Text>
                            </View>
                            <VideoActions isPlaying={isPlaying} isMuted={isMuted} onVolumeClick={handleMutepress} onPlayClick={handlePress} />
                        </View>

                        <View className="h-[2vh]" />

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
                            name={isPlaying ? "pause" : "play"}
                            size={50}
                            color="white"
                        />
                    </View>
                </View>
            )}





        </View>
    );
}

