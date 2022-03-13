import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import SectionContainer from '../../components/SectionContainer';

import Component from './components/Component';

import ProgressBar from '../../components/ProgressBar';

import { getAllComponents, getAllSections } from '../../api/api';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CourseContainer from '../../components/CourseContainer';

const STORAGE_PROGRESS = '@storage_progress';

import { useRecoilState, useRecoilValue } from "recoil";

import { sectionProgressFlag } from "./../../recoil/atoms";

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

    const [flag,setFlag] = useRecoilState(sectionProgressFlag);


    const [components,setComponents] = useState();
    const [progress, setProgress] = useState(0);
    const [activeComponent,setActiveComponent] = useState(<Text>Loading content section...</Text>);
    const [progressLength,setProgressLength] = useState(0);
    const [completedSection, setCompletedSection] = useState(false);

  useEffect(() => {
        const fetchComponents = async () => {
            const data = await getAllComponents(section.components);
            setComponents(data);
            setProgressLength(data.length);
            setActiveComponent(<Component component={data[progress]} ></Component>);
        };

        fetchComponents();
        
  },[]);

  

  useEffect(() => {
    const updateProgressFunction = async () => {
        try {
            const fetchedProgress = await AsyncStorage.getItem(STORAGE_PROGRESS);
            const jsonProgress = JSON.parse(fetchedProgress);
            
            if (jsonProgress.activeCourses[0] === undefined) {
                
                const newObj = {
                    id: course._id,
                    sections: [section._id]
                }
    
                const newProgress = {...jsonProgress};

                newProgress.activeCourses.push(newObj);

              try {
                  await AsyncStorage.setItem(STORAGE_PROGRESS,JSON.stringify(newProgress));
                  console.log('Successfully added new progress course!');
              } catch (error) {
                  console.log('Error when writing new progress to storage');
              }
            } else {
                const updatedProgress = {...jsonProgress};
                updatedProgress.activeCourses.map(obj => {
                    if (obj.id === course._id) {
                        obj.sections.push(section._id);
                    }
                });
            
                try {
                    await AsyncStorage.setItem(STORAGE_PROGRESS,JSON.stringify(updatedProgress));
                    console.log('Successfully updated local storage progress!');
                } catch (error) {
                    console.log('Error when updating progress in existing course');
                }
            }
    
        } catch (error) {
            console.log('Error in updating section progress');
        };
        setFlag(!flag);
        navigation.navigate('Course',{course: course, coverImage: coverImage});
      };

      if (completedSection === true) {
        updateProgressFunction();
      }
  },[completedSection])

  const handleNext = async () => {
      if (progress+1 == progressLength) {
          setCompletedSection(true);
      } else {
        setProgress(progress+1);
        setActiveComponent(<Component component={components[progress+1]} ></Component>);
      };   
  };

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
