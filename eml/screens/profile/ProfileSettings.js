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
} from 'react-native';
import ProfileImage from '../../components/profile/profileImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isFontsLoaded } from "../../constants/Fonts.js";
import { BgLinearGradient } from "../../constants/BgLinearGradient";
import { getCourses } from '../../api/api';

const USER_INFO = '@userInfo';

export default function ProfileComponent() {
  const [id, setId] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [editingUserName, setEditingUserName] = useState(false);
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [userNameModalVisible, setUserNameModalVisible] = useState(false);
  const [phoneNumberModalVisible, setPhoneNumberModalVisible] = useState(false);
  const [courses, setCourses] = useState([]); // State to store course data

  const getProfile = async () => {
    try {
      const fetchedProfile = JSON.parse(await AsyncStorage.getItem(USER_INFO));

      if (fetchedProfile !== null) {
        setId(fetchedProfile.id);
        setUserName(fetchedProfile.userName);
        setPhoneNumber(fetchedProfile.phoneNumber);
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
      };

      await AsyncStorage.setItem(USER_INFO, JSON.stringify(updatedProfile));
    }
    setEditingPhoneNumber(false);
    setPhoneNumberModalVisible(false); // Close the phone number modal
  }

  if (!isFontsLoaded()) {
    return null;
  }

  return (
    <BgLinearGradient>
      <SafeAreaView>
        <ScrollView>
          <View className="flex items-center justify-center flex-col py-10">
            <ProfileImage/>
          </View>
          <View className = "flex gap-6 items-center">
            <TouchableOpacity
              className = "bg-primary px-10 py-4 rounded-medium"
              onPress={() => setUserNameModalVisible(true)}
            >
              <Text className = "text-center font-montserrat-bold text-body text-white">
                Username: {userName}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className = "bg-primary px-10 py-4 rounded-medium"
              onPress={() => setPhoneNumberModalVisible(true)}
            >
              <Text className = "text-center font-montserrat-bold text-body text-white">Phone Number: {phoneNumber}</Text>
            </TouchableOpacity>

            {/* Editable Username Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={userNameModalVisible}
              onRequestClose={() => setUserNameModalVisible(false)}
            >
              <View>
                <View>
                  <TextInput
                    value={newUserName}
                    onChangeText={setNewUserName}
                    placeholder="Enter new username"
                  />
                  <TouchableOpacity
                    onPress={saveUserNameChanges}
                  >
                    <Text>Save Changes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setUserNameModalVisible(false)}
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>
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
              <View>
                <View>
                  <TextInput
                    value={newPhoneNumber}
                    onChangeText={setNewPhoneNumber}
                    placeholder="Enter new phone number"
                  />
                  <TouchableOpacity
                    onPress={savePhoneNumberChanges}
                  >
                    <Text>Save Changes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setPhoneNumberModalVisible(false)}
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BgLinearGradient>
  );
}
