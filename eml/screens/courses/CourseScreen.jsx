import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, ScrollView, RefreshControl } from 'react-native';
import Text from '../../components/general/Text';
import * as StorageService from "../../services/StorageService";
import CourseCard from '../../components/courses/courseCard/CourseCard';
import BaseScreen from '../../components/general/BaseScreen';
import IconHeader from '../../components/general/IconHeader';
import { shouldUpdate } from '../../services/utilityFunctions';
import ToastNotification from '../../components/general/ToastNotification';

/**
 * Course screen component that displays a list of courses.
 * @component
 * @returns {JSX.Element} The course screen component.
 */

export default function CourseScreen() {

    /**
    * React hook that declares a state variable for courses and a function to update it.
    * @typedef {[Object[], function]} CourseState
    * @returns {CourseState} The state variable and its updater function.
    */
    const [courses, setCourses] = useState([]);
    const [courseLoaded, setCourseLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation()

    /**
     * Determines if the two arrays of courses are different and require an update.
     * @param {Array} courses1 - The first array of courses, typically representing the current state.
     * @param {Array} courses2 - The second array of courses, typically representing the new fetched data.
     * @returns {boolean} - Returns true if the two arrays are different and an update is required, otherwise false.
     */

    /**
    * Asynchronous function that loads the courses from storage and updates the state.
    * @returns {void}
    */
    async function loadCourses() {
        const courseData = await StorageService.getSubCourseList();
        if (shouldUpdate(courses, courseData)) {
            if (courseData.length !== 0 && Array.isArray(courseData)) {
                setCourses(courseData);
                setCourseLoaded(true);
            }
            else {
                setCourses([]);
                setCourseLoaded(false);
            }
        } 
    }

    // When refreshing the loadCourses function is called
    const onRefresh = () => {
        setRefreshing(true);
        loadCourses();
        setRefreshing(false);
    };

    useEffect(() => {
        // this makes sure loadcourses is called when the screen is focused
        const update = navigation.addListener('focus', () => {
            loadCourses();
        });
        return update;
    }, [navigation]);

    useEffect(() => {
      ToastNotification('success', 'Logado!')
    }, []);

    return (
        <BaseScreen>
            {/** Checks if the course(s) has been loaded
             * If it has, it will render and map the courses
             * If not, it will render a message saying that there are no active courses (in portugese)
             */}
            {courseLoaded ?
                <View height="100%">
                    <IconHeader title={"Bem Vindo!"} />
                    <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                        {courses.map((course, index) => (
                            <CourseCard key={index} course={course}></CourseCard>
                        )
                        )
                        }
                    </ScrollView>
                </View>
                :
                <View className=" justify-center items-center bg-secondary ">
                    <View className="pt-24 pb-16">
                        <Image source={require('../../assets/logo.png')} className=" justify-center items-center w-[175.88] h-[25.54] " />
                    </View>
                    <View className=" justify-center items-center pb-24 pt-24 gap-10 ">
                        <View className=" justify-center items-center w-[342] h-[308.02] ">
                            {/* No active courses */}
                            <Image source={require('../../assets/no-courses.png')} />
                            <Text className=" leading-[29.26] text-projectBlack pb-4 pt-4 font-sans-bold text-subheading text-center " >Comece agora</Text>
                            <Text className=" text-projectBlack leading-[19.5] font-montserrat text-center text-body " > Você ainda não se increveu em nenhum curso. Acesse a página Explore e use a busca para encontrar cursos do seu intresse.</Text>
                        </View>
                        <View>
                            <Pressable
                                testID={"exploreButton"}
                                className=" rounded-r-8 rounded-md bg-primary justify-center items-center p-2 h-[52] w-[342] "
                                onPress={() => navigation.navigate('Explorar')}>
                                {/* Click to explore courses */}
                                <Text className=" text-projectWhite font-sans-bold text-center text-body " > Explore courses</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>}
        </BaseScreen>
    )
}
