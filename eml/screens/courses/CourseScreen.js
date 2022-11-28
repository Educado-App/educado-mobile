import { useRoute, useNavigation } from '@react-navigation/native'
import React from 'react'
import CourseListUI from '../../components/easyDynComponents/courseListUI'
import { View, Pressable, Text } from 'react-native'
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'
import { AppLoading } from 'expo-app-loading'
import  * as StorageService from "../../services/StorageService";

export default function CourseScreen() {
  const route = useRoute()

  const navigation = useNavigation()

  let course = null;

  if (route.params !== undefined) {
    const course = async () => {
      return await StorageService.getCourseById(route.params.courseId);
    }
  }

  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular
  })

  if (!fontsLoaded) {
    return AppLoading
} else {
  return (
    <View className="bg-babyBlue flex-1">
      {course !== null ? (
        <CourseListUI course={course}></CourseListUI>
      ) : (
        <View className="flex-1 justify-center items-center">
        <Pressable
        style={{elevation:10}}
        className="border border-cyanBlue rounded-md bg-cyanBlue p-2"
        onPress={() => navigation.navigate('Explore')}>
        <Text className ="text-white" style={{ fontSize: 30, fontFamily: 'VarelaRound_400Regular' }}> Click to explore courses</Text>
        </Pressable>
        </View>
      )}
    </View>
  )
}
}
