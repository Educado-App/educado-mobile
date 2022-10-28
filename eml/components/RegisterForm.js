import React, {useState} from "react";
import {Dimensions, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {registerUser} from "../api/userApi";
import AsyncStorage from '@react-native-async-storage/async-storage'

const USER_INFO = '@userInfo';

const {width, height} = Dimensions.get('window');

export default function LoginForm(props) {

    const navigation = useNavigation();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    async function validateInput (phoneNumber, password) {

        //clearing input
        setPhoneNumber('');
        setPassword('');

        const obj = {
            phone: phoneNumber,
            password: password
        };

        try {
            await registerUser(obj)
                .then(function(response){

                    console.log(response.message);

                    const obj = {
                        phoneNumber: response.result.phone,
                        id: response.result._id
                    }

                    AsyncStorage.setItem(USER_INFO, JSON.stringify(obj));
                    navigation.navigate('Home');

                })
                .catch(function(error){
                    console.log(error)
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
                    <Text style={styles.textLogoContainer}>Register User</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.formInputContainer}>

                    <TextInput style={styles.textInput}
                               name={"phone"}
                               value={phoneNumber}
                               placeholder="Phone Number"
                               placeholderTextColor="green"
                               keyboardType={"phone-pad"}
                               onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                    />
                    <TextInput
                        style={styles.textInput}
                        name={"password"}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor="green"
                        secureTextEntry={true}
                        onChangeText={password => setPassword(password)}
                    />
                    <Pressable style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1.0 }
                    ]} onPress={()=>{validateInput(phoneNumber, password)}}>
                        <View style={styles.formButton}>
                            <Text style={styles.buttonText}>Register</Text>
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
