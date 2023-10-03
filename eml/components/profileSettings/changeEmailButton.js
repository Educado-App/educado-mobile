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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [tempEmail, setTempEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

        // Save changes to AsyncStorage or your API
        const updatedProfile = {
          id,
          firstName: firstName,
          lastName: lastName,
          email: newEmail,
        };

        await AsyncStorage.setItem(USER_INFO, JSON.stringify(updatedProfile));
        setEmailModalVisible(false);
        } catch (error) {
          Alert.alert('Alerta', 'Erro ao atualizar o e-mail, tente novamente: ', error.message);
        }
      } else {
        Alert.alert('Alerta','Formato de e-mail inválido. Digite um endereço de e-mail válido.');
      }
    } else {
      Alert.alert('Alerta','Os e-mails não correspondem ou são iguais ao seu e-mail atual. Tente novamente.')
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
      <Text className="text-left font-montserrat text-caption-medium text-black mb-2">Email</Text>
      <TouchableOpacity
        className="bg-white px-5 py-4 rounded-medium w-full"
        onPress={openEmailModal} // Call the new function to open the modal
      >
        <Text 
          className="text-left font-montserrat text-body text-gray">
          {email}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={emailModalVisible}
        onRequestClose={() => setEmailModalVisible(false)}
      >
        <View className="flex justify-center items-center h-full bg-opacity-50 bg-black">
          <View className="bg-lightgray p-4 rounded-lg w-11/12 max-w-md">
            <View className="flex flex-col items-center">
              <TextInput
                value={newEmail}
                onChangeText={setNewEmail}
                placeholder="Digite o novo endereço de e-mail"
                className="w-full p-4 mb-4 rounded bg-white"
              />

              <TextInput
                value={tempEmail}
                onChangeText={setTempEmail}
                placeholder="Confirmar novo endereço de e-mail"
                className="w-full p-4 mb-4 rounded bg-white"
              />

              {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
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
