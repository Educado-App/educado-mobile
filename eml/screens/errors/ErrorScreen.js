import { View, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Text from '../../components/general/Text';

export default function ErrorScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 justify-center items-center">
      {/* Something went wrong */}
      <Text className="text-2xl pb-10">Algo deu errado</Text>
      <Pressable
        style={{ elevation: 10 }}
        className="border border-cyanBlue rounded-md bg-cyanBlue p-2"
        onPress={() => {
          navigation.navigate('Explore');
        }}
      >
        {/* Go to Explore */}
        <Text style={{ fontSize: 20 }}>Ir para explorar</Text>
      </Pressable>
    </View>
  );
}
