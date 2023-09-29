import React from 'react';
import { View, Text, Image, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev';
import { AppLoading } from 'expo-app-loading';

export default function CourseCard({ course, downloadState }) {
    const navigation = useNavigation();
    
    let [fontsLoaded] = useFonts({
        VarelaRound_400Regular,
      });
    
      if (!fontsLoaded) {
        return AppLoading;
      } else {
        return (
        <View style={{ flexDirection: "column", alignItems: "center", width: Dimensions.get('window').width * 0.75}}>
            <View style={{width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                <Image source={require('../../../assets/icon.png')} style={{width: 50, height: 50}}></Image>
                <Text style={{fontSize: 16, color: "black"}}>{course}</Text>
            </View>
            <View>

            </View>
        </View>
    )
    }
}