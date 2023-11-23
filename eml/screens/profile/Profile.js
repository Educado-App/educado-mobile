import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import LogOutButton from '../../components/profile/LogOutButton';
import ProfileNavigationButton from '../../components/profile/ProfileNavigationButton.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInfo from '../../components/profile/UserInfo';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import CustomProgressBar from '../../components/exercise/Progressbar';
import { getStudentInfo } from '../../services/StorageService';

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
          <View className='m-6 rounded-medium border-projectGray border-2'>
            <View className='flex flex-row justify-between items-center p-3 w-full'>
              <View className='flex flex-col bg-badgesGreen justify-center items-center py-2 rounded-medium w-[32%]'>
                <Image
                  source={require('../../assets/images/profileFlame.png')}
                />
                <Text className='text-projectWhite font-sans-bold pt-3'>1 dia seguido</Text>
              </View>
              <View className='flex flex-col bg-badgesPurple justify-center items-center py-2 rounded-medium w-[32%] mx-2'>
                <Image
                  source={require('../../assets/images/profileCoin.png')}
                />
                <Text className='text-projectWhite font-sans-bold pt-3'>{studentPoints} pontos</Text>
              </View>
              <View className='flex flex-col bg-badgesBlue justify-center items-center py-2 rounded-medium w-[32%]'>
                <Image
                  source={require('../../assets/images/profileLightning.png')}
                  className=''
                />
                <Text className='text-projectWhite font-sans-bold pt-3'>3º posição</Text>
              </View>
            </View>
            <View className='flex flex-row justify-between p-4 border-projectGray border-t-2'>
              <Text className='font-sans-bold text-primary'>Nível {studentLevel}</Text>
              <CustomProgressBar progress={levelProgress} width={65} height={1} displayLabel={false}></CustomProgressBar>
            </View>
          </View>
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