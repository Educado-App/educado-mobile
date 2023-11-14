import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCourses } from '../../api/api';
import ReturnButton from '../../components/profileSettings/returnButton'
import Text from '../../components/general/Text';
import ProfileNameCircle from '../../components/profile/ProfileNameCircle';
import FormButton from '../../components/general/forms/FormButton';
import ChangePasswordModal from '../../components/profileSettings/ChangePasswordModal';
import FormTextField from '../../components/general/forms/FormTextField';
import { updateUserFields } from '../../api/userApi';
import { validateEmail, validateName } from '../../components/general/Validation';
import FormFieldAlert from '../../components/general/forms/FormFieldAlert';
import { getUserInfo, setUserInfo, getJWT } from '../../services/StorageService';
import ShowAlert from '../../components/general/ShowAlert';
import errorSwitch from '../../components/general/errorSwitch';


/**
 * Edit profile screen
 * @returns {React.Element} Component for the edit profile screen
 */
export default function EditProfile() {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [fetchedFirstName, setFetchedFirstName] = useState('');
  const [fetchedLastName, setFetchedLastName] = useState('');
  const [fetchedEmail, setFetchedEmail] = useState('');
  const [changedFields, setChangedFields] = useState({});
  const [emailAlert, setEmailAlert] = useState('');
  const [firstNameAlert, setFirstNameAlert] = useState('');
  const [lastNameAlert, setLastNameAlert] = useState('');

  useEffect(() => {
    setChangedFields({
      firstName: firstName !== fetchedFirstName ? firstName : undefined,
      lastName: lastName !== fetchedLastName ? lastName : undefined,
      email: email !== fetchedEmail ? email : undefined,
    });
  }, [firstName, lastName, email, fetchedFirstName, fetchedLastName, fetchedEmail]);

  useEffect(() => {
    let validationError = '';
    validationError = validateName(firstName, 'Nome'); // First name
    setFirstNameAlert(validationError);
  }, [firstName]);

  useEffect(() => {
    let validationError = '';
    validationError = validateName(lastName, 'Sobrenome'); // Last name
    setLastNameAlert(validationError);
  }, [lastName]);

  useEffect(() => {
    const validationError = validateEmail(email);
    setEmailAlert(validationError);
  }, [email]);


  /**
   * Validates the input fields
   */
  function validateInput() {
    return firstNameAlert === '' && lastNameAlert === '' && emailAlert === '' && 
    (changedFields.firstName !== undefined || changedFields.lastName !== undefined || changedFields.email !== undefined);
  }

  /**
   * Fetches the user profile
   */
  const getProfile = async () => {
    try {
      const fetchedProfile = await getUserInfo();
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
      ShowAlert(errorSwitch(error));
    }
  }

  useEffect(() => {
    getProfile();
    // Looked cute, might delete later
    //fetchCourses();
  }, []);

  /**
   * persists the changed user info
   */
  const saveUserInfo = async () => {

    if (!validateInput()) {
      return;
    }

    const fetchedProfile = {
      id: id,
      firstName: fetchedFirstName,
      lastName: fetchedLastName,
      email: fetchedEmail,
    }
    // Change the updated profile, based on what fields has been changed to ensure we do not send unnecessary data
    const updatedProfile = {
      ...fetchedProfile,
      ...(changedFields.firstName !== undefined ? { firstName: changedFields.firstName } : {}),
      ...(changedFields.lastName !== undefined ? { lastName: changedFields.lastName } : {}),
      ...(changedFields.email !== undefined ? { email: changedFields.email } : {}),
    };

    try {
      const LOGIN_TOKEN = await getJWT();
      await updateUserFields(id, changedFields, LOGIN_TOKEN);
      await setUserInfo(updatedProfile);
      getProfile();
    } catch (error) {
      ShowAlert(errorSwitch(error));
    }
  };

  return (
    <SafeAreaView className='bg-secondary'>
      <View className='h-screen'>
        <View className="justify-center items-center flex flex-col">
          <View className="flex p-10">
            <View className="flex-row">
              <View className='pt-1'>
                <ReturnButton></ReturnButton>
              </View>
              <Text className='font-sans-bold text-xl pr-[8%]'>
                Editar perfil
              </Text>
            </View>
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
              onChangeText={(firstName) => {setFirstName(firstName); validateName(firstName);}}
            ></FormTextField>
            <FormFieldAlert label={firstNameAlert}/>
          </View>
          <View className='mb-8'>
            <FormTextField
              label='Sobrenome'
              required={true}
              placeholder='Insira sua sobrenome'
              value={lastName}
              onChangeText={(lastName) => {setLastName(lastName); validateName(lastName);}}
            ></FormTextField>
            <FormFieldAlert label={lastNameAlert}/>
          </View>
          <View className='mb-12'>
            <FormTextField
              label='E-mail'
              required={true}
              placeholder='Insira sua e-mail'
              value={email}
              keyboardType="email-address"
              onChangeText={async (email) => {setEmail(email); validateEmail(email);}}
            ></FormTextField>
            <FormFieldAlert label={emailAlert}/>
          </View>

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