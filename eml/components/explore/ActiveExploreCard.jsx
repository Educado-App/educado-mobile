import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'
import { useNavigation } from '@react-navigation/native'
import { AppLoading } from 'expo-app-loading'

export default function ActiveExploreCard({ title, courseId, uri }) {
  const navigation = useNavigation()
  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular
  })

  if (!fontsLoaded) {
    return AppLoading
  } else {
    return (
      <Pressable
        style={{ shadowColor: 'black', elevation: 10 }}
        className="w-2/5 h-24 rounded-md items-center flex-col bg-limeGreen m-2"
        onPress={() => navigation.navigate('Course', { courseId: courseId })}
      >
        <View className="">
          <Text style={{ fontFamily: 'VarelaRound_400Regular', fontSize: 16, alignSelf: 'center' }} className="pt-4 text-gray-600">
            {title}
          </Text>
        </View>
        <View className="pt-2">
          <Image className="w-10 h-10" source={{ uri: uri }}></Image>
        </View>
      </Pressable>
    )
  }
}
