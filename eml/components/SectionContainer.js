import React, { useEffect, useState, Suspense } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import { getCoverPhoto } from "../api/api";

import loadingImage from './../assets/loadingImage.png';
const loadingImageUri = Image.resolveAssetSource(loadingImage).uri;


export default function SectionContainer(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const { course, coverImage } = route.params;

  return ( 
        <Pressable
                onPress={() => navigation.navigate('Section',{section: props.section, course: course, coverImage: coverImage })}
                style={styles.container}
            >
                        <Text style={styles.title}>{props.section.title}</Text>
                        <View style={styles.checkBoxContainer}>
                            <View style={styles.checkBox}>

                            </View>
                        </View>
                        
            </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',


        backgroundColor: '#fff',    
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#878787',
        padding: 5,
        width: Dimensions.get('screen').width*0.9,

        marginTop: 5,
        marginBottom: 5
      },
      checkBox: { 
        borderWidth: 1,
        width: 15,
        height: 15,
        borderColor: '#878787',
      },
      checkBoxContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-end',
      }
});
