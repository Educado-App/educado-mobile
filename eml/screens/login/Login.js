import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../../components/login/LoginForm";
import FormButton from '../../components/login/FormButton';
import LeaveButton from '../../components/exercise/LeaveButton';


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
		<View className='mt-10'>
			<View className='flex-row justify-center w-full mt-4'>
        {/* TODO: Implement with general back button instead */}
				<View className='absolute left-0'>
					<LeaveButton
						navigationPlace='Home'
					/>
				</View>
				{/* Educado logo */}
				<Image 
          source={require('../../assets/logo_educado.png')}
          className='h-12'
          resizeMode='contain'
         />
			</View>
			{/* Login form */}
      <View className='my-8'>
			  <LoginForm/>
      </View>
			{/* Register button */}
			<FormButton label='Registrar uma nova conta' onPress={() => navigation.navigate('Register')}/>
		</View>
	);
}
