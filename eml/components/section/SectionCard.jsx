import React, { useState, useEffect } from 'react';
import { View, Pressable, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from '../general/Text';
import Collapsible from "react-native-collapsible";
import { useNavigation } from '@react-navigation/native';

import { getSectionAndLecturesBySectionId } from "../../api/api";



/**
 * Renders a card component for a section of a course.
 * @param {Object} props - The component props.
 * @param {Object} props.section - The section object containing information about the section.
 * @returns {JSX.Element} - The JSX element representing the section card component.
 */

export default function SectionCard({ section }) {

    // hardcoded for now

    const completed = 0;

    const navigation = useNavigation();
    const isComplete = completed === section.total;
    const inProgress = 0 < completed && completed < section.total;
    const notpossible = completed > section.total;
    const [isOpen, setIsOpen] = useState(false);
    const className = isComplete ? "bg-[#87eb8e]" : inProgress ? "bg-[#87CEEB]" : notpossible ? "bg-[#F20000]" : {};


    useEffect(() => {



        fetchLectures(section.sectionId);


        //get section with lectures


    }, []);

    //function for fetching lectures in section
    const [lectures, setLectures] = useState([]); // [lecture1, lecture2, lecture3
    const fetchLectures = async (sectionId) => {
        console.log("fetching lectures for section: " + sectionId);
        const res = await getSectionAndLecturesBySectionId(sectionId);

        if (!res?.components) {
            setLectures([])
            return;
        }

        setLectures(res.components);

        console.log("lectures ", res.components)
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    const handleImagePress = () => {
        navigation.navigate('HomeStack'); // Replace with the name of the target screen
    }


    //const navigation = useNavigation();
    // Empty function that does nothing
    const handleLecturePress = (lectureId) => {
        navigation.navigate('Lecture', {
            lectureId: lectureId
        })
    };



    return (
        <View className="bg-transparent m-[8] rounded-[10px] shadow-[0px 2px 4.65px #000] shadow-opacity-[0.3]">
            <Pressable onPress={toggleDropdown} className="bg-[#fff] rounded-[10px] mb-[15] mx-[18] overflow-hidden elevation-[8]">
                <View className={"flex-row items-center justify-between px-[25] py-[15] " + className}>
                    <Text className="text-[16px] font-bold text-black flex-[1]">
                        {section.title}
                    </Text>
                    <Text className="mr-[10] text-black">
                        {completed}/{section.total} completed
                    </Text>
                    <MaterialCommunityIcons
                        name={isOpen ? "chevron-up" : "chevron-down"}
                        size={25}
                        color="gray"
                    />
                </View>

                <Collapsible collapsed={!isOpen}>

                    <View className="h-[1px] bg-[#e0e0e0]" />
                    <Text className="mx-[20] my-[10]">{section.description}</Text>
                    <View className="w-[100%]">

                        {/* Lectures */}
                        {lectures && lectures.map((lecture) => {

                            return (
                                <Pressable key={lecture._id} onPress={() => {
                                    handleLecturePress(lecture._id);
                                    console.log("pressed lecture: " + lecture._id);
                                }} >
                                    <View key={lecture.lectureId} className={`flex-row items-center justify-between px-[25] py-[15]
                                ${lecture.completed ? "bg-[#87eb8e]" : "bg-[#fff]"}
                                ` }>
                                        <Text className="text-[16px] font-bold text-black flex-[1]">
                                            {lecture.title}
                                        </Text>
                                        <Text className="mr-[10] text-black">
                                            {lecture.completed ? "Completed" : "Not completed"}
                                        </Text>
                                    </View>
                                </Pressable>
                            )

                        })}
                        <TouchableOpacity className="w-[100%] h-[300] items-center justify-center relative"
                            onPress={handleImagePress}>
                            <Image source={require('../../assets/sectionThumbnail.png')} className="w-[100%] h-[300] object-cover" />
                            <View className="absolute z-[1]">
                                <MaterialCommunityIcons name="play-circle-outline" size={100} color="lightblue" />
                            </View>
                        </TouchableOpacity>

                    </View>
                </Collapsible>
            </Pressable>
        </View>
    );
}

