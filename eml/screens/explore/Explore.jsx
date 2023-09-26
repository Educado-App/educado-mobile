import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import FilterNavBar from '../../components/explore/FilterNavBar';
import { ScrollView } from 'react-native-gesture-handler';
import ExploreCard from '../../components/explore/ExploreCard';

function Explore() {
  
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

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
        title: 'Introduction to Music Theory',
        category: 'Music',
        time: '9 weeks',
        rating: 3.2
    }
    // Add more courses with realistic data here
];


  // Function to filter courses based on searchText
  const filteredCourses = dummyCourses.filter((course) =>
  course.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleFilter = (text) => {
    setSearchText(text);
    // console.log("hanleFilter", searchText);
  }

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
      <FilterNavBar onChangeText={(text) => handleFilter(text)} />
      <ScrollView>
      {filteredCourses.map((course, index) => (
          <ExploreCard key={index} course={course} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Explore;
