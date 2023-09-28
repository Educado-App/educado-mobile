import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  Image,
} from 'react-native';
import ProfileImage from '../../components/profile/profileImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isFontsLoaded } from "../../constants/Fonts.js";
import { BgLinearGradient } from "../../constants/BgLinearGradient";
import { getCourses } from '../../api/api';
import { useNavigation } from '@react-navigation/native'
import ReturnButton from '../../components/profileSettings/returnButton'
import DeleteAccountButton from '../../components/profileSettings/deleteAccountButton'
import ChangeNameButton from '../../components/profileSettings/changeNameButton'
import ChangeEmailButton from '../../components/profileSettings/changeEmailButton'

const USER_INFO = '@userInfo';

export default function ProfileComponent() {
  const [id, setId] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [courses, setCourses] = useState([]); // State to store course data

  const getProfile = async () => {
    try {
      const fetchedProfile = JSON.parse(await AsyncStorage.getItem(USER_INFO));

      if (fetchedProfile !== null) {
        setId(fetchedProfile.id);
        setUserName(fetchedProfile.userName);
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

  // Print out all course titles
  /*useEffect(() => {
    // If statement to prevent it from printing an empty array
    if (courses.length > 0) {
      const courseTitles = courses.map((course) => course.title);
      console.log('Course Titles:', courseTitles);
    }
  }, [courses]);*/

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

          <View className="flex flex-col gap-6 items-center px-6 w-screen">
            <View className="flex justify-center w-full">
              <ChangeNameButton></ChangeNameButton>
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