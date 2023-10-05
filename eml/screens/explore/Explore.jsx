import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import FilterNavBar from '../../components/explore/FilterNavBar';
import { ScrollView } from 'react-native-gesture-handler';
import ExploreCard from '../../components/explore/ExploreCard';
import { client } from '../../api/userApi';
import {getCourseList} from '../../services/StorageService';
import { getSubCourseList } from '../../services/StorageService';



import { getBucketImage } from "../../api/api";

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
    <View style={{ flex: 1, backgroundColor: '#f1f9fb' }}>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, marginTop: '20%', marginBottom: '10%' }}>
        <Text style={{ fontSize: 25, marginLeft: 10, fontWeight: 'bold' }}>Explorar cursos</Text>
      </View>
      <FilterNavBar 
      onChangeText={(text) => handleFilter(text)} 
      onCategoryChange={handleCategoryFilter}
      />
      <ScrollView>
      {filteredCourses.map((course, index) => (
          <ExploreCard key={index} course={course} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Explore;
