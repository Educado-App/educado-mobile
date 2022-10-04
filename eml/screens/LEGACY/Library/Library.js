import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, Button, Dimensions} from 'react-native';
import {useQuery,useMutation,useQueryClient} from 'react-query'

import { useRecoilState, useRecoilValue } from "recoil";

import TopNavBar from './../../components/TopNavBar';

import BottomNavBar from '../../components/BottomNavBar';

import { allCourses } from "../../recoil/selectors";


export default function Library(props) {


//const CoursesListValue = useRecoilValue(allCourses);

  return (
    <View style={styles.container}>
        <View style={styles.topNavBar}>
          <TopNavBar></TopNavBar>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.activeCoursesTitle}>Library</Text>
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
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  bottomNavBarContainer: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '5%',
  }
});
