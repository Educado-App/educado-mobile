import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LogOutButton from '../../components/profile/LogOutButton';
import ProfileNavigationButton from '../../components/profile/ProfileNavigationButton.js';
import UserInfo from '../../components/profile/UserInfo';
import { useNavigation } from '@react-navigation/native';
import { getStudentInfo, getUserInfo } from '../../services/StorageService';
import ProfileStatsBox from '../../components/profile/ProfileStatsBox';
import { ShowAlert } from '../../components/general/ShowAlert';
import { errorSwitch } from '../../components/general/errorSwitch';

/**
 * Profile screen
 * @returns {React.Element} Component for the profile screen
 */
export default function ProfileComponent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
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

  const getLevelProgress = (student) => {
    const pointsForPreviousLevel = (student.level - 1) * 100;
    const pointsForNextLevel = student.level * 100;

    return ((student.points - pointsForPreviousLevel)/(pointsForNextLevel - pointsForPreviousLevel)) * 100;
  };

  /**
  * Fetches the user's profile from local storage
  */ 
  const getProfile = async () => {
    try {
      const fetchedProfile = await getUserInfo();
      const fetchedStudent = await getStudentInfo();
      if (fetchedProfile !== null) {
        setFirstName(fetchedProfile.firstName);
        setLastName(fetchedProfile.lastName);
        setEmail(fetchedProfile.email);
      } else if (fetchedStudent !== null) {
        setStudentLevel(fetchedStudent.level);
        setStudentPoints(fetchedStudent.points);
        setLevelProgress(getLevelProgress(fetchedStudent));
      }
    } catch (error) {
      ShowAlert(errorSwitch(error));
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const fetchStudentProfile = async () => {
    const studentInfo = await getStudentInfo();
    setStudentLevel(studentInfo.level);
    setStudentPoints(studentInfo.points);
    setLevelProgress(getLevelProgress(studentInfo));
  };
  
  useEffect(() => {
    fetchStudentProfile();
  }, []);

  return (
    <SafeAreaView className='bg-secondary'>
      <ScrollView className='flex flex-col'>
        <View className="flex-1 justify-start pt-[5%] h-screen">
          <UserInfo firstName={firstName} lastName={lastName} email={email}></UserInfo>
          <ProfileStatsBox studentPoints={studentPoints} studentLevel={studentLevel} levelProgress={levelProgress} />
          <ProfileNavigationButton label='Editar perfil' testId={'editProfileNav'} onPress={() => navigation.navigate('EditProfile')}></ProfileNavigationButton>
          <ProfileNavigationButton label='Certificados' onPress={() => navigation.navigate('CertificateStack')}></ProfileNavigationButton>
          <ProfileNavigationButton label='Download'></ProfileNavigationButton>
          <View className='flex flex-row pb-4'>
            <LogOutButton testID='logoutBtn'></LogOutButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
