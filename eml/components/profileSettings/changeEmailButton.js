import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isFontsLoaded } from "../../constants/Fonts.js";
import { updateUserEmail } from '../../api/userApi.js';

const USER_INFO = '@userInfo';

export default function ProfileComponent() {
  const [id, setId] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [tempEmail, setTempEmail] = useState(''); // Renamed setNewTempEmail to setTempEmail
  const [isLoading, setIsLoading] = useState(false); // Add a loading state

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

  useEffect(() => {
    getProfile();
  }, []);

  const saveEmailChanges = async () => {
    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  
    if (newEmail !== email && newEmail === tempEmail) {
      if (emailRegex.test(newEmail)) {
        // Call the updateUserEmail function to update the email on the server
        try {
        setIsLoading(true); // Set loading state to true

        await updateUserEmail(id, newEmail);

        // Update the state with the new username and close modal
        setEmail(newEmail);
        setEditingEmail(false);

        // Save changes to AsyncStorage or your API
        const updatedProfile = {
          id,
          userName,
          email: newEmail,
        };

        await AsyncStorage.setItem(USER_INFO, JSON.stringify(updatedProfile));
        setEmailModalVisible(false);
        } catch (error) {
          Alert.alert('Error updating email, try again: ', error.message);
        }
      } else {
        alert('Invalid email format. Please enter a valid email address.');
      }
    } else {
      alert('Emails do not match or it is equal to your current email. Please try again.')
    }
    setIsLoading(false);
  }
  

  const openEmailModal = () => {
    // Reset the email input fields when the modal is opened
    setNewEmail('');
    setTempEmail('');
    setEmailModalVisible(true);
  }

  if (!isFontsLoaded()) {
    return null;
  }

  return (
    <View>
      <TouchableOpacity
        className="bg-primary px-10 py-4 rounded-medium w-full"
        onPress={openEmailModal} // Call the new function to open the modal
      >
        <Text className="text-center font-montserrat-bold text-body text-white">
          Email: {email}
        </Text>
      </TouchableOpacity>

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
                placeholder="Digite o novo endereço de e-mail"
                className="w-full p-4 mb-4 border rounded"
              />

              <TextInput
                value={tempEmail}
                onChangeText={setTempEmail}
                placeholder="Confirmar novo endereço de e-mail"
                className="w-full p-4 mb-4 border rounded"
              />

              {isLoading ? ( // Conditional rendering based on loading state
                <ActivityIndicator size="large" color="#0000ff" /> // Loading spinner
              ) : (
                <TouchableOpacity
                  className="bg-primary px-10 py-4 rounded-medium w-full"
                  onPress={() => saveEmailChanges()}
                >
                  <Text
                    className="text-center font-montserrat-bold text-body text-white">
                      Salvar alterações
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                className="px-10 py-4 rounded-medium w-full mt-2 border-0 border-opacity-0"
                onPress={() => setEmailModalVisible(false)}
              >
                <Text className="text-black text-center font-montserrat-bold">Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
