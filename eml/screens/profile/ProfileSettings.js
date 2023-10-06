import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import ProfileImage from '../../components/profile/profileImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isFontsLoaded } from "../../constants/Fonts.js";
import { BgLinearGradient } from "../../constants/BgLinearGradient";
import { getCourses } from '../../api/api';
import ReturnButton from '../../components/profileSettings/returnButton'
import DeleteAccountButton from '../../components/profileSettings/deleteAccountButton'
import ChangeFirstNameButton from '../../components/profileSettings/changeFirstNameButton'
import ChangeLastNameButton from '../../components/profileSettings/changeLastNameButton'
import ChangeEmailButton from '../../components/profileSettings/changeEmailButton'

const USER_INFO = '@userInfo';

export default function ProfileComponent() {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const getProfile = async () => {
    try {
      const fetchedProfile = JSON.parse(await AsyncStorage.getItem(USER_INFO));

      if (fetchedProfile !== null) {
        setId(fetchedProfile.id);
        setFirstName(fetchedProfile.firstName);
        setLastName(fetchedProfile.lastName);
        setEmail(fetchedProfile.email);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const fetchCourses = async () => {
    try {
      const courseData = await getCourses();
      setCourses(courseData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  useEffect(() => {
    getProfile();
    //fetchCourses();
  }, []);

  if (!isFontsLoaded()) {
    return null;
  }

  return (
    <BgLinearGradient>
      <SafeAreaView>
        <View className="justify-center items-center flex flex-col">

          <View className="flex p-10">
            <View className="flex-row">
              <ReturnButton></ReturnButton>
              <Image
                className = "h-[25.54] w-[175.88] right-5"
                source={require("../../assets/images/logo.png")}
              />
            </View>
          </View>

          <View>
            <TouchableOpacity>
              <ProfileImage/>
            </TouchableOpacity>
          </View>

          <View className="flex flex-col gap-6 items-center px-6 w-screen mr-3">
            <View className="flex justify-center w-full">
              <ChangeFirstNameButton></ChangeFirstNameButton>
            </View>

            <View className="flex justify-center w-full">
              <ChangeLastNameButton></ChangeLastNameButton>
            </View>

            <View className="flex justify-center w-full">
              <ChangeEmailButton></ChangeEmailButton>
            </View>

            <View className="flex justify-center w-full">
              <DeleteAccountButton></DeleteAccountButton>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </BgLinearGradient>
  );
}  