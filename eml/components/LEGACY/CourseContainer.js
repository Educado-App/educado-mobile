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


export default function CourseContainer(props) {
  const navigation = useNavigation();
  const route = useRoute().name;

  const [coverImage,setCoverImage] = useState(null);


  useEffect(() => {

        const fetchCoverImage = async () => {
            const data = await getCoverPhoto(props.course._id);
            setCoverImage(data);
        };
        fetchCoverImage();
  },[])

  let covImgUri;

  if (coverImage !== null) {
      covImgUri = coverImage;
  } else {
      covImgUri = loadingImageUri;   
  }
  

  return ( 
    <View>
        <Pressable
                onPress={() => navigation.navigate('Course',{course: props.course,coverImage: covImgUri})}
            >
                <View style={styles.container} >
                    <Image style={styles.cover} source={{uri: covImgUri}}></Image>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{props.course.title}</Text>
                        <Text style={styles.paragraph}>{props.course.description}</Text>
                    </View>
                </View>
            </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    
        borderWidth: 1,
        borderColor: '#878787',
        borderRadius: 10,
        margin: 10,
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.2
      },
      title: {
        fontWeight: 'bold',
        flexWrap: 'wrap',
        fontSize: 15
      },
      cover: {
        width: '35%',
        height: '80%',
        margin: 10
      },
      textContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 1,
      },    
      paragraph: {
          fontSize: 13,
          maxHeight: '90%',
          maxWidth: '90%'
      }
});
