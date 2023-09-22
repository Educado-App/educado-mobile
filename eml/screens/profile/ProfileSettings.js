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
  Image
} from 'react-native';
import ProfileImage from '../../components/profile/profileImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isFontsLoaded } from "../../constants/Fonts.js";
import { BgLinearGradient } from "../../constants/BgLinearGradient";
import { getCourses } from '../../api/api';
import { useNavigation } from '@react-navigation/native'
import ReturnButton from '../../components/profile/returnButton'

const USER_INFO = '@userInfo';

export default function ProfileComponent() {
  const [id, setId] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [editingUserName, setEditingUserName] = useState(false);
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [userNameModalVisible, setUserNameModalVisible] = useState(false);
  const [phoneNumberModalVisible, setPhoneNumberModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [courses, setCourses] = useState([]); // State to store course data

  const getProfile = async () => {
    try {
      const fetchedProfile = JSON.parse(await AsyncStorage.getItem(USER_INFO));

      if (fetchedProfile !== null) {
        setId(fetchedProfile.id);
        setUserName(fetchedProfile.userName);
        setPhoneNumber(fetchedProfile.phoneNumber);
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

  const saveUserNameChanges = async () => {
    if (newUserName !== userName) {
      // Update the state with the new username
      setUserName(newUserName);

      // Save changes to AsyncStorage or your API
      const updatedProfile = {
        id,
        userName: newUserName,
        phoneNumber,
        email,
      };

      await AsyncStorage.setItem(USER_INFO, JSON.stringify(updatedProfile));
    }
    setEditingUserName(false);
    setUserNameModalVisible(false); // Close the username modal
  }

  const savePhoneNumberChanges = async () => {
    if (newPhoneNumber !== phoneNumber) {
      // Update the state with the new phone number
      setPhoneNumber(newPhoneNumber);

      // Save changes to AsyncStorage or your API
      const updatedProfile = {
        id,
        userName,
        phoneNumber: newPhoneNumber,
        email,
      };

      await AsyncStorage.setItem(USER_INFO, JSON.stringify(updatedProfile));
    }
    setEditingPhoneNumber(false);
    setPhoneNumberModalVisible(false); // Close the phone number modal
  }

  const saveEmailChanges = async () => {
    if (newEmail !== email) {
      // Update the state with the new phone number
      setEmail(newEmail);

      // Save changes to AsyncStorage or your API
      const updatedProfile = {
        id,
        userName,
        phoneNumber: newPhoneNumber,
        email,
      };

      await AsyncStorage.setItem(USER_INFO, JSON.stringify(updatedProfile));
    }
    setEditingEmail(false);
    setEmailModalVisible(false); // Close the phone number modal
  }

  if (!isFontsLoaded()) {
    return null;
  }

  return (
    <BgLinearGradient>
      <SafeAreaView>
        <ScrollView>
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
              <ProfileImage/>
            </View>
  
            <View className="flex gap-6 items-center px-6 w-screen">
  
              <TouchableOpacity
                className="bg-primary px-10 py-4 rounded-medium w-full"
                onPress={() => setUserNameModalVisible(true)}
              >
                <Text className="text-center font-montserratbold text-body text-white">
                  Username: {userName}
                </Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                className="bg-primary px-10 py-4 rounded-medium w-full"
                onPress={() => setPhoneNumberModalVisible(true)}
              >
                <Text className="text-center font-montserratbold text-body text-white">
                  Phone Number: {phoneNumber}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-primary px-10 py-4 rounded-medium w-full"
                onPress={() => setEmailModalVisible(true)}
              >
                <Text className="text-center font-montserratbold text-body text-white">
                  Email: {email}</Text>
              </TouchableOpacity>
            </View>
  
            {/* Editable Username Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={userNameModalVisible}
              onRequestClose={() => setUserNameModalVisible(false)}
            >
              <View className="flex justify-center items-center h-full bg-opacity-50 bg-black">
                <View className="bg-white p-4 rounded-lg w-11/12 max-w-md">
                  <View className="flex flex-col items-center">
                    <TextInput
                      value={newUserName}
                      onChangeText={setNewUserName}
                      placeholder="Enter new username"
                      className="w-full p-4 mb-4 border rounded"
                    />
                    <TouchableOpacity className="bg-primary px-10 py-4 rounded-medium w-full" onPress={saveUserNameChanges}>
                      <Text className="text-white text-center font-montserratbold">Save Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="px-10 py-4 rounded-medium w-full mt-2 border-0 border-opacity-0"
                      onPress={() => setUserNameModalVisible(false)}
                    >
                      <Text className="text-black text-center font-montserratbold">Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/* Editable Phone Number Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={phoneNumberModalVisible}
              onRequestClose={() => setPhoneNumberModalVisible(false)}
            >
              <View className="flex justify-center items-center h-full bg-opacity-50 bg-black">
                <View className="bg-white p-4 rounded-lg w-11/12 max-w-md">
                  <View className="flex flex-col items-center">
                    <TextInput
                      value={newPhoneNumber}
                      onChangeText={setNewPhoneNumber}
                      placeholder="Enter new phone number"
                      className="w-full p-4 mb-4 border rounded"
                    />
                    <TouchableOpacity className="bg-primary px-10 py-4 rounded-medium w-full" onPress={savePhoneNumberChanges}>
                      <Text className="text-white text-center font-montserratbold">Save Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="px-10 py-4 rounded-medium w-full mt-2 border-0 border-opacity-0"
                      onPress={() => setPhoneNumberModalVisible(false)}
                    >
                      <Text className="text-black text-center font-montserratbold">Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/* Editable Email Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={emailModalVisible}
              onRequestClose={() => setEmailModalVisible(false)}
            >
              <View className="flex justify-center items-center h-full bg-opacity-50 bg-black">
                <View className="bg-white p-4 rounded-lg w-11/12 max-w-md">
                  <View className="flex flex-col items-center">
                    <TextInput
                      value={newEmail}
                      onChangeText={setNewEmail}
                      placeholder="Enter new email address"
                      className="w-full p-4 mb-4 border rounded"
                    />
                    <TouchableOpacity className="bg-primary px-10 py-4 rounded-medium w-full" onPress={saveEmailChanges}>
                      <Text className="text-white text-center font-montserratbold">Save Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="px-10 py-4 rounded-medium w-full mt-2 border-0 border-opacity-0"
                      onPress={() => setEmailModalVisible(false)}
                    >
                      <Text className="text-black text-center font-montserratbold">Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BgLinearGradient>
  );
}  