import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, Dimensions} from 'react-native';
import {useQuery,useMutation,useQueryClient} from 'react-query'

import { useRecoilState, useRecoilValue } from "recoil";


import CourseContainer from './../../components/CourseContainer';

import { allCourses } from "../../recoil/selectors";
import { currentCategory } from "./../../recoil/atoms";

export default function CoursesList(props) {

  const allCoursesItem = useRecoilValue(allCourses);

  const [category, setCategory] = useRecoilState(currentCategory);

  let ListContent;

  if (allCoursesItem !== []) {
      ListContent = allCoursesItem.map((course,index) => {
          if (course.category == category) {
            return (
              <CourseContainer key={index} course={course}></CourseContainer>
          )
          } else if (category == 'All') {
            return (
              <CourseContainer key={index} course={course}></CourseContainer>
          )
          } else {
            return
          }
      });
  } else {
      ListContent = <Text>Waiting...</Text>
  }

  return (
    <View style={styles.container}>
           <ScrollView >
                    {ListContent}
              </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height*0.6,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
});
