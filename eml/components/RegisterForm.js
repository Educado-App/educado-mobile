import React, {useState} from "react";
import {StyleSheet, Pressable, Text, Image, View, Dimensions, TextInput, TouchableOpacity} from "react-native";

const {width, height} = Dimensions.get('window');

import {useNavigation} from "@react-navigation/native";
import {useRoute} from "@react-navigation/native";
import {registerUser} from "../api/userApi";

export default function LoginForm(props) {
    const navigation = useNavigation();
    const route = useRoute().name;

    const [name, setName] = useState('');
    const [phoneNumber, setNumber] = useState('');
    const [password, setPass] = useState('');

    function validateInput (name, phoneNumber, password) {

        const obj = {
            name: name,
            phoneNumber: phoneNumber,
            password: password
        };

        //Check if the input is valid, if not throw exception
        //If yes, call the api to see if the user exists
        //If not register user in the database

        let userExists = async () => {
            await console.log("User may exist");
        };

        if(!userExists){
            //Call the api to register user
            registerUser(obj).then(r => console.log("User registered"));
        }
        return console.log(obj);
    }


    return (
        <View style ={styles.container}>
            <View style ={StyleSheet.absoluteFill}>
                <View>
                    <Text style={styles.textLogoContainer}>Register User</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.formInputContainer}>
                    <TextInput style={styles.textInput}
                               placeholder="Name"
                               placeholderTextColor="green"
                               onChangeText={name => setName(name)}


                    />
                    <TextInput style={styles.textInput}
                               placeholder="Phone Number"
                               placeholderTextColor="green"
                               keyboardType={"phone-pad"}
                               onChangeText={phoneNumber => setNumber(phoneNumber)}

                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        placeholderTextColor="green"
                        secureTextEntry={true}
                        onChangeText={password => setPass(password)}
                    />
                    <TouchableOpacity onPress={()=>{validateInput(name, phoneNumber, password)}}>
                        <View style={styles.formButton}>
                            <Text style={styles.buttonText}>Register</Text>
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
        justifyContent : 'flex-start',
        backgroundColor: 'rgba(86, 255, 131, 0.97)'
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
        marginHorizontal : '20%',
        marginVertical: '25%',
        fontSize: 35,
        fontWeight: '400',
        color: 'green',
        letterSpacing: 0.5,
        height: 50,
        width: 1000,
        justifyContent: 'center'
    }
});
