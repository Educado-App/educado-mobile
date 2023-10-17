import React, { useState, useEffect, useRef } from 'react';
import { Alert, View, TouchableOpacity, Pressable } from 'react-native';
import Text from '../../components/general/Text';

import VideoActions from '../../components/lectures/VideoActions';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context';
import CustomExpoVideoPlayer from '../../components/lectures/VideoPlayer';
import ProgressBar from '../../components/progress/ProgressBar';
import VideoProgressBar from './VideoProgressBar';
import ReactSliderProgress from './ReactSliderProgress';
import { downloadFromBucketByFileName } from '../../api/api';

import { useNavigation } from '@react-navigation/native';

export default function VideoLectureScreen({ lecture, course, videoUri }) {


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


    const [video, setVideo] = useState(null);





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


    return (

        <View className=" relative  w-full h-full">

            {/* Video - currently just black image */}
            <View className="w-full h-full bg-black" >

                <Pressable className="w-full h-full z-100 " onPress={handlePress}>
                    <CustomExpoVideoPlayer
                        ref={videoRef}
                        videoUri={videoUri}
                        isPlaying={isPlaying}
                        isMuted={isMuted}
                        onStatusUpdate={onStatusUpdate}
                    />
                </Pressable>
            </View>
            {/* Layers on top of video */}
            <View className="absolute w-full h-full p-5 pb-10" >
                <View className="w-full h-full flex-col justify-between items-center  bg-opacity-20" >
                    {/* Progress bar (on top) */}
                    {/* REPLACE THIS WHEN MERGED, THERE SHOULD BE A COMPONENT FOR THIS TOP BAR */}
                    <View className="flex-row w-full items-center p-[10]">
                        <View className="pl-2">
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                                <MaterialCommunityIcons name="chevron-left" size={25} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text className="text-[25px] text-white font-bold ml-[10]">{lecture.title}</Text>
                    </View>

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
        </View>
    );
}

