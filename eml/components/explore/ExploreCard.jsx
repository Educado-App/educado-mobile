import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Collapsible from "react-native-collapsible";
import { useNavigation } from "@react-navigation/native";
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'
import { AppLoading } from 'expo-app-loading';

import { MaterialIcons } from "@expo/vector-icons";
import CardLabel from "./CardLabel";
import CustomRating from "./CustomRating";

export default function ExploreCard({ course, isPublished }) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular
  })

  if (!fontsLoaded) {
    return AppLoading
  } else {
  return isPublished ? (
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

          <Pressable onPress={() => setIsSubscribed(!isSubscribed)}>
            <MaterialIcons
              name={isSubscribed ? "star" : "star-outline"}
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
            opacity: 0.5,
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

          <Image
            opacity={ isCollapsed ? 1 : 0 }
            style={{
              resizeMode: "contain",
            }}
            source={course.coverImg}
          />
        </View>

        <View
          style={{
            backgroundColor: "#f1f1f1",
            borderRadius: 50,
            padding: 5,
          }}
        ></View>
      </View>

      <Collapsible collapsed={isCollapsed}>
        {/* Your expanded content goes here */}
        <View style={{
      flexDirection: 'row', // Arrange children in a row
      alignItems: 'center', // Vertically center children
      justifyContent: 'space-between', // Space between children
      padding: 16,
    }}>
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 16,
          color: 'black',
        }}>
          {course.description}
        </Text>
      </View>
      <View style={{ marginLeft: 16 }}>
        <Image
          source={course.coverImg}
          style={{
            width: 50,
            height: 50,
            // Add any additional styles you need for the image
          }}
        />
      </View>
      
    </View>
    <View style={{ }}>
          <Text style={{
            paddingTop: 13,
            fontSize: 10,
            color: 'gray',

          }}>
            Updated {course.dateUpdated}
          </Text>
      </View>
      </Collapsible>
    </Pressable>
  ) : null;


}
}