import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, Pressable, Dimensions} from 'react-native';

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
      console.log('WTF!!?!?!?');
    const updateProgressFunction = async () => {
        
        try {
            // Fetch progress from local storage
            const fetchedProgress = await AsyncStorage.getItem(STORAGE_PROGRESS);
            const jsonProgress = JSON.parse(fetchedProgress);

            
            // Check if activeCourses stored locally is empty
            if (jsonProgress.activeCourses[0] === undefined) {
                // If it is empty, then create a new object with the course id and section id
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
                // Inside else loop, meaning that json.Progress.activeCourses is NOT emtpty
                console.log('Inside else loop, meaning that json.Progress.activeCourses is NOT emtpty');
                const updatedProgress = {...jsonProgress}; // Copy the jsonProgress

                console.log(updatedProgress);

                let noActiveCourse = false;

                updatedProgress.activeCourses.map(obj => {
                    if (obj.id == course._id) { // If the course from local storage is equal to the one currently on....
                        noActiveCourse = false;
                        obj.sections.push(section._id);
                    } else {
                        noActiveCourse = true;
                    }
                });
                
                if (noActiveCourse == true) {
                    const newObj = {
                        id: course._id,
                        sections: [section._id]
                    }
                    
                    updatedProgress.activeCourses.push(newObj);
                }

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

  const handleBack = async () => {
        if (progress-1 == -1) {
            navigation.navigate('Course',{course: course, coverImage: coverImage});
        } else {
            setProgress(progress-1);
            setActiveComponent(<Component component={components[progress-1]} ></Component>);
        }
};

  return (
    <View style={styles.container}>
        <ProgressBar activeIndex={progress} length={progressLength}></ProgressBar>
        {activeComponent}
        <View style={styles.controllerBox}>
            <Pressable onPress={handleBack} style={styles.backBox}>
                    <Text style={styles.backText}>Back</Text>
            </Pressable>
            <Pressable onPress={handleNext} style={styles.nextBox}>
                    <Text style={styles.nextText}>Next</Text>
            </Pressable>
        </View>
        
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
    height: '100%',
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
  },
  nextText: {
      color: 'white',
      fontSize: 25
  },
  nextBox: {
      display: 'flex',
      backgroundColor: 'green',
      width: '50%',
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5

  },
  backText: {
    color: 'white',
    fontSize: 25
    },
    backBox: {
        display: 'flex',
        backgroundColor: 'red',
        width: '50%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5

    },
  controllerBox: {
      display: 'flex',
      width: Dimensions.get('window').width,
      flexDirection: 'row',
      position: 'absolute',
      bottom: 20
  }
});
