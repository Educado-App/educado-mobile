import { useRoute, useNavigation } from '@react-navigation/native'
import { React, useEffect, useState } from 'react'
import CourseListUI from '../../components/easyDynComponents/courseListUI'
import { View, Pressable, Text, Dimensions, Image, ScrollView, StyleSheet } from 'react-native'
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'
import { AppLoading } from 'expo-app-loading'
import * as StorageService from "../../services/StorageService";
import { getHome } from '../../api/api'
import CourseCard from '../../components/courses/courseCard/CourseCard'

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
        //const courseData = await StorageService.getCourseById(courseId);
        //setCourse(courseData);
        const courseData = await getHome();
        console.log(courseData);
        console.log(route.params);
        setCourse(courseData);
    }

    useEffect(() => {

       // if (route.params !== undefined) {
            loadCourse().then(() => {
                setCourseLoaded(true);
            });
        //}

    }, [route.params, downloadState])

    
    if (!fontsLoaded) {
        return AppLoading
    } else {
        return (
            <View style={{backgroundColor: '#f1f9fb'}} className="flex-1">
                {courseLoaded ?
                    <View height='100%'>
                        <View className="justify-center items-center pt-14 pb-4">
                            <Image source={require('../../assets/logo_educado.png')}></Image>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                        {course.map((course, i) => { return (
                                <Pressable
                                style={{
                                    backgroundColor: "#fff",
                                    margin: 8,
                                    borderRadius: 10,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                      width: 0,
                                      height: 2,
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 4.65,
                                    elevation: 8,
                                    marginBottom: 15,
                                    marginHorizontal: 18,
                                    padding: 15,
                                  }}
                                onPress={() => navigation.navigate("Edu")}>
                                    {/*<CourseListUI course={course} key={i} downloadState={setDownloadState}></CourseListUI>*/}
                                    <CourseCard key={i} course={course} downloadState={setDownloadState}></CourseCard>
                                </Pressable> 
                                )
                            }) 
                        }
                        </ScrollView>
                    </View>
                    :
                    <View className="justify-center items-center">
                        {/* No active courses */}
                        <Text className=" pb-10 text-2xl">Nenhum curso ativo</Text>
                        <Pressable
                            style={{ elevation: 10 }}
                            className="border border-cyanBlue rounded-md bg-cyanBlue p-2"
                            onPress={() => loadCourse()} >
                            {/* Click to explore courses */}
                            <Text className="text-white" style={{ fontSize: 30, fontFamily: 'VarelaRound_400Regular', textAlign: 'center' }}> Clique para explorar os cursos</Text>
                        </Pressable>
                    </View>}
            </View>
        )
    }
}