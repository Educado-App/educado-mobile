import React from "react";
import { View, Image } from "react-native";
import Text from '../general/Text';

const ExerciseInfo = ({ courseId, sectionId }) => {
  return (
    <View className="items-start px-6 absolute bottom-10 z-10">
      <Text className="font-sans text-caption-small text-projectGray">
        Course name: {courseId}
      </Text>
      <Text className="font-sans-bold text-body text-projectBlack">{sectionId}</Text>
    </View>
  );
};

export default ExerciseInfo;
