
import React, {useEffect,useState, Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native';

import financeLogo from './../../../assets/financeLogo.png';
const financeLogoUri = Image.resolveAssetSource(financeLogo).uri;

import getPresignedUrlFile from './../../../hooks/getPresignedUrlFile';

export default class ImageElement extends Component {

    state = {
        imageUri: financeLogoUri    
    }

    async componentDidMount() {
        const res = await getPresignedUrlFile(this.props.comp.file);
        this.setState({
            ...this.state,
            imageUri: res
        });
    }

    render() {
        return (
            <Image 
                style={styles.container}
                source={{uri: this.state.imageUri}}
            >
            </Image>
            
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
