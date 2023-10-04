import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleImagePress = () => {
        navigation.navigate('HomeStack'); // Replace with the name of the target screen
    }
    

    return (
        <View style={styles.shadowWrapper}>
            <Pressable onPress={toggleDropdown} style={styles.wrapper}>

                <View style={[styles.header, isComplete ? styles.headerComplete : inProgress ? styles.headerinProgress: notpossible ? styles.headernotPossible: {}]}>

                    <Text style={styles.title}>
                        {section.title}
                    </Text>
                    <Text style={styles.completionText}>
                        {completed}/{section.total} completed
                    </Text>
                    <MaterialCommunityIcons
                        name={isOpen ? "chevron-up" : "chevron-down"}
                        size={25}
                        color="gray"
                    />
                </View> 
                
                <Collapsible collapsed={!isOpen}>

                    <View style={styles.lineBreak} />
                    <Text style={styles.descriptionText}>{section.description}</Text>
                    <View style={styles.dropdownContent}>
                        <TouchableOpacity style={styles.imageContainer} onPress={handleImagePress}>
                            <Image source={require('../../../assets/sectionThumbnail.png')} blurRadius={10} style={styles.image} />
                            <MaterialCommunityIcons name="play-circle-outline" size={100} color="white" style={styles.playIcon} />
                        </TouchableOpacity>
                    </View>
                </Collapsible>

            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowWrapper: {
        backgroundColor: 'transparent',
        margin: 8,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        
    },
    wrapper: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 15,
        marginHorizontal: 18,
        overflow: 'hidden',
        elevation: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    title: {
        fontSize: 16,
        color: 'black',
        flex: 1,
    },
    dropdownContent: {
        flex: 1,
        width: '100%',
    },
    lineBreak: {
        height: 1,
        backgroundColor: '#e0e0e0',
    },
    imageContainer: {
        width: '100%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    playIcon: {
        position: 'absolute',
        zIndex: 1,
        allignement: 'center',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    headerComplete: {
        backgroundColor:'#87eb8e'  // Completion color - is green as needed for completion
    },
    headerinProgress: {
        backgroundColor: '#87CEEB' //'#87CEEB' This is blue is needed for in progress courses 
    },
    headernotPossible: {
        backgroundColor: '#f20000' //Red for not possible progress. 
    },
    completionText: {
        marginRight: 10,
        color: 'black',
    },
    descriptionText: {
        marginHorizontal: 20,
        marginVertical: 10
    },
});
