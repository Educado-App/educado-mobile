
import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';


export default function TopNavBar(props) {

    const getProfilePicture = async () => {
        //call some api to respond with the user's profile pic
        console.log("Searching for Profile Picture...");
        return 'https://reactnative.dev/img/tiny_logo.png';
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image style={styles.picture} source={{uri:getProfilePicture}}></Image>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    picture: {
        margin: 5,
    },
});
