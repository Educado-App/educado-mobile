import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import SectionContainer from '../../components/SectionContainer';

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

    const { section } = route.params;


    const [components,setComponents] = useState(null);
    const [progress, setProgress] = useState(0);


  useEffect(() => {

        const fetchComponents = async () => {
            const data = await getAllComponents(section.components);
            setComponents(data);
        };

        fetchComponents();
  },[])

  let ActiveComponent;

  if (components !== null) {
      ListContent = components.map((component,index) => {
            return (
              <SectionContainer section={section} key={index}></SectionContainer>
          )
      });
  } else {
      ListContent = <Text>Waiting...</Text>
  }

  return (
    <View style={styles.container}>

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
