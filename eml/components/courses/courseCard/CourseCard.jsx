import { View, Image, Pressable, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Text from '../../../components/general/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomProgressBar from "../../exercise/Progressbar";
import tailwindConfig from "../../../tailwind.config";

/**
 * CourseCard component displays a card for a course with its details
 * @param {Object} props - Component props
 * @param {Object} props.course - Course object containing course details
 * @returns {JSX.Element} - Rendered component
 */
export default function CourseCard({ course }) {
    const navigation = useNavigation();

    return (
        <Pressable testID="courseCard"
            className="bg-projectWhite m-[3%] rounded-[10px] shadow-[0_0px_2px_#000] shadow-opacity-[0.3] elevation-[8] mx-[5%] p-[5%]"
            onPress={() => {
                navigation.navigate('Section', {
                    courseId: course.courseId,
                });
            }}
        >
            <View>
                <View className="flex-row items-start justify-between px-[1%] py-[1%]">
                    <MaterialCommunityIcons size={28}
                        name={course.image ? course.image : 'school'}> </MaterialCommunityIcons>
                    <Text className="text-[18px] text-black flex-1 self-center">
                        {course.title ? course.title : 'Course Title'}
                    </Text>
                </View>
                <View className="h-[1px] bg-disable m-[2%]"></View>
                <View className="flex-row items-center justify-start overflow-hidden">
                    <MaterialCommunityIcons size={18} name="school" color={'gray'}></MaterialCommunityIcons>
                    <Text className="mx-[2.5%] my-[3%]">{course.category ? course.category : 'category'}</Text>
                    <MaterialCommunityIcons size={18} name="clock" color={'gray'}></MaterialCommunityIcons>
                    <Text className="mx-[2.5%] my-[3%]">{course.estimatedHours ? course.estimatedHours + ' hora(s)' : 'duration'}</Text>
                </View>
                <View className="flex-row items-center">
                    {/* TODO: Implement progress dynamically */}
                    <CustomProgressBar width={60} progress={50} height={1} />
                    <Pressable className="z-[1]"
                        onPress={() => {
                            navigation.navigate('Section', {
                                courseId: course.courseId,
                            });
                        }}
                    >
                        <MaterialCommunityIcons size={28} name="play-circle" color={tailwindConfig.theme.colors.primary}></MaterialCommunityIcons>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
}