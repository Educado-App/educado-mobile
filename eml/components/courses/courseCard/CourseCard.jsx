import React, { useState } from 'react';
import { View, Text, Image, Pressable, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev';
import { AppLoading } from 'expo-app-loading';
import CourseProgress from '../courseHeader/CourseProgress';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CourseCard({ course, category, duration, progress, imageSrc, downloadState }) {
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
          <Image style={styles.imageContainer} source={require('../../../assets/icon.png')}></Image>
          <Text style={styles.title}>
             { course }
          </Text>
        </View>
        <View style={styles.lineBreak} />
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Image style={styles.imageContainer} left={0} width={Dimensions.get('window').width * 0.1} height={Dimensions.get('window').width * 0.1} source={require('../../../assets/financeLogo.png')}></Image>
          <Text style={styles.descriptionText}>{category='category'}</Text>
          <MaterialCommunityIcons size={30} name="clock-outline"></MaterialCommunityIcons>
          <Text style={styles.descriptionText}>{duration='duration'}</Text>
        </View>
        <CourseProgress fracTop={50} fracBot={100} />
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
      fontSize: 20,
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
      width: Dimensions.get('window').width * 0.12,
      height: Dimensions.get('window').width * 0.12,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      left: -20
  },
  playIcon: {
      position: 'absolute',
      zIndex: 1,
      right: 10,
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
      marginHorizontal: 20,
      marginVertical: 10
  },
});