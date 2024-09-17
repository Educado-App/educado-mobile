import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { MaterialCommunityIcons, AntDesign, EvilIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import CardLabel from './CardLabel';
import CustomRating from './CustomRating';
import SubscriptionButton from './SubscriptionButton';
import AccessCourseButton from './AccessCourseButton';
import * as Utility from '../../services/utilityFunctions';
import PropTypes from 'prop-types';

/**
 * This component is used to display a course card.
 * @param course - The course object to be displayed.
 * @param isPublished - Boolean value that indicates if the course is published. If false, the card will not be displayed.
 * @param subscribed - Boolean value that indicates if the user is subscribed to the course.
 * @returns {JSX.Element|null} - Returns a JSX element. If the course is not published, returns null.
 */
export default function ExploreCard({ course, isPublished, subscribed }) {
    const [modalVisible, setModalVisible] = useState(false);

    return isPublished ? (
        <View>
            <View className="bg-projectWhite rounded-lg shadow-2xl mb-4 mx-4 p-6 overflow-hidden">
                <View className="flex-col items-center">
                    <View className="flex-row justify-between w-full items-center">
                        <Text className="text-projectBlack font-medium text-lg">{course.title}</Text>
                    </View>

                    <View className="h-1 border-b-[1px] w-full border-projectGray opacity-50 pt-2"></View>

                    <View className="w-full h-[0.5] pt-2" />
                    <View className="flex-row justify-between w-full items-start">
                        <View className="flex-col items-start justify-between">
                            <View className="flex-row items-center justify-start pb-2 flex-wrap">
                                <CardLabel
                                    title={Utility.determineCategory(course.category)}
                                    icon={Utility.determineIcon(course.category)}
                                />
                                <View className="w-2.5" />
                                <CardLabel
                                    title={Utility.formatHours(course.estimatedHours)}
                                    icon={'clock-outline'}
                                />
                                <View className="w-2.5" />
                                <CardLabel
                                    title={Utility.getDifficultyLabel(course.difficulty)}
                                    icon={'book-multiple-outline'}
                                />
                            </View>
                            <View className="h-1.25 opacity-50" />
                            <CustomRating rating={course.rating} />
                            <View className="w-full justify-end flex-row">
                                <Pressable onPress={() => setModalVisible(true)}>
                                    <View className="flex-row items-center border-b border-profileCircle">
                                        <Text className="text-profileCircle text-xs font-bold pr-2">Saiba Mais</Text>
                                        <AntDesign name="doubleright" size={12} color="text-profileCircle" />
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="items-start absolute">
                    <View className="rotate-[315deg] items-center">
                        {
                            subscribed ? (
                                <Text className="bg-yellow text-xs text-projectWhite font-bold px-8 -left-8 -top-4 drop-shadow-sm">
                                    Inscrito
                                </Text>
                            ) : null
                        }
                    </View>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.transparentBackground}>
                    <View style={styles.modalView}>
                        <Pressable onPress={() => setModalVisible(false)}>
                            <View className="flex-row justify-between w-full items-center py-4">
                                <Text className="text-projectBlack font-medium text-2xl">{course.title}</Text>
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                            </View>
                            <View className="flex-row items-center justify-start pb-4 flex-wrap text-xs">
                                <CardLabel
                                    title={Utility.determineCategory(course.category)}
                                    icon={Utility.determineIcon(course.category)}
                                />
                                <View className="w-2.5" />
                                <CardLabel
                                    title={Utility.formatHours(course.estimatedHours)}
                                    icon={'clock-outline'}
                                />
                                <View className="w-2.5" />
                                <CardLabel
                                    title={Utility.getDifficultyLabel(course.difficulty)}
                                    icon={'book-multiple-outline'}
                                />
                            </View>
                        </Pressable>
                        <CustomRating rating={course.rating} />
                        <View className="h-1 border-b-[1px] w-full border-projectGray opacity-50 pt-4 mb-4"></View>
                        <Text className="text-projectBlack text-lg">{course.description}</Text>
                        <View className="border rounded-2xl border-projectGray p-4 mt-8">
                            <View className="flex-row items-center">
                                <EvilIcons name="clock" size={24} color="grey" />
                                <Text className="text-projectBlack pb-3 text-sm ml-2">{course.estimatedHours} horas de conteúdo (vídeos, exercícios, leituras complementares)</Text>
                            </View>
                            <View className="flex-row">
                                <MaterialCommunityIcons name="certificate-outline" size={24} color="grey" />
                                <Text className="text-projectBlack pb-3 text-sm ml-2">Certificado de Conclusão</Text>
                            </View>
                            <View className="flex-row">
                                <MaterialCommunityIcons name="clock-fast" size={24} color="grey" />
                                <Text className="text-projectBlack pb-3 text-sm ml-2">Início imediato</Text>
                            </View>
                            <View className="flex-row">
                                <MaterialCommunityIcons name="calendar-month" size={24} color="grey" />
                                <Text className="text-projectBlack pb-3 text-sm ml-2">Acesso total por 1 ano</Text>
                            </View>
                            <View className="flex-row">
                                <MaterialCommunityIcons name="robot-outline" size={24} color="grey" />
                                <Text className="text-projectBlack pb-3 text-sm ml-2">Chat e suporte com inteligência artificial</Text>
                            </View>
                            <View className="flex-row">
                                <Octicons name="comment-discussion" size={24} color="grey" />
                                <Text className="text-projectBlack pb-3 text-sm ml-2">Acesso a comunidade do curso</Text>
                            </View>
                            <View className="flex-row">
                                <MaterialIcons name="phonelink" size={24} color="grey" />
                                <Text className="text-projectBlack pb-3 text-sm ml-2">Assista onde e quando quiser!</Text>
                            </View>
                        </View>
                        <View className="mt-10">
                            {
                                subscribed ? (
                                    <AccessCourseButton course={course} />
                                ) : (
                                    <SubscriptionButton course={course} />
                                )
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    ) : null;
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

ExploreCard.propTypes = {
    course: PropTypes.object,
    isPublished: PropTypes.bool,
    subscribed: PropTypes.bool,
};