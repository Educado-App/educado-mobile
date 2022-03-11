import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import SectionContainer from '../../components/SectionContainer';

import Component from './components/Component';

import ProgressBar from '../../components/ProgressBar';

import { getAllComponents, getAllSections } from '../../api/api';


export default function Section(props) {
    // Component for showcasing single section
    // Get all components 
    // Make array for keeping track of progress
    // Render top progress bar 
        // Take length of components array to evaluate length 
        //

    const navigation = useNavigation();
    const route = useRoute();

    const { section, course, coverImage} = route.params;


    const [components,setComponents] = useState();
    const [progress, setProgress] = useState(0);
    const [activeComponent,setActiveComponent] = useState(<Text>Loading content section...</Text>);
    const [progressLength,setProgressLength] = useState(0);

  useEffect(() => {
        const fetchComponents = async () => {
            const data = await getAllComponents(section.components);
            setComponents(data);
            setProgressLength(data.length);
            setActiveComponent(<Component component={data[progress]} ></Component>);
        };

        fetchComponents();
        
  },[])

  const handleNext = () => {
      if (progress+1 == progressLength) {
          navigation.navigate('Course',{course: course, coverImage: coverImage});
      }
      setProgress(progress+1);
      setActiveComponent(<Component component={components[progress+1]} ></Component>);
  } 

  return (
    <View style={styles.container}>
        <ProgressBar activeIndex={progress} length={progressLength}></ProgressBar>
        {activeComponent}
        <Button onPress={handleNext} title="Next"/>
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
