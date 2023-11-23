import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LogOutButton from '../../components/profile/LogOutButton';
import ProfileNavigationButton from '../../components/profile/ProfileNavigationButton.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInfo from '../../components/profile/UserInfo';
import { useNavigation } from '@react-navigation/native';
import { getStudentInfo } from '../../services/StorageService';
import ProfileStatsBox from '../../components/profile/profileStatsBox';

const USER_INFO = '@userInfo';

/**
 * Profile screen
 * @returns {React.Element} Component for the profile screen
 */
export default function ProfileComponent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [points, setPoints] = useState(0);
  const navigation = useNavigation();
  const [studentLevel, setStudentLevel] = useState(0);
  const [studentPoints, setStudentPoints] = useState(0);
  const [levelProgress, setLevelProgress] = useState(0);

  useEffect(() => {
    const getInfo = navigation.addListener('focus', () => {
      getProfile();
    });
    return getInfo;
  }, [navigation]);

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
        setPoints(fetchedProfile.points);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const fetchStudentProfile = async () => {
    const studentInfo = await getStudentInfo();
    setStudentLevel(studentInfo.level);
    setStudentPoints(studentInfo.points);
    setLevelProgress((studentInfo.points/(studentInfo.level * 100)) * 100);
  };
  
  useEffect(() => {
    fetchStudentProfile();
  }, []);


  return (
    <SafeAreaView className='bg-secondary'>
      <ScrollView className='flex flex-col'>
        <View className="flex-1 justify-start pt-[20%] h-screen">
          <UserInfo firstName={firstName} lastName={lastName} email={email} points={points}></UserInfo>
          <ProfileStatsBox studentPoints={studentPoints} studentLevel={studentLevel} levelProgress={levelProgress} />
          <ProfileNavigationButton label='Editar perfil' testId={'editProfileNav'} onPress={() => navigation.navigate('EditProfile')}></ProfileNavigationButton>
          <ProfileNavigationButton label='Certificados'></ProfileNavigationButton>
          <ProfileNavigationButton label='Download'></ProfileNavigationButton>
          <View className='flex flex-row'>
            <LogOutButton testID='logoutBtn'></LogOutButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  }