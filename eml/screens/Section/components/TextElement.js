import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import loadingImage from './../../../assets/loadingImage.png';
const loadingImageUri = Image.resolveAssetSource(loadingImage).uri;

import { getPresignedUrl } from '../../../api/api';

export default function TextElement(props) {

    const navigation = useNavigation();
    const route = useRoute();

  return (
    <View >
        <Text>{props.comp.text}</Text>
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
      width: '100%',
      height: '20%',
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
