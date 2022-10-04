import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import loadingImage from './../../../assets/loadingImage.png';
const loadingImageUri = Image.resolveAssetSource(loadingImage).uri;

import { getPresignedUrl } from '../../../api/api';

export default function ImageElement(props) {

    const navigation = useNavigation();
    const route = useRoute();

    const [img,setImg] = useState(null);


        useEffect(() => {

            const fetchImg = async () => {
                const data = await getPresignedUrl(props.comp._id);
                setImg(data);
            };

            fetchImg();
        },[])

  let imgUri;

  if (img !== null) {
      imgUri = img;
  } else {
      imgUri = loadingImageUri;   
  }

  return (
    <View >
        <Image style={styles.coverImage} source={{uri: imgUri}}>

        </Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: '10%',
  },
  coverImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 5
  },
  sectionList: {
      marginTop: 10
  },
  description: {
      padding: 8
  }
});
