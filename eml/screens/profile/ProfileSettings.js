import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCourses } from '../../api/api';
import Text from '../../components/general/Text';
import ProfileNameCircle from '../../components/profile/ProfileNameCircle';
import FormButton from '../../components/general/forms/FormButton';
import ChangePasswordModal from '../../components/profileSettings/ChangePasswordModal';
import FormTextField from '../../components/general/forms/FormTextField';
import { updateUserFields } from '../../api/userApi';
import BackButton from '../../components/general/BackButton';
import { useNavigation } from '@react-navigation/native'

export default function ProfileSettings() {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [fetchedFirstName, setFetchedFirstName] = useState('');
  const [fetchedLastName, setFetchedLastName] = useState('');
  const [fetchedEmail, setFetchedEmail] = useState('');

  const navigation = useNavigation();

  const getProfile = async () => {
    try {
      const fetchedProfile = JSON.parse(await AsyncStorage.getItem('@userInfo'));

      if (fetchedProfile !== null) {
        setId(fetchedProfile.id);
        setFetchedFirstName(fetchedProfile.firstName);
        setFetchedLastName(fetchedProfile.lastName);
        setFetchedEmail(fetchedProfile.email);
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

  const validateInput = () => {
    return (firstName !== fetchedFirstName) || (lastName !== fetchedLastName) || (email !== fetchedEmail);
  }

  useEffect(() => {
    getProfile();
    //fetchCourses();
  }, []);

  const saveUserInfo = async () => {

    const obj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    }

    try {
      const LOGIN_TOKEN = await AsyncStorage.getItem('@loginToken');
      await updateUserFields(id, obj, LOGIN_TOKEN);
      await AsyncStorage.setItem('@userInfo', JSON.stringify(obj));
      getProfile();
    } catch (error) {
      switch (error?.error?.code) {
        case 'E0003':
          // Error connecting to server!
          ShowAlert("Erro de conexão com o servidor!");
          break;
        default:
          console.log('ERROR: ' + error?.error?.code)
      }
    }
  };

  return (
    <SafeAreaView className='bg-secondary'>
      <View className='h-full'>
        <View>
          <View className='relative mx-4 mt-12 mb-6'>
            {/* Back button */}
            <BackButton onPress={() => navigation.navigate('Perfil')} />

            {/* Title */}
            <Text className='w-full text-center text-xl font-sans-bold'>
              Editar perfil
            </Text>
          </View>

          <View className='flex flex-row w-screen px-6 justify-evenly'>
            {/* Profile image */}
            <ProfileNameCircle firstName={fetchedFirstName} lastName={fetchedLastName} />
            {/* Edit image */}
            <View className='flex flex-col justify-evenly items-center'>
              <FormButton className='py-2'>
                Trocar imagem
              </FormButton>
              <Text className='text-primary underline'>Remover imagem</Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col px-8 pt-8 w-screen">

          <View className='mb-8'>
            <FormTextField
              label='Nome'
              required={true}
              placeholder='Insira sua nome'
              value={firstName}
              onChangeText={(firstName) => setFirstName(firstName)}
            ></FormTextField>
          </View>
          <View className='mb-8'>
            <FormTextField
              label='Sobrenome'
              required={true}
              placeholder='Insira sua sobrenome'
              value={lastName}
              onChangeText={(lastName) => setLastName(lastName)}
            ></FormTextField>
          </View>
          <View className='mb-12'>
            <FormTextField
              label='E-mail'
              required={true}
              placeholder='Insira sua e-mail'
              value={email}
              onChangeText={(email) => setEmail(email)}
            ></FormTextField>
          </View>

          {/*
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
        */}
          {/* Change password */}
          <ChangePasswordModal />

          <View className='flex flex-row justify-between items-center pt-12'>
            <Text className='text-primary text-sm underline'>Excluir minha conta</Text>
            <FormButton
              onPress={() => saveUserInfo()}
              disabled={!validateInput()}
            >Salvar</FormButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}