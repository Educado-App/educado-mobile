
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native';


export default function CategoryContainer(props) {

  return (
    <View style={styles.container} >
      <Pressable
            onPress={() => props.nav('Courses')}
        >
          <Text style={styles.title}>{props.title}</Text>
          <Image style={styles.logo} source={{uri: props.image}}></Image>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 10,
    margin: 10,
    width: Dimensions.get('window').width*0.4,
    height: Dimensions.get('window').height*0.2
  },
  title: {
    fontWeight: 'bold',

  },
  logo: {
    width: 100,
    height: 100
  }
});
