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
} from 'react-native';
import ProfileImage from '../../components/profile/profileImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_INFO = '@userInfo';

export default function ProfileComponent() {
  const [id, setId] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [editingUserName, setEditingUserName] = useState(false);
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

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

  useEffect(() => {
    getProfile();
  }, []);

  const saveChanges = async () => {
    // Update user information with new values
    try {
      // Update the state with new values
      setUserName(newUserName);
      setPhoneNumber(newPhoneNumber);

      // Save changes to AsyncStorage or your API
      const updatedProfile = {
        id,
        userName: newUserName,
        phoneNumber: newPhoneNumber,
      };

      await AsyncStorage.setItem(USER_INFO, JSON.stringify(updatedProfile));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <ProfileImage />
          <TouchableOpacity
            style={styles.formButton}
            onPress={() => setEditingUserName(true)}
          >
            <Text style={styles.text}>Username: {userName}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.formButton}
            onPress={() => setEditingPhoneNumber(true)}
          >
            <Text style={styles.text}>Phone Number: {phoneNumber}</Text>
          </TouchableOpacity>
          {/* Editable Username */}
          {editingUserName ? (
            <TextInput
              value={newUserName}
              onChangeText={setNewUserName}
              placeholder="Enter new username"
              style={styles.input}
            />
          ) : null}
          {/* Editable Phone Number */}
          {editingPhoneNumber ? (
            <TextInput
              value={newPhoneNumber}
              onChangeText={setNewPhoneNumber}
              placeholder="Enter new phone number"
              style={styles.input}
            />
          ) : null}
          {/* Save Changes Button */}
          {editingUserName || editingPhoneNumber ? (
            <TouchableOpacity
              onPress={saveChanges}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  },
  formButton: {
    backgroundColor: 'hsl(0, 0%, 92%)',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'hsl(0, 0%, 92%)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
