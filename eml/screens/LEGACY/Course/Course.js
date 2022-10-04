import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import SectionContainer from '../../components/SectionContainer';

import { useRecoilState, useRecoilValue } from "recoil";

import { sectionProgressFlag } from "../../../recoil/atoms";

import { getAllSections } from '../../../api/api';

import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_PROGRESS = '@storage_progress';


export default function Course(props) {
    // Component for showcasing course overview
    // Cover image: get passed as prop from CourseContainer
    // Title and description: get passed as prop under Course
    // Section information: get by async call to Api route getAllSections and return...

    const navigation = useNavigation();
    const route = useRoute();

    const { course, coverImage } = route.params;

    const [sections,setSections] = useState(null);
    const [completedSections,setCompletedSections] = useState([]);
    const [flag, setFlag] = useRecoilState(sectionProgressFlag);


  useEffect(() => {

        const fetchSections = async () => {
            const data = await getAllSections(course.sections);
            setSections(data);
        };

        fetchSections();
  },[])


  useEffect(() => {
    const readCompletedSections = async () => {
        const fetchedProgress = await AsyncStorage.getItem(STORAGE_PROGRESS);
        const jsonProgress = JSON.parse(fetchedProgress);

        console.log('Local storage on course (OBJ)...: ',jsonProgress);
        console.log('Local storage on course...: ',course._id);

        jsonProgress.activeCourses.map(obj => {
            if (obj.id == course._id) {
                setCompletedSections(obj.sections);
            }
        });

    }; 
    console.log('Before reading completed sections');
    readCompletedSections();

  },[flag])

  let ListContent;

  if (sections !== null) {

      ListContent = sections.map((section,index) => {
            let completed = false;

            //console.log(section._id);

            completedSections.map((obj,index) => {
                if (obj == section._id) {
                    completed = true;
                }
            });

            //console.log(completed);

            return (
              <SectionContainer course={course} coverImage={coverImage} section={section} key={index} completed={completed}></SectionContainer>
          )
      });
  } else {
      ListContent = <Text>Waiting...</Text>
  }

  return (
    <View style={styles.container}>
        <Image style={styles.coverImage} source={{uri: coverImage}}></Image>
        <Text style={styles.title}>{course.title}</Text>
        <ScrollView>
            <Text style={styles.description} >{course.description}</Text>
        </ScrollView>
        <ScrollView style={styles.sectionList} >
            {ListContent}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: '10%',
  },
  coverImage: {
      width: '100%',
      height: '20%',
      borderRadius: 10,
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 5
  },
  sectionList: {
      marginTop: 10
  },
  description: {
      padding: 8,
      fontSize: 18
  }
});
