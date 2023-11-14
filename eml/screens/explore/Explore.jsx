import React from 'react';
import { useState, useEffect } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import FilterNavBar from '../../components/explore/FilterNavBar';
import ExploreCard from '../../components/explore/ExploreCard';
import * as StorageService from '../../services/StorageService';
import { useNavigation } from '@react-navigation/native';
import BaseScreen from "../../components/general/BaseScreen";
import IconHeader from "../../components/general/IconHeader";
import { shouldUpdate, determineCategory } from '../../services/utilityFunctions';
import Text from '../../components/general/Text';
import LoadingScreen from '../../components/loading/Loading';
import OfflineBanner from "../../components/general/OfflineBanner";
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  const [isOnline, setIsOnline] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation()


  const checkBackendConnection = async () => {
    try {
      setIsOnline(await StorageService.checkIfOnline());
      setLoading(false);
    } catch (error) {
      setLoading(false)
      throw error;
    }
  }
  checkBackendConnection();

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
      checkBackendConnection();
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
    loading ? (<LoadingScreen />) :
      <BaseScreen>
        <OfflineBanner />
        {!isOnline ?
          <View>
            <IconHeader title={"Explorar cursos"} />
            <View className="justify-center h-[80%]">
              <MaterialCommunityIcons name="wifi-off" size={200} color="rgb(255,50,90)" style={{ alignSelf: 'center' }} />
              <Text className="text-error text-center font-montserrat-bold text-[24px]">
                {"\n"} Você está offline.{"\n"}Conecte-se à internet para explorar os cursos.
              </Text>
            </View>
          </View>
          :
          <View height="100%">
            <IconHeader title={"Explorar cursos"} />
            <FilterNavBar
              onChangeText={(text) => handleFilter(text)}
              onCategoryChange={handleCategoryFilter}
            />
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              <View className="overflow-y-auto">
                {courses && filteredCourses && filteredCourses.map((course, index) => (
                  <ExploreCard
                    key={index}
                    isPublished={course.status === 'published'}
                    subscribed={isSubscribed[index]}
                    course={course}
                  ></ExploreCard>
                ))}
              </View>
            </ScrollView>
          </View>
        }
      </BaseScreen>
  );
}