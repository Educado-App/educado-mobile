import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, ScrollView, RefreshControl } from 'react-native';
import Text from '../../components/general/Text';
import * as StorageService from '../../services/StorageService';
import CourseCard from '../../components/courses/courseCard/CourseCard';
import BaseScreen from '../../components/general/BaseScreen';
import IconHeader from '../../components/general/IconHeader';
import { shouldUpdate } from '../../services/utilityFunctions';
import ToastNotification from '../../components/general/ToastNotification';
import LoadingScreen from '../../components/loading/Loading';

/**
 * Course screen component that displays a list of courses.
 * @component
 * @returns {JSX.Element} The course screen component.
 */

export default function CourseScreen() {

  /**
    * React hook that declares a state variable for courses and a function to update it.
    * @typedef {[Object[], function]} CourseState
    * @returns {CourseState} The state variable and its updater function.
    */
  const [courses, setCourses] = useState([]);
  const [courseLoaded, setCourseLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  /**
     * Determines if the two arrays of courses are different and require an update.
     * @param {Array} courses1 - The first array of courses, typically representing the current state.
     * @param {Array} courses2 - The second array of courses, typically representing the new fetched data.
     * @returns {boolean} - Returns true if the two arrays are different and an update is required, otherwise false.
     */

  /**
    * Asynchronous function that loads the courses from storage and updates the state.
    * @returns {void}
    */
  async function loadCourses() {
    const courseData = await StorageService.getSubCourseList();
    if (shouldUpdate(courses, courseData)) {
      if (courseData.length !== 0 && Array.isArray(courseData)) {
        setCourses(courseData);
        setCourseLoaded(true);
      }
      else {
        setCourses([]);
        setCourseLoaded(false);
      }
    }
    setLoading(false);
  }
  loadCourses();

  // When refreshing the loadCourses function is called
  const onRefresh = () => {
    setRefreshing(true);
    loadCourses();
    setRefreshing(false);
  };

  useEffect(() => {
    // this makes sure loadcourses is called when the screen is focused
    const update = navigation.addListener('focus', () => {
      loadCourses();
    });
    return update;
  }, [navigation]);

  useEffect(() => {
    ToastNotification('success', 'Logado!');
  }, []);

  return (
    loading ? <LoadingScreen /> :
      <BaseScreen>
        {/** Checks if the course(s) has been loaded
             * If it has, it will render and map the courses
             * If not, it will render a message saying that there are no active courses (in portugese)
             */}
        {courseLoaded ?
          <View height="100%">
            <IconHeader
              title={'Bem Vindo!'}
              description={'Aqui você encontra todos os cursos em que você está inscrito!'}
            />
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              {courses.map((course, index) => (
                <CourseCard key={index} course={course}></CourseCard>
              )
              )
              }
            </ScrollView>
          </View>
          :
          <View className="bg-secondary justify-center items-center ">
            <View className="pt-24 pb-16">
              <Image source={require('../../assets/images/logo.png')} className=" justify-center items-center" />
            </View>
            <View className=" justify-center items-center py-10 gap-10 ">
              <View className=" justify-center items-center w-full h-auto  px-10">
                {/* No active courses */}
                <Image source={require('../../assets/images/no-courses.png')} />
                <Text className=" leading-[29.26] text-projectBlack pb-4 pt-4 font-sans-bold text-subheading text-center " >Comece agora</Text>
                <Text className=" text-projectBlack font-montserrat text-center text-body " > Você ainda não se increveu em nenhum curso. Acesse a página Explore e use a busca para encontrar cursos do seu intresse.</Text>
              </View>
              <View>
                <Pressable
                  testID={'exploreButton'}
                  className=" rounded-r-8 rounded-md bg-primary justify-center items-center py-4 w-full h-auto px-20 "
                  onPress={() => navigation.navigate('Explorar')}>
                  {/* Click to explore courses */}
                  <Text className=" text-projectWhite font-sans-bold text-center text-body " > Explorar cursos</Text>
                </Pressable>
              </View>
            </View>
          </View>
        }
      </BaseScreen>
  );
}
