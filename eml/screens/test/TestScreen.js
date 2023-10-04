import { React, useState, useEffect } from 'react';
import {Alert, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import TestComponent from '../../components/test/TestComponent';
import * as StorageService from '../../services/StorageService';
import * as DirectoryService from '../../services/DirectoryService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SectionCard from '../../components/courses/section/SectionCard';
import {ScrollView} from "react-native-gesture-handler";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { getHome } from '../../api/api';

export default function TestScreen() {
  const navigation = useNavigation();
  async function clearStorage() {
    //Uncomment to clear async storage cache upon loading explore screen
    //console.log(await AsyncStorage.getAllKeys(), 'BEFORE');
    //console.log(await AsyncStorage.clear(), 'CLEAR');
    //console.log(await AsyncStorage.getAllKeys(), 'AFTER');
    //console.log(await AsyncStorage.removeItem("635fb5b9b2fb6c4f49084682"))
    //console.log(await AsyncStorage.getAllKeys())
    //console.log(await DirectoryService.DeleteDirectory('6388ab98d77d454f20d070ff'));
    //console.log(await DirectoryService.ReadDirectory(''), 'READDIR');
    //console.log(await DirectoryService.DeleteDirectory('6380899d9394944d380de499'));
  }

  const [course, setCourse] = useState({});
  const [section, setSection] = useState({});

    async function loadCourse() {
        const courseData = await getHome();
        setCourse(courseData);
        const sectionData = course[0].sections[0];
        setSection(sectionData);
    }

  useEffect(() => {
    clearStorage();
  });
  
  return (
      <View style={{ flex: 1, backgroundColor: '#f1f9fb' }}>

        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, marginTop: '20%', marginBottom: '10%' }}>
          <View className="pl-2">
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
              <MaterialCommunityIcons name="chevron-left" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 25, marginLeft: 10, fontWeight: 'bold' }}>Matemática</Text>
        </View>
        <ScrollView>
          <SectionCard section={section}
              sectionNumber={section.sectionNumber}
              description={section.description}
              imageSrc={section.imageSrc}
              completed={section.completed}
              total={section.total}
          />
          {/*<SectionCard
              sectionNumber={2}
              description="Álgebra Linear: Introdução aos vetores, matrizes, determinantes e sistemas de equações lineares."
              imageSrc={require('../../assets/sectionThumbnail.png')}
              completed={1}
              total={2}
          />
          <SectionCard
              sectionNumber={3}
              description="Geometria Plana: Estudo das formas bidimensionais, incluindo triângulos, quadriláteros e círculos."
              imageSrc={require('../../assets/sectionThumbnail.png')}
              completed={2}
              total={3}
          />
          <SectionCard
              sectionNumber={4}
              description="Cálculo Diferencial: Exploração dos limites, derivadas e aplicações relacionadas ao cálculo diferencial."
              imageSrc={require('../../assets/sectionThumbnail.png')}
              completed={3}
              total={3}
          />
          <SectionCard
              sectionNumber={5}
              description="álculo Integral: Entendimento da integração, técnicas de integração e aplicações práticas."
              imageSrc={require('../../assets/sectionThumbnail.png')}
              completed={0}
              total={3}
          />
          <SectionCard
              sectionNumber={6}
              description="Estatística e Probabilidade: Introdução aos conceitos de média, mediana, desvio padrão, distribuições de probabilidade e teoremas fundamentais."
              imageSrc={require('../../assets/sectionThumbnail.png')}
              completed={1}
              total={3}
          />
          <SectionCard
              sectionNumber={7}
              description="Matemática Financeira: Estudo do valor do dinheiro no tempo, incluindo juros simples, juros compostos e séries de pagamentos."
              imageSrc={require('../../assets/sectionThumbnail.png')}
              completed={0}
              total={5}
  />*/}
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
