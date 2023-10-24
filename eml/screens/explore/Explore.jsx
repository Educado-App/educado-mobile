import React from 'react';
import { useState, useEffect } from 'react';
import { View, Image, ScrollView, RefreshControl } from 'react-native';
import Text from '../../components/general/Text';
import FilterNavBar from '../../components/explore/FilterNavBar';
import ExploreCard from '../../components/explore/ExploreCard';
import * as StorageService from '../../services/StorageService';
import { useNavigation } from '@react-navigation/native';

function Explore() {

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
* Determines if the two arrays of courses are different and require an update.
* @param {Array} courses1 - The first array of courses, typically representing the current state.
* @param {Array} courses2 - The second array of courses, typically representing the new fetched data.
* @returns {boolean} - Returns true if the two arrays are different and an update is required, otherwise false.
*/
  function shouldUpdate(courses1, courses2) {
    // If both arrays are empty, they are equal, but should still update
    if (courses1.length === 0 && courses2.length === 0) {
      return true;
    }

    // If the lengths are different, they are not equal
    if (courses1.length !== courses2.length) {
      return true;
    }

    // If the IDs are different, they are not equal
    for (let i = 0; i < courses1.length; i++) {
      if (courses1[i].id !== courses2[i].id) {
        return true;
      }
    }
    return false;
  }

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

  useEffect( () => {
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
    const categoryMatchesFilter = !selectedCategory || course.category === selectedCategory;
    // Return true if both title and category conditions are met
    return titleMatchesSearch && categoryMatchesFilter;
  });

  const handleFilter = (text) => {
    setSearchText(text);
    // console.log("handleFilter", searchText);
  }

  const handleCategoryFilter = (category) => {
    //if category label is "all" it will display all courses, otherwise it will display courses with the selected category
    if (category === "All") {
      setSelectedCategory(null); // Set selectedCategory to null to show all items
    } else {
      setSelectedCategory(category); // Set selectedCategory to the selected category label
    }
  };



  return (
    <View className="flex-1 bg-[#f1f9fb]">

      <View className="flex flex-row items-center pl-6 pt-[30%] pb-[10%]">
        <Image
          source={require('../../assets/singleIcon.png')}
          alt="Icon"
          className="w-8 h-8 mr-2"
        />
        <Text className="text-xl font-bold">Explorar cursos</Text>
        
      </View>


      <FilterNavBar
        onChangeText={(text) => handleFilter(text)}
        onCategoryChange={handleCategoryFilter}
      />
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View className="overflow-y-auto">
          {courses && filteredCourses && filteredCourses.map((course, index) => (
            <ExploreCard
              key={index}
              isPublished={course.published}
              subscribed={isSubscribed[index]}
              course={course}
            ></ExploreCard>
          ))}
        </View>
      </ScrollView>

    </View>

  );
}





export default Explore;
