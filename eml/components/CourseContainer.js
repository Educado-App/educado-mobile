
import React, {useEffect,useState, Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native';

import getPresignedUrl from './../hooks/getPresignedUrl';

import financeLogo from './../assets/financeLogo.png';
const financeLogoUri = Image.resolveAssetSource(financeLogo).uri;

export default class CourseContainer extends Component {

    state = {
        presignedUrl: financeLogoUri,
    }

    async componentDidMount() {
        const res = await getPresignedUrl(this.props.course._id);
        this.setState({
            ...this.state,
            presignedUrl: res,
        });
    }

    render() {
        const baseText = this.state.base;
        return (
            <Pressable
                onPress={() => this.props.nav.navigate('ActiveCourse',{course: this.props.course,url: this.state.presignedUrl})}
            >
                <View style={styles.container} >
              
                  <Image style={styles.cover} source={{uri: financeLogoUri}}></Image>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{this.props.course.title}</Text>
                        <Text style={styles.paragraph}>{this.props.course.description}</Text>
                    </View>
                </View>
            </Pressable>
          );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',

    borderWidth: 1,
    borderColor: '#878787',
    borderRadius: 10,
    margin: 10,
    width: Dimensions.get('window').width*0.9,
    height: Dimensions.get('window').height*0.2
  },
  title: {
    fontWeight: 'bold',
    flexWrap: 'wrap',
    fontSize: 15
  },
  cover: {
    width: '35%',
    height: '80%',
    margin: 10
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
  },    
  paragraph: {
      fontSize: 13
  }
});
