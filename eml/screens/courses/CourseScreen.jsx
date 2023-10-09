import { useRoute, useNavigation } from '@react-navigation/native'
import { React, useEffect, useState } from 'react'
import CourseListUI from '../../components/easyDynComponents/courseListUI'
import { View, Pressable, Text, Dimensions, Image } from 'react-native'
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'
import { AppLoading } from 'expo-app-loading'
import * as StorageService from "../../services/StorageService";
import { getHome } from '../../api/api'
import CourseCard from '../../components/courses/courseCard/CourseCard'

export default function CourseScreen() {


    const route = useRoute();

    const [course, setCourse] = useState([]);

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
        if (courseData) {
            
        
        console.log(courseData);
        console.log(route.params);
        setCourse(courseData);
        }
    }

    useEffect(() => {

       // if (route.params !== undefined) {
            loadCourse().then((res) => {
                if (res)
                {
                    setCourseLoaded(true);
                }
                setCourseLoaded(false);
            });
        //}

    }, [route.params, downloadState])

    
    if (!fontsLoaded) {
        return AppLoading
    } else {
        return (
            <View className="flex-1 items-center justify-center bg-babyBlue">
                {courseLoaded ?
                    <View>
                        <View className="justify-center items-center pt-14">
                            <Image source={require('../../assets/logo_educado.png')}></Image>
                        </View>
                        <View className="bg-babyBlue flex-1 justify-top items-center pt-6">
                        {course && course.map((course, i) => { return (
                                <Pressable
                                style={{
                                    backgroundColor: "#fff",
                                    borderRadius: 10,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                      width: 0,
                                      height: 2,
                                    },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 2,
                                    elevation: 5,
                                    marginBottom: 15,
                                    marginHorizontal: 18,
                                    padding: 25,
                                  }}
                                onPress={() => console.log(i)}>
                                    {/*<CourseListUI course={course} key={i} downloadState={setDownloadState}></CourseListUI>*/}
                                    <CourseCard key={i} course={course} downloadState={setDownloadState}></CourseCard>
                                </Pressable> 
                                )
                            }) 
                        }
                        </View>
                    </View>
                    :
                    <View className="justify-center items-center">
                        {/* No active courses */}
                        <Text className=" pb-10 text-2xl">Nenhum curso ativo</Text>
                        <Pressable
                            style={{ elevation: 10 }}
                            className="border border-primary rounded-md bg-primary p-2"
                            onPress={() => loadCourse()} >
                            {/* Click to explore courses */}
                            <Text className="text-white bg-primary" style={{ fontSize: 30, fontFamily: 'VarelaRound_400Regular', textAlign: 'center' }}> Clique para explorar os cursos</Text>
                        </Pressable>
                    </View>}
            </View>
        )
    }
}
