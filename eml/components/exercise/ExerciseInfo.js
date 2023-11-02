import React from 'react';
import { View } from 'react-native';
import Text from '../general/Text';
import PropTypes from 'prop-types';

const ExerciseInfo = ({ courseId, sectionId }) => {
  ExerciseInfo.propTypes = {
    courseId: PropTypes.string,
    sectionId: PropTypes.string,
  };

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
