import React, {Component, useEffect,useState} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';

import SectionContainer from './../../components/SectionContainer';


const getSections = async (sections) => {
    const obj = {
        sections: sections
    };
    // Send req to server
    const res = await axios.post('http://colibri.somethingnew.dk/api/eml/course/getallsections',obj);
    return res.data;
};


class ActiveCourse extends Component {

    state = {
        sections: [],
        course: this.props.navigation.state.params.course
    }

    async componentDidMount() {
        const tempSections = await getSections(this.props.navigation.state.params.course.sections);
        this.setState({
            ...this.state,
            sections: tempSections
        })
    }

    render() {

        let ListContent;
        if (this.state.sections !== []) {
            ListContent = this.state.sections.map((section,index) => {
                return (
                    <SectionContainer nav={this.props.navigation} key={index} section={section}></SectionContainer>
                )
            });
        } else {
            ListContent = <Text>Waiting...</Text>
        }


        return (
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.state.course.title}</Text>
                    <Image style={styles.image} source={{uri: this.props.navigation.state.params.url}}></Image>
                    <Text style={styles.description}>{this.state.course.description}</Text>
                    {ListContent}
                </View> 
            </ScrollView>
          );
    }
  
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        flexGrow: 1,
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'column'
  },
  image: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height*0.3,
      aspectRatio: 1,
  },
  title: {
      fontSize: 30,
      fontWeight: 'bold'
  },
  description: {
      fontSize: 15
  },
  
});

export default ActiveCourse;