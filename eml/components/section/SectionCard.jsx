import React, { useState } from 'react';
import { View, Pressable, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from '../general/Text';
import Collapsible from "react-native-collapsible";
import { useNavigation } from '@react-navigation/native';

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
    const notPossible = completed > section.total;
    const [isOpen, setIsOpen] = useState(false);
    // backgroundColor should accommodate with color scheme for status notification (from Miro), but they didn't fit the with the style
    const backgroundColor = isComplete ? "bg-[#87eb8e]" : inProgress ? "bg-[#87CEEB]" : notPossible ? "bg-[#F20000]" : {};

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    const handleImagePress = () => {
        navigation.navigate('HomeStack'); // Replace with the name of the target screen
    }
    

    return (
        <View className="bg-transparent m-[2.2%] rounded-[10px] shadow-[0px 2px 4.65px #000] shadow-opacity-[0.3]">
            <Pressable testID="collapsible" onPress={toggleDropdown} className="bg-[#fff] rounded-[10px] mb-[15] mx-[18] overflow-hidden elevation-[8]">
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
                    <View className="h-[1px] bg-[#e0e0e0]"/>
                    <Text className="mx-[20] my-[10]">{section.description}</Text>
                    <View className="w-[100%]">
                        <TouchableOpacity className="w-[100%] h-[300] items-center justify-center relative"
                        onPress={handleImagePress}>
                            <Image source={require('../../assets/sectionThumbnail.png')} className="w-[100%] h-[300] object-cover"/>
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

