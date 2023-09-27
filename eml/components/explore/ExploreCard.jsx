import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'
import { useNavigation } from '@react-navigation/native'
import { AppLoading } from 'expo-app-loading'


import { subscribe } from "../../api/api";

export default function ExploreCard({ course }) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const navigation = useNavigation();

  return (
    <Pressable
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 15,
        marginHorizontal: 18,
        padding: 25,
      }}
      onPress={() => setIsCollapsed(!isCollapsed)}
    >
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "black",
            }}
          >
            {course.title}
          </Text>

          <Pressable onPress={() => {
            setIsSubscribed(!isSubscribed);
            subscribe(isSubscribed);
          }
              }>

            <MaterialIcons
              name={isSubscribed ? "star" : "star-outline" } 
              size={20}
              color="#f1CC4f"
            />
          </Pressable>
        </View>
        <View
          style={{
            width: "100%",
            height: 0.5,
            backgroundColor: "gray",
            opacity: 50,
            marginBottom: 10,
            marginTop: 6,
          }}
        />

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "start",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <CardLabel
                title={course.category}
                icon={"school"}
                color={"gray"}
              />
              <View style={{ width: 10 }} />
              <CardLabel
                title={course.time}
                icon={"access-time"}
                color={"gray"}
              />
            </View>
            <View style={{ height: 5, opacity: 0.5 }} />
            <CustomRating rating={course.rating} />
          </View>

  if (!fontsLoaded) {
    return AppLoading
  } else {
    return (
      <Pressable
        style={{ shadowColor: 'black', elevation: 10 }}
        className="w-2/5 h-24 rounded-md items-center flex-col bg-cyanBlue m-2"
        onPress={() => navigation.navigate('Course', { courseId: courseId })}
      >
        <Text numberOfLines={1} style={{ fontFamily: 'VarelaRound_400Regular', fontSize: 14, }} className="pt-4 text-gray-600">
          {title}
        </Text>
        <View className="pt-2">
          <Image
            className="w-10 h-10"
            source={require('../../assets/favicon.png')}
          ></Image>
        </View>
      </Pressable>
    )
  }
}
