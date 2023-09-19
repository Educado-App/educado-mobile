import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../../components/login/LoginForm";
import { LinearGradient } from 'expo-linear-gradient';


const STORAGE_ID = '@local_id';
const STORAGE_PROGRESS = '@storage_progress';
const LOGIN_TOKEN = '@loginToken';

export default function Login(props) {

  const navigation = useNavigation();

  // Check if local user id is set
  // If not, then generate and save
  // If yes, then continue
  // Check if language and country is set
  // If not, then prompt user and save
  // If yes, then continue

  const [localId, setLocalId] = useState(String(Date.now)); // Local state variable for storing local user id
  // eslint-disable-next-line no-unused-vars
  const [loginToken, setLoginToken] = useState('');

  // Function for reading local user id from async local storage
  // eslint-disable-next-line no-unused-vars
  const readId = async () => {
    try {
      const fetchedLocalId = await AsyncStorage.getItem(STORAGE_ID);

      if (fetchedLocalId !== null) {
        setLocalId(fetchedLocalId);
        console.log('Already set, now logged in!');
        const obj = {
          activeCourses: [],
          finishedCourses: [],
          upNext: [],
        };

        await AsyncStorage.setItem(STORAGE_PROGRESS, JSON.stringify(obj));


      } else {

        try {
          await AsyncStorage.setItem(STORAGE_ID, localId);

          const obj = {
            activeCourses: [],
            finishedCourses: [],
            upNext: [],
          };

          await AsyncStorage.setItem(STORAGE_PROGRESS, JSON.stringify(obj));

          console.log('User successfully created and stored!');
          navigation.navigate('Home');
        } catch (error) {
          console.log('Error when storing user...')
        }
      }

    } catch (error) {
      console.log('Failed to fetch the data from storage');
    }
  };

  const checkLoginToken = async () => {

    try {
      const fetchedToken = await AsyncStorage.getItem(LOGIN_TOKEN);

      if (fetchedToken !== null) {
        setLoginToken(fetchedToken);
        console.log('Already logged in!');
        console.log('Token: ' + fetchedToken);
        navigation.navigate('HomeStack');
      }

    } catch (error) {
      console.log('Failed to fetch the login token from storage');
    }

  }

  useEffect(() => {
    // readId();
    checkLoginToken();
  }, []);


  return (
    <View className='bg-primary flex-1 justify-start'>
      <LinearGradient colors={['#5ECCE9', '#FFFFFF']}>
        <LoginForm></LoginForm>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <View style={styles.formButton}>
              {/* Register a new account */}
              <Text style={styles.buttonText}>Registrar uma nova conta</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  register: {
    // We need styling here!
  },
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
  bottomContainer: {
    marginVertical: '100%',
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
  formInputContainer: {
    marginBottom: 70
  },
  textLogoContainer: {
    marginHorizontal: '33%',
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
