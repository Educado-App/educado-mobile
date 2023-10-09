import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import FilterNavBar from '../../components/explore/FilterNavBar';
import { ScrollView } from 'react-native-gesture-handler';
import ExploreCard from '../../components/explore/ExploreCard';
import { client } from '../../api/userApi';
import singleIcon from '../../assets/singleIcon.png';

import { getBucketImage } from "../../api/api";

function Explore() {

  const [image, setImage] = React.useState(null);
  useEffect(() => {
    handleGettingImage(); 
  },[])

  const handleGettingImage = async () => {

    const res = await getBucketImage("gorilla")
    setImage(res);

  }
  
  // Search text state
  const [searchText, setSearchText] = useState('');
  // Selected category state
  const [selectedCategory, setSelectedCategory] = useState(null);


  //Sets dummy data for courses (will be replaced with data from backend)
  const [courses, setCourses] = useState([
    { 
        title: 'Introduction to Calculus',
        category: 'Mathematics',
        difficulty: 1,
        time: 12,
        rating: 1.4,
        published: true,
        dateUpdated: '2020-10-10',
        description: 'This course is an introduction to differential calculus. It covers all topics in differential calculus including limits, continuity, the derivative and its applications.'
    },
    { 
        title: 'World History',
        category: 'History',
        difficulty: 2,
        time: 8,
        rating: 3,
        published: true,
        dateUpdated: '2020-10-10',
        description: 'This course is an introduction to World History. It covers all topics in World History including ancient civilizations, the middle ages, and the modern era.'
    },
    { 
        title: 'Modern Art Movements',
        category: 'Art',
        difficulty: 3,
        time: 6,
        rating: 1,
        published: true,
        dateUpdated: '2020-10-10',
        description: 'This course is an introduction to Modern Art Movements. It covers all topics in Modern Art Movements including impressionism, cubism, surrealism, and pop art.'
    },
    { 
        title: 'category1',
        category: 'Finance',
        difficulty: 1,
        time: 9,
        rating: 3.2, 
        published: true,
        dateUpdated: '2020-10-10',
        description: 'This course is an introduction to category1. It covers all topics in category1 including topic1, topic2, and topic3.'
    }
]);

//Fetch courses from backend and replace dummy data!
useEffect(() => {
  client.get('/api/course/eml/getall')
  .then(res => {
    setCourses(res.data);
  })
  .catch(err => {
    console.log(err);
  })
}, []);

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
