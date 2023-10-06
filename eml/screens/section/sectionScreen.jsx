import { React, useState, useEffect } from 'react';
import {Alert, View, TouchableOpacity} from 'react-native';
import Text  from '../../components/general/Text';
import TestComponent from '../../components/test/TestComponent';
import * as StorageService from '../../services/StorageService';
import * as DirectoryService from '../../services/DirectoryService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SectionCard from '../../components/courses/section/SectionCard';
import {ScrollView} from "react-native-gesture-handler";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function SectionScreen({ route }) {

  const { courseId } = route.params;
  const navigation = useNavigation();
  const [section, setSection] = useState([]);
  const [course, setCourse] = useState([]);


  async function loadSections(id) {
    const sectionData = await StorageService.getSections(id);
    setSection(sectionData);

  }
  async function getCourse(id) {
    const courseData = await StorageService.getCourseId(id);
    setCourse(courseData);

  }
  
  //Fetch courses from backend and replace dummy data!
  useEffect(() => {
    loadSections(courseId);
    getCourse(courseId);
  }, []);

  
  return (
      <View className="flex-1 bg-[#f1f9fb]">
        <View className="flex-row items-center p-[10] mt-[20%] mb-[10%]">
          <View className="pl-2">
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
              <MaterialCommunityIcons name="chevron-left" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <Text className="text-[25px] font-bold ml-[10]">{course.title}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        {section.map((section, i) => { return (
          <SectionCard key={i} section={section}></SectionCard>
          )
        }) 
    }
      </ScrollView>
      </View>
  );
}

