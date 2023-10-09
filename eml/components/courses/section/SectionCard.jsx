import React, { useState } from 'react';
import { View, Pressable, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from '../../../components/general/Text';
import Collapsible from "react-native-collapsible";
import { useNavigation } from '@react-navigation/native'

export default function SectionCard({ section }) {

    // hardcoded for now
    const completed = 0;

    const navigation = useNavigation();
    const isComplete = completed === section.total;
    const inProgress = 0 < completed && completed < section.total;
    const notpossible = completed > section.total; 
    const [isOpen, setIsOpen] = useState(false);
    const className = isComplete ? "bg-[#87eb8e]" : inProgress ? "bg-[#87CEEB]" : notpossible ? "bg-[#F20000]" : {};

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleImagePress = () => {
        navigation.navigate('HomeStack'); // Replace with the name of the target screen
    }
    

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

                    <View className="h-[1px] bg-[#e0e0e0]"/>
                    <Text className="mx-[20] my-[10]">{section.description}</Text>
                    <View className="w-[100%]">
                        <TouchableOpacity className="w-[100%] h-[300] items-center justify-center relative"
                        onPress={handleImagePress}>
                            <Image source={require('../../../assets/sectionThumbnail.png')} blurRadius={10} className="w-[100%] h-[300] object-cover"/>
                            {/* Nativewind does not work with MaterialCommunityIcons*/}
                            <MaterialCommunityIcons name="play-circle-outline" size={100} color="white" style={{position: 'absolute', zIndex: 1, allignement: 'center',}} />
                        </TouchableOpacity>
                    </View>
                </Collapsible>

            </Pressable>
        </View>
    );
}