
import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image, Pressable, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";

export default function TopNavBar(props) {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.title}>Educado</Text>
      </TouchableOpacity>
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
    margin: 5,
    paddingLeft: 10,
  },
  menu: {
    fontWeight: 'bold',
    color: '#78BE20',
    fontSize: 28,
    margin: 5,
    paddingRight: 10,
  }
});
