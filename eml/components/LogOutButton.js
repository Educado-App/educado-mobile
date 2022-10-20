//Navigation til Login Screen

//Feather icons

//State på at man har logget ud

//bevar state til næste åbning af app

//importer state i login form

import axios from "axios";
//import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Alert} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import {NavigationActions as navigation} from "react-navigation";

const test = 'http://192.168.43.130:8888'

const url = test;


//måske et udkast til setup af post request til server om at brugeren er logget ud
export const postLogoutStatusAndNavigate = async(obj) => {

    const res = await axios.post(url + "",obj)
        .then(function(response){console.log(response)})
        .catch(function (error){console.log(error)});

    console.log('user logged out');

    navigation.navigate('Login');

    return res.data;
}

export default function LogOutButton() {

    const navigation = useNavigation();

    const logoutAlert = () =>
        Alert.alert(
            "Logout",
            "Are you sure?",
            [
                {
                    text: "No",
                    onPress: () => console.log("No Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => navigation.navigate('Login')}
            ]
        );

    return (
        <View style ={styles.container}>

            <TouchableOpacity style={styles.formButton} onPress={logoutAlert}>
                <Feather name="log-out" size={36}  style={styles.tinyLogo} />
            </TouchableOpacity>

            <View style={styles.bottomContainer}>
                <View style={styles.formInputContainer}>
                    <TouchableOpacity onPress={() => postLogoutStatusAndNavigate(obj)}>
                        <View style={styles.formButton}>
                            <Feather name="log-out" size={36}  style={styles.menu} />

                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent : 'flex-start'
    },
    buttonText:{
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        letterSpacing: 0.5
    },
    bottomContainer:{
        marginVertical: '150%',
        justifyContent: 'center',
        height: '25%',
    },
    formButton: {
        backgroundColor : 'white',
        width : 75,
        height : 55,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius: 15,
        marginHorizontal : 325,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'black',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3.84,
        elevation: 5,
    },
    formInputContainer:{
        marginBottom: 70
    },
    tinyLogo: {
        width: 50,
        height: 50,
    }
});
