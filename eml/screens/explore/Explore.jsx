import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import FilterNavBar from '../../components/explore/FilterNavBar';
import { ScrollView } from 'react-native-gesture-handler';
import ExploreCard from '../../components/explore/ExploreCard';

function Explore() {
  
  // Search text state
  const [searchText, setSearchText] = useState('');
  // Selected category state
  const [selectedCategory, setSelectedCategory] = useState(null);

  ///---------Dummy data should be replaced--------///

  const dummyCourses = [
    { 
        title: 'Introduction to Calculus',
        category: 'Mathematics',
        time: '12 weeks',
        rating: 1
    },
    { 
        title: 'Biology Fundamentals',
        category: 'Science',
        time: '10 weeks',
        rating: 2
    },
    { 
        title: 'World History: Ancient Civilizations',
        category: 'History',
        time: '8 weeks',
        rating: 3
    },
    { 
        title: 'Modern Art Movements',
        category: 'Art',
        time: '6 Hours',
        rating: 1
    },
    { 
        title: 'category1',
        category: 'Finance',
        time: '9 weeks',
        rating: 3.2
    }
    // Add more courses with realistic data here
];

///---------------------------------------------///

  // Function to filter courses based on searchText or selectedCategory
  const filteredCourses = dummyCourses.filter((course) => {
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
        <View className="pl-2">
        <Image
          source={require('../../assets/singleIcon.png')} // Use the path to your PNG file
          style={{ width: 25, height: 25 }} // Define the width and height of the image
        />
        </View>
        <Text style={{ fontSize: 25, marginLeft: 10, fontWeight: 'bold' }}>Explora cursos</Text>
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
