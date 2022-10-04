import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, Button, Dimensions} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native";

const STORAGE_LANGUAGE = '@storage_language';
const STORAGE_COUNTRY = '@storage_country';

export default function SetLanguage(props) {

    const navigation = useNavigation();

    // Check if local user id is set
        // If not, then generate and save
        // If yes, then continue
    // Check if language and country is set
        // If not, then prompt user and save
        // If yes, then continue 

        const [language, setLanguage] = useState(''); // Local state variable for storing language
        const [country, setCountry] = useState(''); // Local state variable for storing country

        // Function for reading local user id from async local storage
        const readId = async () => {
            try {
                const fetchedLocalId = await AsyncStorage.getItem(STORAGE_ID);
                
                if (fetchedLocalId !== null) {
                    setLocalId(fetchedLocalId);
                    console.log('Already set, now logged in!');
                    navigation.navigate('Home');
                } else {
                    
                    try {
                        await AsyncStorage.setItem(STORAGE_ID,localId);
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
    
    
    useEffect(() => {
        readId();
    },[])


  return (
    <View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
