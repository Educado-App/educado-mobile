import { useRoute, useNavigation } from '@react-navigation/native'
import { React, useEffect, useState } from 'react'
import CourseListUI from '../../components/easyDynComponents/courseListUI'
import { View, Pressable, Text } from 'react-native'
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'
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

    let [fontsLoaded] = useFonts({
        VarelaRound_400Regular
    })

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


    if (!fontsLoaded) {
        return AppLoading
    } else {
        return (
            <View className="flex-1 items-center justify-center bg-babyBlue">
                {courseLoaded ?
                    <View className="bg-babyBlue flex-1 justify-center items-center">
                        <CourseListUI course={course} downloadState={setDownloadState}></CourseListUI>
                    </View>
                    :
                    <View className="justify-center items-center">
                        {/* No active courses */}
                        <Text className=" pb-10 text-2xl">Nenhum curso ativo</Text>
                        <Pressable
                            style={{ elevation: 10 }}
                            className="border border-cyanBlue rounded-md bg-cyanBlue p-2"
                            onPress={() => navigation.navigate('Explorar')} >
                            {/* Click to explore courses */}
                            <Text className="text-white" style={{ fontSize: 30, fontFamily: 'VarelaRound_400Regular', textAlign: 'center' }}> Clique para explorar os cursos</Text>
                        </Pressable>
                    </View>}
            </View>
        )
    }
}
