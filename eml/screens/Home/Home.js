import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Suspense } from 'react';
import {StyleSheet, Text, View, Image, Button, Dimensions, TouchableOpacity} from 'react-native';

import TopNavBar from './../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import ActiveCourseTest from "./ActiveCourseTest";
import LogOutButton from "../../components/LogOutButton";
import AsyncStorage from '@react-native-async-storage/async-storage'

const USER_INFO = '@userInfo';

export default function Home(props) {

  const testStorage = async () => {

    try {
      const userInfo = JSON.parse(await AsyncStorage.getItem(USER_INFO));
      console.log("Phone number:" + userInfo.phoneNumber);
      console.log("ID: " + userInfo.id);
    }
    catch (e){
      console.log(e);
    }
  }

  useEffect(() => {
    //testStorage();
  },[])

  return (
    <View style={styles.container}>
        <View style={styles.topNavBar}>
          <TopNavBar></TopNavBar>
        </View>

        <View style={styles.activeCoursesContainer}>
          <Text style={styles.activeCoursesTitle}>My learning</Text>
          <Text>Work in progress...</Text>
        </View>

        <View style={styles.activeCoursesContainer}>
          <Text style={styles.activeCoursesTitle}>Active courses</Text>
          <Suspense fallback={<Text>Loading Details...</Text>}>
            <ActiveCourseTest></ActiveCourseTest>
          </Suspense>
        </View>

      <View style={styles.activeCoursesContainer}>
        <Text style={styles.activeCoursesTitle}>Log Out</Text>
        <LogOutButton></LogOutButton>
      </View>


        <View style={styles.bottomNavBarContainer}>
          <BottomNavBar nav={props.navigation}></BottomNavBar>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F1F0',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10%',
    height: Dimensions.get('window').height
  },
  topNavBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  activeCoursesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
    marginBottom: 10
  },
  activeCoursesTitle: {
    fontWeight: 'bold',
    color: '#878787',
    fontSize: 18,
  },
  bottomNavBarContainer: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '5%',
  }
});
