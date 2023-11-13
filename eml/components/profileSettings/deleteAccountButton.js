import { TouchableOpacity, Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteUser } from '../../api/userApi';
import { clearAsyncStorage } from '../../services/StorageService';
import React from 'react';
import Text from '../general/Text';

let LOGIN_TOKEN;
const USER_INFO = '@userInfo';

export default function DeleteAccount() {
  const navigation = useNavigation();

  async function Delete() {
    try {
      const obj = JSON.parse(await AsyncStorage.getItem(USER_INFO));
      LOGIN_TOKEN = await AsyncStorage.getItem('@loginToken');

      if (obj !== null) {
        try {
          await deleteUser(obj.id, LOGIN_TOKEN) // skift obj.id til users actual id to test this function
            .then(function (response) {
              console.log(response);
              AsyncStorage.multiRemove([LOGIN_TOKEN, USER_INFO]).then(() => {
                console.log('User account deleted successfully!');
                navigation.navigate('LoginStack');
              });
            })
            .catch((error) => {
              console.log(error);
            });
          await clearAsyncStorage();
        } catch (e) {
          console.log(e);
        }
      } else {
        Alert.alert('Error', 'User not found');
      }
    } catch (e) {
      console.log(e);
    }
  }

  const deleteAlert = () =>
    Alert.alert('Deletar conta', 'Tem certeza?', [
      {
        text: 'Não',
        onPress: () => console.log('No Pressed'),
        style: 'cancel'
      },
      { text: 'Sim', onPress: Delete }
    ]);

  return (
    <View>
      <Text className="text-left text-caption-medium text-black mb-2">Deletar conta</Text>
      <TouchableOpacity
        className="bg-error px-10 py-4 rounded-medium w-full"
        onPress={deleteAlert}
      >
        <Text className="text-center font-sans-bold text-body text-projectWhite">Deletar conta</Text>
      </TouchableOpacity>
    </View>
  );
}