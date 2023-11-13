import React, { useState, useEffect } from 'react';
import { Alert, View, TouchableOpacity } from 'react-native';
import Text from '../../components/general/Text';
import * as StorageService from '../../services/StorageService';
import SectionCard from '../../components/section/SectionCard';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CustomProgressBar from '../../components/exercise/Progressbar';
import BaseScreen from '../../components/general/BaseScreen';
import SubscriptionCancel from '../../components/section/CancelSubscriptionButton';
import { unsubscribe } from '../../services/StorageService';
import PropTypes from 'prop-types';


/**
 * Section screen component that displays a list of sections for a given course.
 * @param {object} route - The route object containing the courseId parameter.
 * @returns {JSX.Element} - The SectionScreen component.
 */
export default function SectionScreen({ route }) {
  SectionScreen.propTypes = {
    route: PropTypes.object,
  };
  const { courseId } = route.params;
  const navigation = useNavigation();
  const [sections, setSections] = useState(null);
  const [course, setCourse] = useState([]);

  /**
   * Loads the sections for the given course from the backend.
   * @param {string} id - The id of the course to load sections for.
   */
  async function loadSections(id) {
    const sectionData = await StorageService.getSectionList(id);
    setSections(sectionData);
  }

  /**
   * Loads the course data for the given courseId from the backend.
   * @param {string} id - The id of the course to load.
   */
  async function getCourse(id) {
    const courseData = await StorageService.getCourseId(id);
    setCourse(courseData);
  }

  // Fetch courses from backend and replace dummy data!
  useEffect(() => {
    let componentIsMounted = true;

    /**
     * Loads the sections and course data for the given courseId.
     */
    async function loadData() {
      await loadSections(courseId);
      await getCourse(courseId);
    }

    if (componentIsMounted) {
      loadData();
    }

    return () => componentIsMounted = false;
  }, []);

  /**
   * Displays an alert to confirm unsubscribing from the course.
   */
  const unsubAlert = () =>
    Alert.alert('Cancelar subscrição', 'Tem certeza?', [
      {
        text: 'Não',
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      },
      { text: 'Sim', onPress: () => { unsubscribe(courseId); setTimeout(() =>  {navigation.goBack();}, 300 ); }},
    ]);

  return (
    <BaseScreen>
      <View className="flex flex-row items-center justify-beween px-6 pt-[20%]">
        {/* Back Button */}
        <TouchableOpacity className="pr-3" onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={25} color="black" />
        </TouchableOpacity>

        {/* Course Title */}
        <Text className="text-[25px] font-bold">{course.title}</Text>

        {/* Spacer to push the Unsubscribe Button to the right */}
        <View style={{ flex: 1 }}></View>

        {/* Unsubscribe Button */}
        <SubscriptionCancel onPress={unsubAlert} />
      </View>

      {/* Conditionally render the sections if they exist */}
      {sections ? (
        sections.length === 0 ? null : (
          <View className="flex-[1] flex-col my-[10px]">

            {/* Progress Bar */}
            {/* TODO: Implement progress dynamically */}
            <CustomProgressBar width={60} progress={50} height={3}></CustomProgressBar>

            {/* Section Cards */}
            <ScrollView className="mt-[5%]" showsVerticalScrollIndicator={false}>
              {sections.map((section, i) => {
                return <SectionCard key={i} section={section}></SectionCard>;
              })}
            </ScrollView>

          </View>
        )
      ) : null}

    </BaseScreen>
  );
}
