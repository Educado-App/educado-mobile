import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, View, Image, Button, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native";
import LoginButton from "../../components/LoginButton";
import LoginForm from "../../components/LoginForm";

const {width, height} = Dimensions.get('window');

const STORAGE_ID = '@local_id';
const STORAGE_PROGRESS = '@storage_progress';

export default function Login(props) {

    const navigation = useNavigation();

    // Check if local user id is set
        // If not, then generate and save
        // If yes, then continue
    // Check if language and country is set
        // If not, then prompt user and save
        // If yes, then continue 

        const [localId, setLocalId] = useState(String(Date.now)); // Local state variable for storing local user id

        // Function for reading local user id from async local storage
       /* const readId = async () => {
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

                    await AsyncStorage.setItem(STORAGE_PROGRESS,JSON.stringify(obj));


                } else {
                    
                    try {
                        await AsyncStorage.setItem(STORAGE_ID,localId);

                        const obj = {
                            activeCourses: [],
                            finishedCourses: [],
                            upNext: [],
                        };

                        await AsyncStorage.setItem(STORAGE_PROGRESS,JSON.stringify(obj));

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
    },[]) */


  return (
    <View style={styles.container}>
        <Svg height = {height / 2} width = {width}>
            <Image
                href = {require('./assets/backgroundcolor.jpg')}
                width = {width}
                height = {height}
                preserveAspectRatio = "xMidYMid slice"
            />
        </Svg>

        <LoginForm></LoginForm>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {

    },

});
