import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isFontsLoaded } from "../../constants/Fonts.js";
import { updateName } from '../../api/userApi.js';

const USER_INFO = '@userInfo';

export default function ProfileComponent() {
  const [id, setId] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [editingUserName, setEditingUserName] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [userNameModalVisible, setUserNameModalVisible] = useState(false);
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
      // Call the updateUserName function to update the username on the server
      try {
        setIsLoading(true); // Set loading state to true

        await updateName(id, newUserName);

        // Update the state with the new username and close modal
        setUserName(newUserName);
        setEditingUserName(false);

        // Save changes to AsyncStorage or your API
        const updatedProfile = {
          id,
          userName: newUserName,
          email,
        };

        await AsyncStorage.setItem(USER_INFO, JSON.stringify(updatedProfile));
        setUserNameModalVisible(false);
      } catch (error) {
        Alert.alert('Erro ao atualizar o nome, tente novamente', error.message);
      } finally {
        setIsLoading(false); // Set loading state to false after the operation
      }
    } else {
      alert('O nome não foi alterado');
    }
    setIsLoading(false);
  }

  if (!isFontsLoaded()) {
    return null;
  }

  return (
    <View>
      <TouchableOpacity
        className="bg-primary px-10 py-4 rounded-medium w-full"
        onPress={() => setUserNameModalVisible(true)}
        >
        <Text 
          className="text-center font-montserrat-bold text-body text-white">
            Nome: {userName}
        </Text>
      </TouchableOpacity>

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
                  placeholder="Digite o novo nome"
                  className="w-full p-4 mb-4 border rounded"
                />
                {isLoading ? ( // Conditional rendering based on loading state
                  <ActivityIndicator size="large" color="#0000ff" /> // Loading spinner
                ) : (
                  <TouchableOpacity
                    className="bg-primary px-10 py-4 rounded-medium w-full"
                    onPress={() => saveUserNameChanges()}
                  >
                    <Text
                      className="text-center font-montserrat-bold text-body text-white">
                        Salvar alterações
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  className="px-10 py-4 rounded-medium w-full mt-2 border-0 border-opacity-0"
                  onPress={() => setUserNameModalVisible(false)}
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