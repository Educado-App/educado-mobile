import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import FilterNavBar from '../../components/explore/FilterNavBar';
import { ScrollView } from 'react-native-gesture-handler';
import ExploreCard from '../../components/explore/ExploreCard';
import { client } from '../../api/userApi';

import { getBucketImage } from "../../api/api";

function Explore() {

  const [image, setImage] = React.useState(null);
  useEffect(() => {
    console.log("useEffect");   
    handleGettingImage(); 


  },[])

  const handleGettingImage = async () => {

    const res = await getBucketImage("gorilla")

    console.log("res", res);
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
        time: '12 weeks',
        rating: 1.4,
        published: true,
        dateUpdated: '2020-10-10',
        description: 'This course is an introduction to differential calculus. It covers all topics in differential calculus including limits, continuity, the derivative and its applications.'
    },
    { 
        title: 'World History',
        category: 'History',
        time: '8 weeks',
        rating: 3,
        published: true,
        dateUpdated: '2020-10-10',
        description: 'This course is an introduction to World History. It covers all topics in World History including ancient civilizations, the middle ages, and the modern era.'
    },
    { 
        title: 'Modern Art Movements',
        category: 'Art',
        time: '6 Hours',
        rating: 1,
        published: true,
        dateUpdated: '2020-10-10',
        description: 'This course is an introduction to Modern Art Movements. It covers all topics in Modern Art Movements including impressionism, cubism, surrealism, and pop art.'
    },
    { 
        title: 'category1',
        category: 'Finance',
        time: '9 weeks',
        rating: 3.2, 
        published: true,
        dateUpdated: '2020-10-10',
        description: 'This course is an introduction to category1. It covers all topics in category1 including topic1, topic2, and topic3.'
    }
]);

//Fetch courses from backend and replace dummy data!
{/*useEffect(() => {
  client.get('/api/course/eml/getall')
  .then(res => {
    setCourses(res.data);
  })
  .catch(err => {
    console.log(err);
  })
}, []);*/}

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
        <View className="pl-2">
        {/* <Image
          source={require('../../assets/singleIcon.png')}
          style={{ width: 25, height: 25 }}
        /> */}
        {image && <Image 
          style={{ width: 200, height: 200 }}
          source={image}
        />}
        </View>
        <Text style={{ fontSize: 25, marginLeft: 10, fontWeight: 'bold' }}>Explorar cursos</Text>
      </View>
      <FilterNavBar 
      onChangeText={(text) => handleFilter(text)} 
      onCategoryChange={handleCategoryFilter}
      />
      <ScrollView>
      
      {filteredCourses.map((course, index) => (
          <ExploreCard key={index} isPublished={course.published} course={course} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Explore;
