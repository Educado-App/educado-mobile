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

import TextElement from './TextElement';
import AudioElement from './AudioElement';
import VideoElement from './VideoElement';
import ImageElement from './ImageElement';

export default function Component(props) {
  const navigation = useNavigation();
  const route = useRoute().name;

  let RenderComponent;

  if (props.component.type == "TEXT") {
    RenderComponent = <TextElement comp={props.component}></TextElement>;
  } else if (props.component.type == "VIDEO") {
    RenderComponent = <VideoElement comp={props.component} ></VideoElement>;

  } else if (props.component.type == "AUDIO") {
    RenderComponent = <AudioElement comp={props.component} ></AudioElement>;

    } else if (props.component.type == "IMAGE") {
        RenderComponent = <ImageElement comp={props.component}></ImageElement>

    }

  return ( 
        <View>
            {RenderComponent}
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
});
