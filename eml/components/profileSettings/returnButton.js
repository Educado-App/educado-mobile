import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tailwindConfig from '../../tailwind.config.js';

export default function ReturnButton() {
  const navigation = useNavigation();
  const projectColors = tailwindConfig.theme.colors;

  const handleBackButtonPress = () => {
    navigation.navigate('Perfil');
  };

  return (
    <View>
      <TouchableOpacity onPress={handleBackButtonPress}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={30}
          color={projectColors.projectBlack}
          style={{ marginRight: 50 }}
        />
      </TouchableOpacity>
    </View>
  );
}
