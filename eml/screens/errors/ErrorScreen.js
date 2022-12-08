import { Alert, View, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
export default function ErrorScreen() {
  const navigation = useNavigation()
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl pb-10">Something went wrong</Text>
      <Pressable
        style={{ elevation: 10 }}
        className="border border-cyanBlue rounded-md bg-cyanBlue p-2"
        onPress={() => {
          navigation.navigate('Explore')
        }}
      >
        <Text style={{ fontSize: 20 }}>Go to Explore</Text>
      </Pressable>
    </View>
  )
}
