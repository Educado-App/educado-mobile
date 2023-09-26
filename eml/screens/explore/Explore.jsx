import React from 'react';
import { View, Text, Image } from 'react-native';
import FilterNavBar from '../../components/explore/FilterNavBar';
import { ScrollView } from 'react-native-gesture-handler';
import ExploreCard from '../../components/explore/ExploreCard';

function Explore() {

  const dummyCourses = [
    { title: 'Course 1', courseId: 1 },
    { title: 'Course 2', courseId: 2 },
    { title: 'Course 3', courseId: 3 },
    // Add more dummy courses here
  ];

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
      <FilterNavBar />
      <ScrollView>
      {dummyCourses.map((course, index) => (
          <ExploreCard key={index} title={course.title} courseId={course.courseId} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Explore;
