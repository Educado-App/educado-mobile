import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import LogOutButton from '../../components/profile/LogOutButton'
import ProfileNavigationButton from '../../components/profile/ProfileNavigationButton.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserInfo from '../../components/profile/UserInfo'
import { useNavigation } from '@react-navigation/native'
import { getUserInfo } from '../../services/StorageService'

const USER_INFO = '@userInfo';

/**
 * Profile screen
 * @returns {React.Element} Component for the profile screen
 */
export default function ProfileComponent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const getInfo = navigation.addListener('focus', () => {
      getProfile();
    });
    return getInfo;
  }, [navigation]);

  const points = 87; // placeholder for the points that will be fetched eventually @SocialGamified

  /**
  * Fetches the user's profile from the local storage
  */ 
  const getProfile = async () => {
    try {
      const fetchedProfile = JSON.parse(await AsyncStorage.getItem(USER_INFO));

      if (fetchedProfile !== null) {
        setFirstName(fetchedProfile.firstName);
        setLastName(fetchedProfile.lastName);
        setEmail(fetchedProfile.email);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  
  return (
    <SafeAreaView className='bg-secondary'>
      <ScrollView className='flex flex-col'>
        <View className="flex-1 justify-start pt-[20%] h-screen">
          <UserInfo firstName={firstName} lastName={lastName} email={email} points={points}></UserInfo>
          <ProfileNavigationButton label='Editar perfil' testId={"editProfileNav"} onPress={() => navigation.navigate('EditProfile')}></ProfileNavigationButton>
          <ProfileNavigationButton label='Certificados'></ProfileNavigationButton>
          <ProfileNavigationButton label='Download'></ProfileNavigationButton>
          <View className='flex flex-row'>
            <LogOutButton testID='logoutBtn'></LogOutButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}