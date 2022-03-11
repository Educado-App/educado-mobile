import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import SectionContainer from '../../components/SectionContainer';

import { getAllSections } from '../../api/api';

export default function Course(props) {
    // Component for showcasing course overview
    // Cover image: get passed as prop from CourseContainer
    // Title and description: get passed as prop under Course
    // Section information: get by async call to Api route getAllSections and return...

    const navigation = useNavigation();
    const route = useRoute();

    const { course, coverImage } = route.params;


    const [sections,setSections] = useState(null);


  useEffect(() => {

        const fetchSections = async () => {
            const data = await getAllSections(course.sections);
            setSections(data);
        };

        fetchSections();
  },[])

  let ListContent;

  if (sections !== null) {
      ListContent = sections.map((section,index) => {
            return (
              <SectionContainer course={course} coverImage={coverImage} section={section} key={index}></SectionContainer>
          )
      });
  } else {
      ListContent = <Text>Waiting...</Text>
  }

  return (
    <View style={styles.container}>
        <Image style={styles.coverImage} source={{uri: coverImage}}></Image>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.description} >{course.description}</Text>
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
      padding: 8
  }
});
