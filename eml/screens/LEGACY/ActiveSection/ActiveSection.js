import React, {Component, useEffect,useState} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native';

//'http://192.168.0.10:5000/api/course/eml/getall'

import TextElement from './components/TextElement';
import VideoElement from './components/VideoElement';
import ImageElement from './components/ImageElement';

const getComponents = async (components) => {
    const obj = {
        components: components
    };
    const res = await axios.post('http://colibri.somethingnew.dk/api/component/getallcomponents',obj);
    return res.data;
};


class ActiveSection extends Component {

    state = {
      components: []
    }

    async componentDidMount() {
      const componentsTemp = await getComponents(this.props.navigation.state.params.section.components);
      this.setState({
        ...this.state,
        components: componentsTemp,
      });
    }

    render() {
      let ListContent;
      if (this.state.components !== []) {
         ListContent = this.state.components.map((component,index) => {
          switch (component.type) {
            case 'TEXT':
              return(<TextElement key={index} comp={component}></TextElement>);
            case 'VIDEO': 
              return(<VideoElement key={index} comp={component}></VideoElement>);
            case 'IMAGE': 
              return(<ImageElement key={index} comp={component}></ImageElement>);
            default:
              break;
          };
          });
        } else {
          ListContent = <Text>Waiting...</Text>;
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

export default ActiveSection;