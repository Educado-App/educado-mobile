
import React, {useEffect,useState, Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native';

export default class TextElement extends Component {

    state = {
    }

    async componentDidMount() {
        console.log('active debug');
        console.log(this.props.comp);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    {this.props.comp.text}
                </Text>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 10,
        margin: 10,
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.2
      }
});
