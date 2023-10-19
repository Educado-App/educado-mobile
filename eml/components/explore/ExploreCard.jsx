import { View, Image, Pressable } from 'react-native'
import React from 'react'
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'
import { useNavigation } from '@react-navigation/native'
import { AppLoading } from 'expo-app-loading'
import Text from '../general/Text';

import UpdateDate from './ExploreUpdate'


import Collapsible from 'react-native-collapsible';
import { useEffect } from 'react'

import { MaterialCommunityIcons } from "@expo/vector-icons";

import CardLabel from "./CardLabel";
import CustomRating from "./CustomRating";
import SubscriptionButton from "./SubscriptionButton";
import AccesCourseButton from "./AccesCourseButton";

import { ifSubscribed } from '../../api/api'



export default function ExploreCard({ course, isPublished }) {
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

  return isPublished != false ? (
    <Pressable
      className="bg-white rounded-lg shadow-[0_0px_2px_#000] mb-4 mx-4 p-6 overflow-hidden"
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
          <View>
            {
              isSubscribed ? (
                <AccesCourseButton course={course} />
              ) : (
                <SubscriptionButton course={course} />
              )
            }
          </View>
        </View>

        <View>
          <UpdateDate dateUpdated={course.dateUpdated} />
        </View>
      </Collapsible>
      <View className=" items-start absolute">
        <View className=" rotate-[315deg] items-center">
          {isSubscribed ? (
            <Text className=" bg-[#f1CC4f] text-xs text-white font-bold px-8 -left-8 -top-4 drop-shadow-sm">
              Inscrito
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  ) : null;
}
