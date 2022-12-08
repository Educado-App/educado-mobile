import { useRoute, useNavigation } from '@react-navigation/native'
import { React, useEffect, useState } from 'react'
import CourseListUI from '../../components/easyDynComponents/courseListUI'
import { View, Pressable, Text } from 'react-native'
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'
import { AppLoading } from 'expo-app-loading'
import * as StorageService from "../../services/StorageService";
import { constSelector } from 'recoil'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DirectoryService from "../../services/DirectoryService";

export default function CourseScreen() {


    const route = useRoute();

    const [course, setCourse] = useState({});

    const [bool, setBool] = useState(false);
    let courseId = null
    if (route.params !== undefined) {
        courseId = route.params.courseId;

    }

    const navigation = useNavigation()

    let currentCourse = null;

    let [fontsLoaded] = useFonts({
        VarelaRound_400Regular
    })

    async function clearStorage () {
        //Uncomment to clear async storage cache upon loading explore screen
        console.log(await AsyncStorage.getAllKeys())
        console.log(await AsyncStorage.clear())
        console.log(await AsyncStorage.getAllKeys())
        console.log(await DirectoryService.DeleteDirectory('635fb5b9b2fb6c4f49084682'));
    }

    async function loadCourse() {
        const courseData = await StorageService.getCourseById(courseId);
        setCourse(courseData);
    }

    useEffect(() => {

        if (route.params !== undefined) {
            loadCourse().then(() => {
                setBool(true);
            });
        }
    }, [route.params,downloadState])


    if (!fontsLoaded) {
        return AppLoading
    } else {
        return (
            <View className="flex-1 items-center justify-center bg-babyBlue">
                {bool ?
                    <View className="bg-babyBlue flex-1 justify-center items-center">
                        <CourseListUI course={course}></CourseListUI>
                    </View>
                    :
                    <View className="justify-center items-center">
                        <Pressable
                            style={{ elevation: 10 }}
                            className="border border-cyanBlue rounded-md bg-cyanBlue p-2"
                            onPress={() => navigation.navigate('Explore')}>
                            <Text className="text-white" style={{ fontSize: 30, fontFamily: 'VarelaRound_400Regular' }}> Click to explore courses</Text>
                        </Pressable>
                    </View>}
            </View>
        )
    }
}

