
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

export default function BottomNavBar(props) {

    const navigation = useNavigation();
    const route = useRoute().name;

  return (

    <View>
        <View style={{height: 1, backgroundColor: '#878787'}} />
        <View  style={styles.container}>

            <View style={route === 'Library' && styles.iconBox}>
                <Pressable  onPress={() => navigation.navigate('Library')}>
                    <Feather name="book" size={36} color="#78BE20" style={styles.menu} />
                </Pressable>
            </View>

            <View style={route === 'Home' && styles.iconBox}>
                <Pressable  onPress={() => navigation.navigate('Home')}>
                    <Feather name="home" size={36} color="#78BE20" style={styles.menu} />
                </Pressable>
            </View>

            <View style={route === 'Search' && styles.iconBox}>
                <Pressable  onPress={() => navigation.navigate('Search')}>
                    <Feather name="search" size={36} color="#78BE20" style={styles.menu} />
                </Pressable>
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
    margin: 5,
  },
  iconBox: {
      borderTopWidth: 3,
      borderColor: '#78BE20'
  }
});
