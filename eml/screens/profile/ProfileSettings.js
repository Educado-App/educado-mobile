import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
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
      // Update the state with new username
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
      // Update the state with new phone number
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <ProfileImage />
          <TouchableOpacity
            style={styles.formButton}
            onPress={() => setUserNameModalVisible(true)}
          >
            <Text style={styles.text}>Username: {userName}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.formButton}
            onPress={() => setPhoneNumberModalVisible(true)}
          >
            <Text style={styles.text}>Phone Number: {phoneNumber}</Text>
          </TouchableOpacity>

          {/* Editable Username Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={userNameModalVisible}
            onRequestClose={() => setUserNameModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TextInput
                  value={newUserName}
                  onChangeText={setNewUserName}
                  placeholder="Enter new username"
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={saveUserNameChanges}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setUserNameModalVisible(false)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
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
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TextInput
                  value={newPhoneNumber}
                  onChangeText={setNewPhoneNumber}
                  placeholder="Enter new phone number"
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={savePhoneNumberChanges}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setPhoneNumberModalVisible(false)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    alignItems: 'center', // Center the content horizontally
    backgroundColor: '#E4F2F5',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '100%',
    color: '#383838', // Set text color to #383838
  },
  formButton: {
    backgroundColor: 'hsl(0, 0%, 92%)',
    height: 55,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'hsl(0, 0%, 92%)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    color: '#383838', // Set text color to #383838
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#00897B', // Updated color
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#CF6679', // Updated color
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});