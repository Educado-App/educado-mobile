import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import {useFonts, VarelaRound_400Regular} from '@expo-google-fonts/dev'

export default function ExploreCard() {
    let [fontsLoaded] = useFonts({
        VarelaRound_400Regular
    });
  return (
    <Pressable style={{shadowColor: "black", elevation: 10}} className="w-2/5 rounded-md mx-auto items-center flex-col bg-blue-300">
      <Text style={{fontFamily:'VarelaRound_400Regular'}} className="pt-4">Personal Finance</Text>
      <View className="pt-2">
        <Image className="w-10 h-10" source={require('../../assets/favicon.png')}></Image>
      </View>
    </Pressable>
  )
}
