import React, {Component, useEffect,useState} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native';

import CourseContainer from './../../components/CourseContainer';
//'http://192.168.0.10:5000/api/course/eml/getall'

const getCourses = async () => {
    const res = await axios.get('http://colibri.somethingnew.dk/api/course/eml/getall');
    return res.data;
};

class Courses extends Component {

    state = {
        coursesList: [],
    }

    async componentDidMount() {
        const coursesTemp = await getCourses();
        this.setState({
            ...this.state,
            coursesList: coursesTemp
        });
    }

    render() {
        let ListContent;
        if (this.state.coursesList !== []) {
            ListContent = this.state.coursesList.map((course,index) => {
                return (
                    <CourseContainer nav={this.props.navigation} key={index} course={course}></CourseContainer>
                )
            });
        } else {
            ListContent = <Text>Waiting...</Text>
        }



        return (
            <View style={styles.container}>
                <ScrollView>
                    {ListContent}
                </ScrollView>
            </View>
          );
    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
});

export default Courses;