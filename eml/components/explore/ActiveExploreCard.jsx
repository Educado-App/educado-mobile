import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { AppLoading } from 'expo-app-loading'


export default function ActiveExploreCard({ title, courseId, iconPath }) {
  const navigation = useNavigation()

    return (
      <Pressable
        style={{ shadowColor: 'black', elevation: 10 }}
        className="w-2/5 h-24 rounded-md items-center flex-col bg-limeGreen m-2"
        onPress={() => navigation.navigate('Course', { courseId: courseId })}
      >
        <View className="">
          <Text numberOfLines={1} style={{ fontSize: 16, alignSelf: 'center' }} className="pt-4 text-gray-600">
            {title}
          </Text>
        </View>
        <View className="pt-2">
          {iconPath === "" ? <Image className="w-10 h-10" source={require('../../assets/favicon.png')}></Image> : <Image className="w-10 h-10" source={{ uri: iconPath }}></Image>}
        </View>
      </Pressable>
    )
  }

