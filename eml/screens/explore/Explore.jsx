import React from 'react';
import { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import  Text  from '../../components/general/Text';
import FilterNavBar from '../../components/explore/FilterNavBar';
import { ScrollView } from 'react-native-gesture-handler';
import ExploreCard from '../../components/explore/ExploreCard';
import {getCourseList} from '../../services/StorageService';

function Explore() {
  
  // Search text state
  const [searchText, setSearchText] = useState('');
  // Selected category state
  const [selectedCategory, setSelectedCategory] = useState(null);

  //Sets dummy data for courses (will be replaced with data from backend)
  const [courses, setCourses] = useState([
]);

//Fetch courses from backend and replace dummy data!
useEffect(() => {
  async function loadCourses() {
    const courseData = await getCourseList();
    setCourses(courseData);
  }
  loadCourses();
}, [courses]);

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
<ScrollView vertical >
  <View className="overflow-y-auto">
    {filteredCourses.map((course, index) => (
      
      <ExploreCard key={index} isPublished={course.published} course={course} />
      
    ))}
  </View>
  </ScrollView>

</View>

  );
}

export default Explore;
