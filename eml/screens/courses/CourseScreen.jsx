import { useRoute, useNavigation } from '@react-navigation/native'
import { React, useEffect, useState } from 'react'
import CourseListUI from '../../components/easyDynComponents/courseListUI'
import { View, Pressable, Text, Image } from 'react-native'
//import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'
import { useFonts, Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/dev'
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
        Montserrat_700Bold, Montserrat_400Regular
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
            <View className="flex-1 items-center justify-center" style={{backgroundColor: '#F1F9FB', width: 390, height: 844}}>
                <Image source={require('../../assets/logo.png')} style={{width: 175.88, height: 25.54}}/>
                {courseLoaded ?
                    <View className="justify-center items-center" style={{backgroundColor: '#F1F9FB'}}>
                        <CourseListUI course={course} downloadState={setDownloadState}></CourseListUI>
                    </View>
                    :
                    <View className="justify-center items-center pb-15 pt-24" style={{width: 390, height: 392.02 }}>
                        <View className="justify-center items-center" style={{width: 342, height: 308.02 }}>
                        {/* No active courses */}
                            <Image source={require('../../assets/no-courses.png')} style={{}}/>
                            <Text className="pb-4 pt-4" style={{fontSize: 24, fontFamily: 'Montserrat_700Bold', textAlign: 'center', lineHeight: 29.26, color: '#383838' }}>Comece agora</Text>
                            <Text className="pb-10" style={{fontSize: 16, fontFamily: 'Montserrat_400Regular', textAlign: 'center', lineHeight: 19.5, color: '#383838' }}>Você ainda não se increveu em nenhum curso. Acesse a página Explore e use a busca para encontrar cursos do seu intresse.</Text>
                        </View>
                        <Pressable
                                style={{ elevation: 10, width: 342, height: 52, borderRadius: 8, borderColor: '#5ECCE9', color: '#5ECCE9'}}
                                className="rounded-md bg-cyanBlue p-2 justify-center items-center"
                                onPress={() => navigation.navigate('Explore')}>
                                {/* Click to explore courses */}
                                <Text className="text-white" style={{ fontSize: 16, fontFamily: 'Montserrat_700Bold', textAlign: 'center' }}> Explore courses</Text>
                            </Pressable>
                    </View>}
            </View>
        )
    }
}
