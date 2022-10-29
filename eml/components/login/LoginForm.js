import React, {useState} from 'react';
import {Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {loginUser} from "../../api/userApi";
import AsyncStorage from '@react-native-async-storage/async-storage'

const LOGIN_TOKEN = '@loginToken';
const USER_INFO = '@userInfo';


export default function LoginForm(props) {

    const navigation = useNavigation();

    const [phoneNumber, setPhoneNumber] = useState('+55');
    const [password, setPassword] = useState('');

    async function login (phoneNumber, password) {

        //clearing input
        setPhoneNumber('+55');
        setPassword('');

        //The Object must be hashed before it is sent to backend (before loginUser() is called)
        //The Input must be conditioned (at least one capital letter, minimum 8 letters and a number etc.)
        const obj = {
            phone: phoneNumber,
            password: password
        };

        try{
            await loginUser(obj)
                .then(function(response){
                    AsyncStorage.setItem(LOGIN_TOKEN, response.token);
                    console.log(response);
                    navigation.navigate('HomeStack');
                })
                .catch(error => {

                    switch (error.message){

                        case "Request failed with status code 404":
                            console.log("Wrong Phone Number!");
                            break;

                        case "Request failed with status code 400":
                            console.log("Wrong Password!");
                            break;

                        default: console.log(error);
                    }
                });
        }
        catch (e){
            console.log(e);
        }

    }

    return (
        <View style ={styles.container}>
            <View style ={StyleSheet.absoluteFill}>
                <View>
                    <Text style={styles.textLogoContainer}>Educado</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.formInputContainer}>
                    <TextInput style={styles.textInput}
                               placeholder="Phone Number"
                               placeholderTextColor="green"
                               keyboardType={"phone-pad"}
                               onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                               value={phoneNumber}
                    />
                    <TextInput
                               style={styles.textInput}
                               placeholder="Password"
                               placeholderTextColor="green"
                               secureTextEntry={true}
                               onChangeText={password => setPassword(password)}
                               value={password}
                    />

                    <Pressable style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1.0 }
                    ]} onPressOut={()=>{
                        login(phoneNumber, password);
                    }}>
                        <View style={styles.formButton}>
                            <Text style={styles.buttonText}>Login</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent : 'flex-start',
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
            marginVertical: '75%',
            justifyContent: 'center',
            height: '33%',
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
        textLogoContainer: {
            marginHorizontal : '33%',
            marginVertical: '33%',
            fontSize: 35,
            fontWeight: '400',
            color: 'green',
            letterSpacing: 0.5,
            height: 50,
            width: 1000,
            justifyContent: 'center'
        }
});
