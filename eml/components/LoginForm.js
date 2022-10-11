import React, {useState} from 'react';
import {StyleSheet, Pressable, Text, Image, View, Dimensions, TextInput, TouchableOpacity} from "react-native";
import textInput from "react-native-web/dist/exports/TextInput";
import styles from "../../components/Styles";

const {width, height} = Dimensions.get('window');


export default function LoginForm(props) {

    const [number, setNumber] = useState('');
    const [password, setPass] = useState('');

    function gatherInput (number, password) {
        return {phoneNumber: number, password: password}
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
                               onChangeText={number => setNumber(number)}

                    />
                    <TextInput
                               style={styles.textInput}
                               placeholder="Password"
                               placeholderTextColor="green"
                               secureTextEntry={true}
                               onChangeText={password => setPass(password)}
                    />

                    <TouchableOpacity onPress={()=>{console.log(gatherInput(number, password))}}>
                        <View style={styles.formButton}>
                            <Text style={styles.buttonText}>Login</Text>
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
