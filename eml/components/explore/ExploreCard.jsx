import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import Collapsible from "react-native-collapsible";
import { useNavigation } from "@react-navigation/native";
import UpdateDate from "./ExploreUpdate";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CardLabel from "./CardLabel";
import CustomRating from "./CustomRating";
import SubscriptionButton from "./SubscriptionButton";
import AccesCourseButton from "./AccesCourseButton";

export default function ExploreCard({ course, isPublished, subscribed }) {
  const [isCollapsed, setIsCollapsed] = useState(true);


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

  function determineCategory(category) {
    switch (category) {
      case "personal finance":
        return "Finanças pessoais";
      case "health and workplace safety":
        return "Saúde e segurança no trabalho";
      case "sewing":
        return "Costura";
      case "electronics":
        return "Eletrônica";
      default: "other";
        return "Outro";
    }
  }
  function determineIcon(category) {
    switch (category) {
      case "personal finance":
        return "finance"
      case "health and workplace safety":
        return "medical-bag"
      case "sewing":
        return "scissors-cutting"
      case "electronics":
        return "laptop"
      case "other":
        return "bookshelf"
      default:
        return "bookshelf"
    }
  }


  const getUpdatedDate = (courseDate) => {

    const date = new Date(courseDate);

    // Get the year, month, day, hours, and minutes from the Date object
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');

    // Format the date and time in the desired format
    return `${year}/${month}/${day}`;
  };


  return isPublished ? (
    <Pressable
      className=" bg-projectWhite rounded-lg shadow-2xl mb-4 mx-4 p-6 overflow-hidden"
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

        <View className="h-1 border-b-[1px] w-full border-gray opacity-50 pt-2"></View>

        <View className="w-full h-[0.5] bg-gray-500 opacity-50 pt-2" />
        <View className="flex-row justify-between w-full items-start">
          <View className="flex-col items-start justify-between">
            <View className="flex-row items-center justify-start pb-2 flex-wrap">
              <CardLabel
                title={determineCategory(course.category)}
                time={false}
                icon={determineIcon(course.category)}
                color={"gray"}
              />
              <View className="w-2.5" />
              <CardLabel
                title={course.estimatedHours}
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
          <View>

            {
              subscribed ? (
                <AccesCourseButton course={course} />
              ) : (
                <SubscriptionButton course={course} />
              )
            }
          </View>
        </View>

        <View>
          <UpdateDate dateUpdated={getUpdatedDate(course.dateUpdated)} />
        </View>
      </Collapsible>
      <View className=" items-start absolute">
        <View className=" rotate-[315deg] items-center">
          {subscribed ? (
            <Text className=" bg-[#f1CC4f] text-xs text-white font-bold px-8 -left-8 -top-4 drop-shadow-sm">
              Inscrito
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  ) : null;
}
