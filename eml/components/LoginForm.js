import React from "react";
import {StyleSheet, Pressable, Text, Image, View, Dimensions, TextInput} from "react-native";

const {width, height} = Dimensions.get('window');

import {useNavigation} from "@react-navigation/native";
import {useRoute} from "@react-navigation/native";

export default function LoginForm(props) {
    const navigation = useNavigation();
    const route = useRoute().name;

    return (
        <View style ={styles.container}>
            <View style ={StyleSheet.absoluteFill}>
                <View style ={styles.textLogoContainer}>
                    <Text>Educado...</Text>
                </View>

               {/* <View style={styles.closeButtonContainer}>


                <View style={styles.closeButtonContainer}>

                    <Text>X</Text>

                </View>*/}
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.formInputContainer}>
                    <TextInput placeholder="Phone Number" placeholderTextColor="black" style={styles.textInput} />
                    <TextInput placeholder="Password" placeholderTextColor="black"  style={styles.textInput} />
                    <View style={styles.formButton}>
                        <Text style={styles.buttonText}> LOG IN</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-center',
            backgroundColor: 'rgba(0, 173, 35,0.8)'
        },
        button: {
            backgroundColor : 'rgba(123,104,238,0.8)',
            height : 55,
            alignItems : 'center',
            justifyContent : 'center',
            borderRadius: 35,
            marginHorizontal : 20,
            marginVertical: 10,
            borderWidth: 1,
            borderColor: 'white'
        },
        buttonText:{
            fontSize: 20,
            fontWeight: '600',
            color: 'black',
            letterSpacing: 0.5

        },
        bottomContainer:{
            justifyContent: 'center',
            height: height,
        },
        textInput: {
            height: 50,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0, 0.2)',
            marginHorizontal: 20,
            marginVertical: 10,
            borderRadius: 25,
            paddingLeft: 10
        },
        formButton: {
            backgroundColor : 'white',
            height : 55,
            alignItems : 'center',
            justifyContent : 'center',
            borderRadius: 35,
            marginHorizontal : 20,
            marginVertical: 10,
            borderWidth: 1,
            borderColor: 'white',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,

        },
        formInputContainer:{
            marginBottom: 70
        },
       /* closeButtonContainer:{
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignSelf: 'center',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            borderRadius: 20
        },*/
        textLogoContainer: {
            marginHorizontal : 20,
            marginVertical: 75,
            fontSize: 30,
            fontWeight: '600',
            color: 'green',
            letterSpacing: 0.5,
            height: 50,
            width: 1000,
            justifyContent: 'center'
        }
});
