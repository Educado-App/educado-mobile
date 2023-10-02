import React, { useState } from 'react';
import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import { useNavigation } from '@react-navigation/native';

export default function SectionCard({ sectionNumber, description, imageSrc, completed, total }) {
    const navigation = useNavigation();
    const isComplete = completed === total;
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleImagePress = () => {
        navigation.navigate('HomeStack'); // Replace with the name of the target screen
    }

    return (
        <View style={{
            backgroundColor: 'transparent',
            paddingHorizontal: 8,
            shadowRadius: 5,
            shadowColor: "black",
            
        }}>
            <Pressable onPress={toggleDropdown} style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                marginBottom: 15,
                marginHorizontal: 18,
                overflow: 'hidden',
                shadowRadius: 5,
                shadowColor: "black",
                elevation: 5,
            }}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 25,
                    paddingVertical: 15,
                    ...isComplete ? { backgroundColor: '#87CEEB' } : {}
                }}>

                    <Text style={{
                        fontSize: 16,
                        color: 'black',
                        flex: 1,
                    }}>
                        Section {sectionNumber}
                    </Text>
                    <Text style={{
                        marginRight: 10,
                        color: 'black',
                    }}>
                        {completed}/{total} completed
                    </Text>
                    <MaterialCommunityIcons
                        name={isOpen ? "chevron-up" : "chevron-down"}
                        size={25}
                        color="gray"
                    />
                </View>

                <Collapsible collapsed={!isOpen}>

                    <View style={{
                        height: 1,
                        backgroundColor: '#e0e0e0',
                    }} />
                    <Text style={{
                        marginHorizontal: 20,
                        marginVertical: 10
                    }}>
                        {description}
                    </Text>
                    <View style={{
                        flex: 1,
                        width: '100%',
                    }}>
                        <TouchableOpacity onPress={handleImagePress} style={{
                            width: '100%',
                            height: 300,
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}>
                            <Image source={imageSrc ? imageSrc : require('../../../assets/sectionThumbnail.png')} style={{
                                width: '100%',
                                height: 300,
                                resizeMode: 'cover',
                            }} />
                            <MaterialCommunityIcons name="play-circle-outline" size={50} color="white" style={{
                                position: 'absolute',
                                zIndex: 1,
                                right: 10,
                            }} />
                        </TouchableOpacity>
                    </View>
                </Collapsible>

            </Pressable>
        </View>
    );
}
