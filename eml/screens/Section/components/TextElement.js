import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, } from 'react-native';

import { AntDesign } from '@expo/vector-icons'; 

export default function TextElement(props) {

  return (
    <View style={styles.container}>
        <Text style={styles.text}>{props.comp.text}</Text>
        <AntDesign name="sound" size={40} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: '50%',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    padding: 5
  }
});
