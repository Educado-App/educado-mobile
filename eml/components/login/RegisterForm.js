import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUser, registerUser } from "../../api/userApi";
import AsyncStorage from '@react-native-async-storage/async-storage'
import LogoBackButton from "./LogoBackButton";
import FormTextField from "./FormTextField";

const USER_INFO = '@userInfo';
const LOGIN_TOKEN = '@loginToken';

export default function LoginForm(props) {

  const navigation = useNavigation();

  const [realName, setRealName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function register(email, password) {

    // clearing input
    setEmail('');
    setPassword('');

    const obj = {
      phone: email,
      password: password
    };

    try {
      await registerUser(obj)
        .then(async function (response) {

          console.log(response);

          try {
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

          await createProfile(response._id, realName, email);

        })
        .catch(error => {

          console.log(error);
          switch (error.message) {

            case "Request failed with status code 500":
              // Phone Number already exists
              showAlert("Número de telefone já existe!");
              break;

            default: console.log(error);
          }
        });
    }
    catch (e) {
      console.log(e);
    }
  }


  async function createProfile(id, realName, email) {

    try {
      const obj = {
        id: id,
        realName: realName,
        email: email,
      }

      await AsyncStorage.setItem(USER_INFO, JSON.stringify(obj));
    }
    catch (e) {
      console.log(e);
    }

  }

  const passwordObj = {
    passwordStrength: password
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
      <LogoBackButton />
      <View className='justify-center'>
        <View className='mb-16'>

          <FormTextField
            label='Nome'
            name={'Name'}
            value={realName}
            //Real name
            placeholder='Nome Sobrenome'
            placeholderTextColor='grey'
            required={true}
            onChangeText={realName => setRealName(realName)}
          />

          <FormTextField className='mb-6'
            label='Email'
            name={'Email'}
            value={email}
            //Email
            placeholder='user@email.com'
            placeholderTextColor='grey'
            required={true}
            onChangeText={email => setEmail(email)}

          />

          <FormTextField
            label='Senha'
            name={'password'}
            value={password}
            //Password
            placeholder='******'
            placeholderTextColor='grey'
            secureTextEntry={true}
            required={true}
            passwordGuidelines={true}
            onChangeText={password => setPassword(password)}
          />


          {/* TODO: compare password with confirm password and give error if not same.*/}
          <FormTextField
            label='Confirmar Senha'
            name={'Confirm password'}
            value={password}
            //Confirm password
            placeholder='******'
            placeholderTextColor='grey'
            secureTextEntry={true}
            required={true}
          />

        </View>
        <Pressable style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1.0 }
        ]} onPress={() => {
          register(email, password);
        }}>
          <View style={styles.formButton}>
            {/* Register */}
            <Text style={styles.buttonText}>Registro</Text>
          </View>
        </Pressable>
        <Pressable style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1.0 }
        ]} onPress={() => {
          navigation.navigate('Login');
        }}>
          <View style={styles.formButton}>
            {/* Go to Login */}
            <Text style={styles.buttonText}>Ir para Entrar</Text>
          </View>
        </Pressable>
      </View >
    </View >
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(123,104,238,0.8)',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'white'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    letterSpacing: 0.5

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
    backgroundColor: 'white',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
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
