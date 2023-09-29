import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Collapsible from "react-native-collapsible";
import { useNavigation } from "@react-navigation/native";
import { useFonts, VarelaRound_400Regular } from "@expo-google-fonts/dev";
import { AppLoading } from "expo-app-loading";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import CardLabel from "../../explore/CardLabel";

export default function CourseCard({ course, downloadState }) {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  if (!fontsLoaded) {
    return AppLoading;
  } else {
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
        onPress={() => console.log("Pressed")}
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
              {course}
            </Text>

            <View>
              <MaterialCommunityIcons
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
                  title={"category"}
                  icon={"school"}
                  color={"gray"}
                />
                <View style={{ width: 10 }} />
                <CardLabel
                  title={"time"}
                  icon={"access-time"}
                  color={"gray"}
                />
              </View>
              <View style={{ height: 5, opacity: 0.5 }} />
            </View>

            <Image
              opacity={1}
              style={{
                margin: 5,
                resizeMode: "contain",
              }}
              source={require("../../../assets/icon.png")}
            />
          </View>
        </View>

        <View style={{}}>
              <Text
                style={{
                  fontSize: 10,
                  color: "gray",
                  alignSelf: "flex-start", // Use alignSelf to align text to the bottom
                }}
              >
                Inscrito
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: "gray",
                  alignSelf: "flex-start", // Use alignSelf to align text to the bottom
                }}
              ></Text>
              <Text
                style={{
                  fontSize: 10,
                  color: "gray",
                  alignSelf: "flex-start", // Use alignSelf to align text to the bottom
                }}
              ></Text>
        </View>

          {/* Your expanded content goes here */}
          <View
            style={{
              flexDirection: "row", // Arrange children in a row
              alignItems: "center", // Vertically center children
              justifyContent: "space-between", // Space between children
              padding: 16,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                }}
              >
                {"Description"}
              </Text>
            </View>
            <View style={{ marginLeft: 16 }}>
              <Image
                source={require("../../../assets/icon.png")}
                style={{
                  width: 50,
                  height: 50,
                  // Add any additional styles you need for the image
                }}
              />
            </View>
          </View>

          <View>
            <View style={{ paddingTop: 5 }}>
              <Pressable
                style={{
                  width: "40%",
                  alignItems: "left",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center", // Center align the icon and text vertically
                    borderRadius: 5,
                    fontSize: 14,
                    color: "white",
                    backgroundColor:"#5ECCE9",
                    paddingHorizontal: 8,
                    paddingVertical: 6,
                    borderColor: "#5ECCE9",
                    borderWidth: 1,
                    textAlign: "left",
                    overflow: "hidden",
                  }}
                >
                  <Text
                    style={{
                      color: "white"
                    }}
                  >
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>

           <View>
            <View style={{ paddingTop: 5 }}>
              <Pressable
                style={{
                  width: "40%",
                  alignItems: "left",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center", // Center align the icon and text vertically
                    borderRadius: 5,
                    fontSize: 14,
                    color: "gray",
                    backgroundColor: "#fff",
                    paddingHorizontal: 8,
                    paddingVertical: 6,
                    borderColor: "gray",
                    borderWidth: 1,
                    textAlign: "left",
                  }}
                >
                  <Text
                    style={{
                      color: "gray",
                    }}
                  >
                    Acessar curso
                  </Text>
                </View>
              </Pressable>
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
              ATUALIZODA: {"course.dateUpdated"}
            </Text>
          </View>
      </Pressable>
    )
  }
}
