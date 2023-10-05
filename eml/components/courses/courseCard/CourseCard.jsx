import React, { useState } from 'react';
import { View, Text, Image, Pressable, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev';
import { AppLoading } from 'expo-app-loading';
import CourseProgress from '../courseHeader/CourseProgress';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CourseCard({ course, downloadState }) {
    const navigation = useNavigation();
    
    let [fontsLoaded] = useFonts({
        VarelaRound_400Regular,
      });
    
      if (!fontsLoaded) {
        return AppLoading;
      } else {
        return (  
      <View className='flex-1'>
        <View style={[styles.header]}>
          <MaterialCommunityIcons size={28} name={course.image}> </MaterialCommunityIcons>
          <Text style={styles.title}>
             { course.title }
          </Text>
        </View>
        <View style={styles.lineBreak} />
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <MaterialCommunityIcons size={18} name="school" color={'gray'}></MaterialCommunityIcons>
            <Text style={styles.descriptionText}>{course.category}</Text>
            <MaterialCommunityIcons size={18} name="clock" color={'gray'}></MaterialCommunityIcons>
            <Text style={styles.descriptionText}>{course.duration}</Text>
        </View>
        <View className="flex-row" style={{alignItems: 'baseline'}}>
            <CourseProgress fracTop={50} fracBot={100} />
            <Pressable style={styles.playIcon} onPress={()=> {
                                    navigation.navigate('Section', {
                                    courseId: course.courseId,
                                  });
                                }}>
                <MaterialCommunityIcons size={28} name="play-circle" color={'#5ECCE9'}></MaterialCommunityIcons>
            </Pressable>
        </View>
      </View>
    )
    }
}
const styles = StyleSheet.create({
  shadowWrapper: {
      backgroundColor: 'transparent',
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
  },
  wrapper: {
      backgroundColor: "#fff",
      borderRadius: 10,
      marginBottom: 15,
      marginHorizontal: 18,
      overflow: 'hidden',
  },
  header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 5,
  },
  title: {
      fontSize: 18,
      color: 'black',
      flex: 1,
      alignSelf: 'center',
  },
  dropdownContent: {
      flex: 1,
      width: '100%',
  },
  lineBreak: {
      height: 1,
      backgroundColor: '#e0e0e0',
      margin: 5,
  },
  imageContainer: {
      width: Dimensions.get('window').width * 0.1,
      height: Dimensions.get('window').width * 0.1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      left: -20
  },
  playIcon: {
      zIndex: 1,
      left: '180%',
  },
  image: {
      width: '100%',
      height: 300,
      resizeMode: 'cover',
  },
  headerComplete: {
      backgroundColor: '#87CEEB', // Completion color - change to a green color if needed
  },
  completionText: {
      marginRight: 10,
      color: 'black',
  },
  descriptionText: {
      marginHorizontal: 5,
      marginVertical: 10
  },
});