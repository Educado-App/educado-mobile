
import React, {useEffect,useState, Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native';


export default class SectionContainer extends Component {

    state = {
    }

    async componentDidMount() {
        this.setState({
            ...this.state,
        });
    }

    render() {
        return (
            <Pressable
                onPress={() => this.props.nav.navigate('ActiveSection',{section: this.props.section})}
            >
                <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>{this.props.section.title}</Text>
                    </View>
            </Pressable>
          );
    }
}

const styles = StyleSheet.create({
  sectionContainer: {
    borderWidth: 3,
    borderRadius: 7,
    borderColor: 'black',
    width: Dimensions.get('window').width*0.9,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
    },
    sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    }
});
