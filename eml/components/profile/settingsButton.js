import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles'; // Import the styles from styles.js
import { Text } from 'react-native'; // Import the Text component

const USER_INFO = '@userInfo'

export default function settingsButton() {

  const navigation = useNavigation()

  const handleGearIconPress = () => {
    console.log('Settings');
    navigation.navigate('ProfileSettings');
  };
  
  return (
    <View className="pb-6">
      <TouchableOpacity style={styles.formButton} onPress={handleGearIconPress}>
              <View className="flex flex-row items-center justify-center">
                <View>
                  <Icon
                    size={36}
                    name="cog"
                    type="material-community"
                    color="#9DE89C"
                    style={styles.tinyLogo}
                  />
                </View>
                <View>
                  {/* Settings */}
                  <Text style={styles.text}>Configurações</Text>
                </View>
              </View>
          </TouchableOpacity>
    </View>
  )
}