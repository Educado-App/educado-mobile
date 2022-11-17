import React, {useState} from "react";
import {Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {loginUser, registerUser} from "../../api/userApi";
import AsyncStorage from '@react-native-async-storage/async-storage'
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const USER_INFO = '@userInfo';
const LOGIN_TOKEN = '@loginToken';

const {height} = Dimensions.get('window');

export default function LoginForm(props) {

    const navigation = useNavigation();

    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('+55');
    const [password, setPassword] = useState('');

    async function register (phoneNumber, password) {

        //clearing input
        setPhoneNumber('+55');
        setPassword('');

        const obj = {
            phone: phoneNumber,
            password: password
        };

        try {
            await registerUser(obj)
                .then(async function (response) {

                    console.log(response);

                    try{
                        await loginUser(obj)
                            .then(function (response) {

                                AsyncStorage.setItem(LOGIN_TOKEN, response.token);
                                console.log(response);
                                navigation.navigate('HomeStack');

                            })
                            .catch(error => {

                                switch (error.message) {

                                    case "Request failed with status code 404":
                                        console.log("Wrong Phone Number!");
                                        break;

                                    case "Request failed with status code 400":
                                        console.log("Wrong Password!");
                                        break;

                                    default:
                                        console.log(error);
                                }
                            });
                    }
                    catch (e) {
                        console.log(e);
                    }

                    await createProfile(response.result._id, userName, phoneNumber);

                })
                .catch(error => {

                    console.log(error);
                    switch (error.message){

                        case "Request failed with status code 500":
                            showAlert("Phone Number already exists!");
                            break;

                        default: console.log(error);
                    }
                });
        }
        catch (e){
            console.log(e);
        }
    }


    async function createProfile (id, userName, phoneNumber){

        try {
            const obj = {
                id: id,
                userName: userName,
                phoneNumber: phoneNumber,
            }

            await AsyncStorage.setItem(USER_INFO, JSON.stringify(obj));
        }
        catch (e){
            console.log(e);
        }

    }

    const passwordObj = {
        passwordStrength : password
    };

    const showAlert = (error) =>
        Alert.alert(
            error,
            "Try again",
            [
                {
                    text: "OK",
                    style: "cancel",
                },
            ],
            {
                cancelable: true,
            }
        );

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
                               name={"userName"}
                               value={userName}
                               placeholder="Username"
                               placeholderTextColor="green"
                               onChangeText={userName => setUserName(userName)}
                    />

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
                    <View>
                        <PasswordStrengthMeter passwordObj={passwordObj}/>
                    </View>
                    <Pressable style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1.0 }
                    ]} onPress={()=>{
                        register(phoneNumber, password);
                    }}>
                        <View style={styles.formButton}>
                            <Text style={styles.buttonText}>Register</Text>
                        </View>
                    </Pressable>
                    <Pressable style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1.0 }
                    ]} onPress={()=>{
                        navigation.navigate("Login");
                    }}>
                        <View style={styles.formButton}>
                            <Text style={styles.buttonText}>Go to Login</Text>
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
        backgroundColor: 'rgba(86, 255, 131, 0.6)'
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
