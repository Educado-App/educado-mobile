import React, { useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import Collapsible from "react-native-collapsible";
import { useNavigation } from "@react-navigation/native";
import { AppLoading } from "expo-app-loading";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import CardLabel from "./CardLabel";
import CustomRating from "./CustomRating";
import SubscriptionButton from "./SubscriptionButton";
import AccesCourseButton from "./AccesCourseButton";

import { checkIfSubscribed, subscribeToCourse, ifSubscribed } from "../../api/api";




export default function ExploreCard({ course }) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function checkSubscription() {
      try {
        const result = await ifSubscribed(course.courseId);
        setIsSubscribed(result); 
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    }

    checkSubscription();
  }, [course.courseId, ifSubscribed(course.courseId), course]);

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

            <View>
              <MaterialCommunityIcons
                name={isCollapsed ? "chevron-down" : "chevron-up"}
                size={25}
                color="gray"
              />
            </View>
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
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
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
            

          </View>
        </View>

        {/* <View style={{}}>
          {isCollapsed ? (
            
              <Text
                style={{
                  fontSize: 10,
                  paddingTop: 6,
                  color: "gray",
                  alignSelf: "flex-start", // Use alignSelf to align text to the bottom
                }}
              >
                {isSubscribed && "Inscrito"}
              </Text>
            
          ) : (
            null
          )}
        </View> */}

        <Collapsible
        style={{ width: "100%", }}
        collapsed={isCollapsed}>
          <View
            style={{
              paddingTop: 30,
              paddingBottom: 30,
              flexDirection: "row", // Arrange children in a row
              alignItems: "center", // Vertically center children
              justifyContent: "space-between", // Space between children
              padding: 5,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                }}>
                {course.description} 
              </Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              paddingTop: 10,
              alignItems: "center", // Center the content vertically
              justifyContent: "space-between", // Distribute buttons evenly
            }}
          >

            <View>
              {
                isSubscribed ? (
                  <AccesCourseButton course={course} />
                ) : (
                  <SubscriptionButton course={course}  />
                  )
                }
            </View>
            
          </View>

          <View style={{}}>
            <Text
              style={{
                paddingTop: 13,
                fontSize: 10,
                color: "gray",
              }}
            >
              ATUALIZADO: {course.dateUpdated}
            </Text>
          </View>
        </Collapsible>
      </Pressable>
    )
  }