import React, { useState, useEffect } from 'react';
import { View, Pressable, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from '../general/Text';
import Collapsible from "react-native-collapsible";
import { useNavigation } from '@react-navigation/native';

import { getSectionAndLecturesBySectionId } from "../../api/api";


/**
 * A component that displays a section card with collapsible content.
 * @param {Object} section - The section object containing the section data.
 * @returns {JSX.Element} - The SectionCard component.
 */
export default function SectionCard({ section }) {

    // hardcoded for now

    const completed = 0;

    const navigation = useNavigation();
    const isComplete = completed === section.total;
    const inProgress = 0 < completed && completed < section.total;
    const notPossible = completed > section.total;
    const [isOpen, setIsOpen] = useState(false);
    const backgroundColor = isComplete ? "bg-limeGreenDarker" : inProgress ? "bg-cyanBlue" : notPossible ? "bg-error" : {};

    /**
     * Toggles the dropdown state.
     */
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    /**
     * Handles the image press event.
     */
    const handleImagePress = () => {
        navigation.navigate('Exercise'); // Replace with the name of the target screen
    }

    useEffect(() => {

        fetchLectures(section.sectionId);


        //get section with lectures


    }, []);

    //function for fetching lectures in section
    const [lectures, setLectures] = useState([]); // [lecture1, lecture2, lecture3
    const fetchLectures = async (sectionId) => {
        const res = await getSectionAndLecturesBySectionId(sectionId);
        if (!res?.components) {
            setLectures([])
            return;
        }
        setLectures(res.components);
    }

    const handleLecturePress = () => {


        //TODO: FIX THIS TO OPEN THE NEXT LECTURE TO COMPLETE
        const _lectureId = lectures[0]._id;
        console.log("lectureId: " + _lectureId);

        navigation.navigate('Lecture', {
            sectionId: section.sectionId,
            lectureId: _lectureId,
            courseId: section.parentCourseId,
        })
    };


    return (
        <View>
            <Pressable testID="collapsible" onPress={toggleDropdown} className="bg-projectWhite rounded-lg shadow-lg shadow-opacity-[0.3] mb-[15] mx-[18] overflow-hidden elevation-[8]">
                <View className={"flex-row items-center justify-between px-[25] py-[15] " + backgroundColor}>
                    <Text className="text-[16px] font-bold text-black flex-[1]">
                        {section.title}
                    </Text>
                    <Text className="mr-[10] text-black">
                        {/* completed */}
                        {completed}/{section.total} concluídos
                    </Text>
                    <MaterialCommunityIcons
                        testID={isOpen ? "chevron-up" : "chevron-down"}
                        name={isOpen ? "chevron-up" : "chevron-down"}
                        size={25}
                        color="gray"
                    />
                </View>

                <Collapsible collapsed={!isOpen}>
                    <View className="h-[1] bg-disable" />
                    <Text className="mx-[20] my-[10]">{section.description}</Text>
                    <View className="w-[100%]">
                        {/* Lectures */}

                        <TouchableOpacity className="w-[100%] h-[300] items-center justify-center relative"
                            onPress={handleLecturePress}>
                            <Image source={require('../../assets/images/sectionThumbnail.png')} className="w-[100%] h-[300] object-cover" />
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

