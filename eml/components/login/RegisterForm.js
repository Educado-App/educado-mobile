import React, {useState} from "react";
import {Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
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
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    async function register (phoneNumber, password) {

        // clearing input
        setPhoneNumber('');
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

                                AsyncStorage.setItem(LOGIN_TOKEN, response.data.accessToken);
                                console.log(response);
                                navigation.navigate('HomeStack');

                            })
                            .catch(error => {

                                switch (error.message) {

                                    case "Request failed with status code 404":
                                        // Wrong Phone Number
                                        console.log("Número de telefone errado!");
                                        break;

                                    case "Request failed with status code 400":
                                        //Wrong Password
                                        console.log("Senha incorreta!");
                                        break;

                                    default:
                                        console.log(error);
                                }
                            });
                    }
                    catch (e) {
                        console.log(e);
                    }

                    await createProfile(response._id, userName, phoneNumber);

                })
                .catch(error => {

                    console.log(error);
                    switch (error.message){

                        case "Request failed with status code 500":
                            // Phone Number already exists
                            showAlert("Número de telefone já existe!");
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
            //Try again
            "Tente novamente",

            [
                {
                    //OK
                    text: "Certo",
                    style: "cancel",
                },
            ],
            {
                cancelable: true,
            }
        );

    return (
        <View className='bg-secondary flex-1 justify-start'>
            <View style ={StyleSheet.absoluteFill}>
                <View>
                    {/* Register user */}
                    <Text className='mx-[20%] my-[25%] text-4xl font-normal text-black tracking-wider height-50 width-1000 justify-center'>Registrar usuário</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View className='mb-16'>

                    <TextInput style={styles.textInput}
                               name={"userName"}
                               value={userName}
                               //Username
                               placeholder="Nome do usuário"
                               placeholderTextColor="green"
                               onChangeText={userName => setUserName(userName)}
                    />

                    <TextInput style={styles.textInput}
                               name={"phone"}
                               value={phoneNumber}
                               //Phone Number
                               placeholder="Número de telefone"
                               placeholderTextColor="green"
                               keyboardType={"phone-pad"}
                               onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}

                    />
                    <TextInput
                        style={styles.textInput}
                        name={"password"}
                        value={password}
                        //Password
                        placeholder="Senha"
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
                            {/* Register */}
                            <Text style={styles.buttonText}>Registro</Text>
                        </View>
                    </Pressable>
                    <Pressable style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1.0 }
                    ]} onPress={()=>{
                        navigation.navigate("Login");
                    }}>
                        <View style={styles.formButton}>
                            {/* Go to Login */}
                            <Text style={styles.buttonText}>Ir para Entrar</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
});
