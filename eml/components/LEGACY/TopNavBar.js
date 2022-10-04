
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons'; 


export default function TopNavBar(props) {

  return (
    <View  style={styles.container}>
      <Text style={styles.title}>Educado</Text>
      <Feather name="menu" size={36} color="#78BE20" style={styles.menu} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  title: {
    fontWeight: 'bold',
    color: '#78BE20',
    fontSize: 28,
    margin: 5
  },
  menu: {
    margin: 5
  }
});
