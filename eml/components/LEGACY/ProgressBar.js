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

export default function ProgressBar(props) {
  const navigation = useNavigation();
  const route = useRoute().name;

  const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10
      },
      progressStep: {
          width: Dimensions.get('screen').width/props.length,
          height: 10,
          backgroundColor: '#878787',
          color: '#878787',
          margin: 5
      },
      progressStepActive: {
        width: Dimensions.get('screen').width/props.length,
        height: 10,
        backgroundColor: '#78BE20',
        color: '#78BE20',
        margin: 5
    }
});
  
let List = [];

for (let index = 0; index < props.length; index++) {
    List.push(<View key={index} style={props.activeIndex == index ? styles.progressStepActive : styles.progressStep}></View>);
}


  return ( 
        <View style={styles.container}>
            {List}
        </View>
  );
}


