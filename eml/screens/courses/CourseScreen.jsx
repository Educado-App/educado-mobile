import { useNavigation } from '@react-navigation/native'
import { React, useEffect, useState } from 'react'
import { View, Pressable, Dimensions, Image, ScrollView } from 'react-native'
import Text from '../../components/general/Text'
//import { ErrorBoundary } from 'react-error-boundary'
import * as StorageService from "../../services/StorageService";
import CourseCard from '../../components/courses/courseCard/CourseCard'
import SectionScreen from '../section/sectionScreen'

export default function CourseScreen() {
//Se for new branch

    const [courses, setCourses] = useState([]);

    const [courseLoaded, setCourseLoaded] = useState(false);

    const navigation = useNavigation()  
    
    useEffect(() => {
        async function loadCourses() {
        try {
                const courseData = await StorageService.getSubCourseList();
    
                if (courseData.length !== 0 && Array.isArray(courseData) ) {
                    setCourses(courseData);
                    setCourseLoaded(true);
                } else {
                    setCourses([]);
                    setCourseLoaded(false);
                }
    
            } catch (error) {
              console.error("Error checking subscription:", error);
            }
    } loadCourses();
    }, [courses]);

        return (
            //<ErrorBoundary fallback={<p>something went wrong</p>}>
            <View className="flex-1 bg-[#f1f9fb]">
                {courseLoaded ?
                    <View height='100%'>
                        <View className="pl-2 items-center flex-row mt-[20%] mb-[10%] p-2.5">
                            <Image className="w-[25] h-[25] ml-[10]" source={require('../../assets/singleIcon.png')}></Image>
                            <Text className="text-[25px] font-bold ml-[10]">Bem Vindo!</Text>
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
                        <Text className="p-4 text-[24px] font-bold text-[#424242]">Comece Agora</Text>
                        <Text className="m-2 text-[15px] text-[#424242] text-center" >Você ainda não se increveu em nenhum curso. Acesse a página Explore e use a busca para encontrar cursos do seu interesse.</Text>
                        <Pressable key="{no_course}"
                            className="mt-8 p-2 w-80 bg-[#5ECCE9] rounded-[12px]"
                            onPress={() => navigation.navigate('Explorar')} >
                            {/* Click to explore courses */}
                            <Text className="text-white text-[22px] text-center" > Clique para explorar os cursos</Text>
                        </Pressable>
                    </View>}
            </View>
            //</ErrorBoundary>
        )
    }