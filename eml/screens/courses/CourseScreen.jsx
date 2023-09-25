import { useRoute, useNavigation } from '@react-navigation/native'
import { React, useEffect, useState } from 'react'
import CourseListUI from '../../components/easyDynComponents/courseListUI'
import { View, Pressable, Text, Image } from 'react-native'
import { isFontsLoaded } from '../../constants/Fonts.js'
import { AppLoading } from 'expo-app-loading'
import * as StorageService from "../../services/StorageService";

export default function CourseScreen() {


    const route = useRoute();

    const [course, setCourse] = useState({});

    const [courseLoaded, setCourseLoaded] = useState(false);

    const [downloadState, setDownloadState] = useState(null);

    let courseId = null
    if (route.params !== undefined) {
        courseId = route.params.courseId;
    }

    const navigation = useNavigation()
    let currentCourse = null;

    async function loadCourse() {
        const courseData = await StorageService.getCourseById(courseId);
        setCourse(courseData);
    }

    useEffect(() => {

        if (route.params !== undefined) {
            loadCourse().then(() => {
                setCourseLoaded(true);
            });
        }

    }, [route.params, downloadState])


    if (!isFontsLoaded()) {
        return AppLoading
    } else {
        return (
            <View className="flex-1 items-center justify-center bg-secondary">
                {courseLoaded ?
                    <View className="justify-center items-center bg-secondary">
                        <CourseListUI course={course} downloadState={setDownloadState}></CourseListUI>
                    </View>
                    :
                    <View className = " justify-center items-center bg-secondary ">
                        <View className = " pb-16">
                            <Image source = {require('../../assets/logo.png')} className = " justify-center items-center w-[175.88] h-[25.54] "/>
                        </View>
                        <View className = " justify-center items-center pb-24 pt-24 gap-10 ">
                            <View className = " justify-center items-center w-[342] h-[308.02] ">
                            {/* No active courses */}
                                <Image source={require('../../assets/no-courses.png')}/>
                                <Text className = " leading-[29.26] text-projectBlack pb-4 pt-4 font-montserrat-bold text-subheading text-center " >Comece agora</Text>
                                <Text className = " text-projectBlack leading-[19.5] font-montserrat text-center text-body " > Você ainda não se increveu em nenhum curso. Acesse a página Explore e use a busca para encontrar cursos do seu intresse.</Text>
                            </View>
                            <View>
                                <Pressable
                                    className = " rounded-r-8 rounded-md bg-primary justify-center items-center p-2 h-[52] w-[342] "
                                    /* onPress = {() => navigation.navigate('Explore')}  DOES NOT WORK YET*/ > 
                                    {/* Click to explore courses */}
                                    <Text className = " text-projectWhite font-montserrat-bold text-center text-body " > Explore courses</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>}
            </View>
        )
    }
}

