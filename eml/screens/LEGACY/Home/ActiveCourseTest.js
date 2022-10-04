import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import {useQuery,useMutation,useQueryClient} from 'react-query'

import { useRecoilState, useRecoilValue } from "recoil";

import CourseContainer from '../../components/CourseContainer';

import { activeCourse } from "../../recoil/selectors";

export default function ActiveCourseTest(props) {

  const activeCourseItem = useRecoilValue(activeCourse);

  return (
    <View>
            <CourseContainer nav={props.navigation} key={1} course={activeCourseItem}></CourseContainer>
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
    marginTop: '10%'
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
});
