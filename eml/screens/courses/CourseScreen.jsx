import { useNavigation } from '@react-navigation/native'
import { React, useEffect, useState } from 'react'
import { View, Pressable, Text, Dimensions, Image, ScrollView, StyleSheet } from 'react-native'
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'
import { AppLoading } from 'expo-app-loading'
//import { ErrorBoundary } from 'react-error-boundary'
import * as StorageService from "../../services/StorageService";
import CourseCard from '../../components/courses/courseCard/CourseCard'
import SectionScreen from '../section/sectionScreen'

export default function CourseScreen() {


    const [courses, setCourses] = useState([]);

    const [courseLoaded, setCourseLoaded] = useState();

    const navigation = useNavigation()

    let [fontsLoaded] = useFonts({
        VarelaRound_400Regular
    })

    
    
    useEffect(() => {
        async function loadCourses() {
        try {
                const courseData = await StorageService.getSubCourseList();
    
                if (courseData.length !== 0 && Array.isArray(courseData) ) {
                    setCourses(courseData);
                    setCourseLoaded(true);
                } else {
                    setCourses([])
                    setCourseLoaded(false);
                }
    
            } catch (error) {
              console.error("Error checking subscription:", error);
            }
    } loadCourses();
    }, [courses]);

    
    if (!fontsLoaded) {
        return AppLoading
    } else {
        return (
            //<ErrorBoundary fallback={<p>something went wrong</p>}>
            <View style={{backgroundColor: '#f1f9fb'}} className="flex-1">
                {courseLoaded ?
                    <View height='100%'>
                        <View className="pl-2 items-center flex-row" style={{marginTop: '20%', marginBottom: '10%', padding: 10}}>
                            <Image style={{width: 25, height: 25, marginLeft: 10}} source={require('../../assets/singleIcon.png')}></Image>
                            <Text style={{fontSize: 25, marginLeft: 10, fontWeight: 'bold'}}>Bem Vindo!</Text>
                        </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {courses.map((course) => (
                            <CourseCard key={course.courseId} course={course}></CourseCard>
                        )  
                    ) 
                    }
                    </ScrollView>
                    </View>
                    :
                    <View className="flex-column justify-center items-center">
                        {/* No active courses */}
                        <Image className="m-14" source={require('../../assets/logo_educado.png')}></Image>
                        <Image className="mt-12" source={require('../../assets/homePageEmpty.png')}></Image>
                        <Text className="p-4" style={{fontSize: 24, fontWeight: 'bold', color: '#424242'}}>Comece Agora</Text>
                        <Text className="m-2" style={{fontSize: 15, color: '#424242', textAlign: 'center'}}>Você ainda não se increveu em nenhum curso. Acesse a página Explore e use a busca para encontrar cursos do seu interesse.</Text>
                        <Pressable key="{no_course}"
                            style={{ backgroundColor: '#5ECCE9', borderRadius: 12 }}
                            className="mt-8 p-2 w-80"
                            onPress={() => navigation.navigate('Explorar')} >
                            {/* Click to explore courses */}
                            <Text className="text-white" style={{ fontSize: 22, fontFamily: 'VarelaRound_400Regular', textAlign: 'center' }}> Clique para explorar os cursos</Text>
                        </Pressable>
                    </View>}
            </View>
            //</ErrorBoundary>
        )
    }
}