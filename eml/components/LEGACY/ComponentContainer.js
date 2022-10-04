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

import { getPresignedUrl } from "../api/api";

import loadingImage from './../assets/loadingImage.png';
const loadingImageUri = Image.resolveAssetSource(loadingImage).uri;


export default function ComponentContainer(props) {
  const navigation = useNavigation();
  const route = useRoute();

  

  return ( 
        <View>

        </View>
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
      video: {
        backgroundColor: '#fff',
    
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 10,
        margin: 10,
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.2
      }
});
