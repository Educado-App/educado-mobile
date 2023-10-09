import React, { useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import Collapsible from "react-native-collapsible";
import { useNavigation } from "@react-navigation/native";
import UpdateDate from "./ExploreUpdate";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import CardLabel from "./CardLabel";
import CustomRating from "./CustomRating";
import SubscriptionButton from "./SubscriptionButton";
import AccesCourseButton from "./AccesCourseButton";

export default function ExploreCard({ course, isPublished }) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const navigation = useNavigation();

  const getDifficultyLabel = (lvl) => {
    switch (lvl) {
      case 1:
        return "Iniciante";
      case 2:
        return "Intermediário";
      case 3:
        return "Avançado";
      default:
        return lvl; // default to the provided level if not 1, 2, or 3
    }
  };

  return isPublished ? (
    <Pressable
      className="bg-white rounded-lg shadow-sm mb-4 mx-4 p-6"
      onPress={() => setIsCollapsed(!isCollapsed)}
    >
      <View className="flex-col items-center">
        <View className="flex-row justify-between w-full items-center">
          <Text className="text-black font-medium text-lg">{course.title}</Text>
          <View>
            <MaterialCommunityIcons
              name={isCollapsed ? "chevron-down" : "chevron-up"}
              size={25}
              color="gray"
            />
          </View>
        </View>
        <View className="h-1 border-b-[1px] w-full border-gray opacity-50 pt-2" ></View>

        <View className="w-full h-[0.5] bg-gray-500 opacity-50 pt-2" />
        <View className="flex-row justify-between w-full items-start">
          <View className="flex-col items-start justify-between">
            <View className="flex-row items-center justify-start pb-2">
              <CardLabel
                title={course.category}
                time={false}
                icon={"school-outline"}
                color={"gray"}
              />
              <View className="w-2.5" />
              <CardLabel
                title={course.time}
                time={true}
                icon={"clock-outline"}
                color={"gray"}
              />
              <View className="w-2.5" />
              <CardLabel
                title={getDifficultyLabel(course.difficulty)}
                time={false}
                icon={"book-multiple-outline"}
                color={"gray"}
              />
            </View>
            <View className="h-1.25 opacity-50" />
            <CustomRating rating={course.rating} />
          </View>
        </View>
      </View>

      <Collapsible className="w-full" collapsed={isCollapsed}>
        <View className="py-7 flex-row items-center justify-between px-1">
          <View>
            <Text className="text-black text-m">{course.description}</Text>
          </View>
        </View>

        <View>
          <View className="">
            {isSubscribed ? (
              <AccesCourseButton onClick={(value) => setIsSubscribed(value)} />
            ) : (
              <SubscriptionButton onClick={(value) => setIsSubscribed(value)} />
            )}
          </View>
        </View>

        <View>
          <UpdateDate dateUpdated={course.dateUpdated} />
        </View>
      </Collapsible>
    </Pressable>
  ) : null;
}
