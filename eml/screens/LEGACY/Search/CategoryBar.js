
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { currentCategory } from './../../recoil/atoms';

import { MaterialCommunityIcons, Feather, MaterialIcons, Entypo } from '@expo/vector-icons';

export default function CategoryBar(props) {

    const [category,setCategory] = useRecoilState(currentCategory)

  return (
    
    <View>
        <View style={styles.container}>
                <View style={styles.smallContainer}>
                    <Pressable  onPress={() => {if (category == 'Health') {setCategory('All')} else {setCategory('Health')}}}>
                        <Feather name="heart" size={24} color="#F0F1F0" style={category == 'Health' ? styles.iconActive : styles.iconInactive} />
                    </Pressable>
                    <Text style={category == 'Health' && styles.iconActive}>Health</Text>
                </View>
            <View style={styles.smallContainer}>
                <Pressable  onPress={() => {if (category == 'Finance') {setCategory('All')} else {setCategory('Finance')}}}>
                    <MaterialCommunityIcons name="finance" size={24} color="#F0F1F0" style={category == 'Finance' ? styles.iconActive : styles.iconInactive} />
                </Pressable>
                <Text style={category == 'Finance' && styles.iconActive}>Finance</Text>
                </View>
            <View style={styles.smallContainer}>
                <Pressable  onPress={() => {if (category == 'Technology') {setCategory('All')} else {setCategory('Technology')}}}>
                  <MaterialIcons name="computer" size={24} color="#F0F1F0" style={category == 'Technology' ? styles.iconActive : styles.iconInactive} />
                </Pressable>
                <Text style={category == 'Technology' && styles.iconActive}>Tech</Text>
            </View>
            <View style={styles.smallContainer}>
                <Pressable  onPress={() => {if (category == 'Language') {setCategory('All')} else {setCategory('Language')}}}>
                  <Entypo name="language" size={24} color="#F0F1F0" style={category == 'Language' ? styles.iconActive : styles.iconInactive} />
                </Pressable>
                <Text style={category == 'Language' && styles.iconActive}>Language</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: '10%',
    paddingRight: '10%',
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
    color: '#78BE20',
    fontSize: 28,
    margin: 5
  },
  menu: {
    borderTopWidth: 2,
  },
  iconBox: {
      borderWidth: 3,
      borderRadius: 5,
      borderColor: '#78BE20',
  },
  iconActive: {
    color: '#78BE20'
  },
  iconInactive: {
    color: '#b3b3b3'
  },
  smallContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}
});
