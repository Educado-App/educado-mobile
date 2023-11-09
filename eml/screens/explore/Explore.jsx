import React from 'react';
import { useState, useEffect } from 'react';
import {View, ScrollView, RefreshControl } from 'react-native';
import Text from '../../components/general/Text';
import FilterNavBar from '../../components/explore/FilterNavBar';
import ExploreCard from '../../components/explore/ExploreCard';
import * as StorageService from '../../services/StorageService';
import { useNavigation } from '@react-navigation/native';
import BaseScreen from "../../components/general/BaseScreen";
import IconHeader from "../../components/general/IconHeader";
import { shouldUpdate, determineCategory } from '../../services/utilityFunctions';

/**
 * Explore screen displays all courses and allows the user to filter them by category or search text.
 * @returns {JSX.Element} - Rendered component
 */
export default function Explore() {

  // Search text state
  const [searchText, setSearchText] = useState('');
  // Selected category state
  const [selectedCategory, setSelectedCategory] = useState(null);

  //Sets dummy data for courses (will be replaced with data from backend)
  const [courses, setCourses] = useState([]);
  const [subCourses, setSubCourses] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation()


  /**
  * Asynchronous function that loads the subscribed courses from storage and updates the state.
  * @returns {void}
  */
  async function loadSubscriptions() {
    const subData = await StorageService.getSubCourseList();
    if (shouldUpdate(subCourses, subData)) {
      if (subData.length !== 0 && Array.isArray(subData)) {
        setSubCourses(subData);
      }
      else {
        setSubCourses([]);
      }
    }
  }

  /**
  * Asynchronous function that loads the courses from storage and updates the state.
  * @returns {void}
  */
  async function loadCourses() {
    const courseData = await StorageService.getCourseList();
    if (shouldUpdate(courses, courseData)) {
      if (courseData.length !== 0 && Array.isArray(courseData)) {
        setCourses(courseData);
      }
      else {
        setCourses([]);
      }
    }
  }

  // When refreshing the loadCourse and load subscription function is called
  const onRefresh = () => {
    setRefreshing(true);
    loadSubscriptions();
    loadCourses();
    // Fetch subscriptions for filtered courses and set them in state
    fetchSubscriptionsForFilteredCourses().then((results) => {
      setIsSubscribed(results);
    });
    setRefreshing(false);
  };

  // Function to check if user is subscribed to a specific course
  async function fetchCourseSubscription(course) {
    const result = await StorageService.checkSubscriptions(course.courseId);
    return result;
  }

  // Function to check if user is subscribed to all filtered courses
  async function fetchSubscriptionsForFilteredCourses() {
    const results = await Promise.all(
      filteredCourses.map((course) => fetchCourseSubscription(course))
    );
    return results;
  }

  useEffect(() => {
    // this makes sure loadcourses is called when the screen is focused
    const update = navigation.addListener('focus', () => {
      loadCourses();
      loadSubscriptions();
    });
    // Fetch subscriptions for filtered courses and set them in state
    fetchSubscriptionsForFilteredCourses().then((results) => {
      setIsSubscribed(results);
    });
    return update;

  }, [navigation, subCourses]);

  ///---------------------------------------------///

  // Function to filter courses based on searchText or selectedCategory

  const filteredCourses = courses.filter((course) => {
    // Check if the course title includes the search text
    const titleMatchesSearch = course.title.toLowerCase().includes(searchText.toLowerCase());
    // Check if the course category matches the selected category (or no category is selected)
    const categoryMatchesFilter = !selectedCategory || determineCategory(course.category) === selectedCategory;
    // Return true if both title and category conditions are met
    return titleMatchesSearch && categoryMatchesFilter;
  });

  const handleFilter = (text) => {
    setSearchText(text);
    // console.log("handleFilter", searchText);
  }

  const handleCategoryFilter = (category) => {
    //if category label is "all" it will display all courses, otherwise it will display courses with the selected category
    if (category === "Todos") {
      setSelectedCategory(null); // Set selectedCategory to null to show all items
    } else {
      setSelectedCategory(category); // Set selectedCategory to the selected category label
    }
  };

  return (
    <BaseScreen>
      <IconHeader title={"Explorar cursos"}/>

      <FilterNavBar
        onChangeText={(text) => handleFilter(text)}
        onCategoryChange={handleCategoryFilter}
      />
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View className="overflow-y-auto">
          {courses.length !== 0 ?
              // Display courses
              courses && filteredCourses && filteredCourses.map((course, index) => (
                  <ExploreCard
                      key={index}
                      isPublished={course.status === 'published'}
                      subscribed={isSubscribed[index]}
                      course={course}
                  ></ExploreCard>
              ))
            :
              // No courses to display
              <Text className={"self-center align-middle text-2xl"}>Não há cursos a serem exibidos</Text>
          }
        </View>
      </ScrollView>

    </BaseScreen>
  );
}