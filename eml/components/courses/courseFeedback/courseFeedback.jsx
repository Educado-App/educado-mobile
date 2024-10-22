import React, {useState, useEffect} from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { EvilIcons, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import tailwindConfig from '../../../tailwind.config';
import StandardButton from '../../general/StandardButton';
import { set } from 'react-native-reanimated';




export default function CourseFeedback({ course, modalVisible, setModalVisible }) {
    const [selectedRating, setSelectedRating] = useState(0);
    const [feedbackOptions, setFeedbackOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [feedbackText, setFeedbackText] = useState('');

    const getFeedbackOptions = () => {
            // fetch api feedback options when implemented
            const options = [{text: "Muito informativo", bgcolor: "bg-limeGreen"}
            , {text: "Muito útil", bgcolor: "bg-badgesBlue"}, 
            {text: "Um pouco confuso2", bgcolor: "bg-badgesPurple2"},
            {text: "Muito difícil2", bgcolor: "bg-wrongAnswer"},{text: "Muito informativo2", bgcolor: "bg-limeGreen"}
            , {text: "Muito útil2", bgcolor: "bg-badgesBlue"}, 
            {text: "Um pouco confuso3", bgcolor: "bg-badgesPurple"},
            {text: "Muito difícil3", bgcolor: "bg-wrongAnswer"},{text: "Muito informativo3", bgcolor: "bg-limeGreen"}
            , {text: "Muito útil3", bgcolor: "bg-badgesBlue"}, 
            {text: "Um pouco confuso4", bgcolor: "bg-badgesPurple"},
            {text: "Muito difícil4", bgcolor: "bg-wrongAnswer"},{text: "Muito informativo4", bgcolor: "bg-limeGreen"}
            , {text: "Muito útil4", bgcolor: "bg-badgesBlue"} ];

            return options
    }

    useEffect(() => {
        try {
            setFeedbackOptions(getFeedbackOptions());
        }
        catch(e) {
            console.log(e);
        }
    }, []);



    const handleStarClick = (index) => {
        if (selectedRating === index + 1) {
            setSelectedRating(0);
            return;
        }
        setSelectedRating(index + 1);
    }

    const handleOptionClick = (optionText) => {
        if (selectedOptions.includes(optionText)) {
            setSelectedOptions(selectedOptions.filter((option) => option !== optionText));
        } else {
            setSelectedOptions([...selectedOptions, optionText]);
        }
    }

    const handleSubmitFeedback = () => {
        setModalVisible(false);
        // post api to submit feedback when implemented

    }

    const ratingIcons = Array.from({length: 5}, (_, index) => ({
        icon: index < selectedRating ? 'star' : 'star-outline',
        color: index < selectedRating ? tailwindConfig.theme.colors.yellow : tailwindConfig.theme.colors.projectGray,
    }));

    return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                scrollable
                >
                {/* Detect touches outside the modal */}
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.transparentBackground}>
                        {/* Prevent the modal content from closing the modal when clicked */}
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <Pressable onPress={() => setModalVisible(false)}>
                                    <View className='flex-row justify-between w-full items-center py-2'>
                                        <Text className='text-projectBlack font-medium text-2xl'>
                                            {course.title} - opinião
                                        </Text>
                                        <MaterialIcons
                                            name='keyboard-arrow-down'
                                            size={34}
                                            color='black'
                                        />
                                    </View>
                                    
                                </Pressable>
                                <View className='border-b-[1px] w-full border-projectGray opacity-50 pt-4 mb-4'></View>
                                
                                <View className="flex flex-row items-center">
                                    <Text className="font-montserrat-semi-bold text-lg">Como você avalia o curso?</Text>
                                    <Text className="text-error ml-1 pt-3 text-lg text-center">*</Text>
                                </View>
                                <View className="w-full flex-row items-start justify-start">
                                        {ratingIcons.map((icon, index) => (
                                            <Pressable key={index} onPress={() => handleStarClick(index)}>
                                                <MaterialCommunityIcons key={index} name={icon.icon} size={64} color={icon.color} />
                                            </Pressable>
                                        ))}
                                </View>
                                <Text className="font-montserrat-semi-bold text-lg bg">Qual feedback você tem para você?</Text>
                                <ScrollView className="max-h-48 border-2 border-primary_custom rounded-lg my-2">
                                    <View className="flex-row flex-wrap items-start justify-start p-2">
                                        {feedbackOptions.map((option, index) => (
                                            <Pressable key={index} onPress={() => handleOptionClick(option.text)}>
                                                <View className={`rounded-full px-4 py-2 m-2 ${option.bgcolor} 
                                                    ${selectedOptions.includes(option.text) ? 'border-2 border-cyanBlue' : ''}`
                                                    }
                                                >
                                                    <Text className=" text-projectBlack font-montserrat-semi-bold">{option.text}</Text>
                                                </View>
                                            </Pressable>
                                        ))}
                                    </View>
                                </ScrollView>
                                <Text className="font-montserrat-semi-bold text-lg bg">Qualquer outro feedback que você gostaria de dar</Text>

                                <TextInput
                                    className=" w-full h-32
                                        border-2 border-cyanBlue rounded-lg p-4 my-4 align-top text-lg"
                                    placeholder="Digite seu feedback aqui..."
                                    onChangeText={text => setFeedbackText(text)}
                                    value={feedbackText}
                                    multiline
                                />
                                
                                <View className={`${selectedRating == 0 ? "opacity-50" : ""}` }>
                                    <StandardButton props={{
                                        buttonText: 'enviar feedback',
                                        onPress: () => {
                                            handleSubmitFeedback();
                                        }
                                        }}
                                     />
                                </View>
                                
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            );

            
}
const styles = StyleSheet.create({
    transparentBackground: {
        flex: 1,
        backgroundColor: 'rgba(228, 242, 245, 0.5)', // Semi-transparent background
        justifyContent: 'flex-end', // Align the modal to the bottom
    },
    modalView: {
        height: '90%',
        width: '100%',
        backgroundColor: '#F1F9FB',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});