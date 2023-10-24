import React from 'react';
import { View, Text, Image } from 'react-native';

const ExerciseInfo = ({ courseId, sectionId }) => {
  return (
    <View className='flex-row justify-between items-end px-[6%] py-[12%]'>
      <View className=''>
        <Text className='font-montserrat text-caption-small text-projectGray'>
          Course name: {courseId}
        </Text>
        <Text className='font-montserrat-bold text-body text-projectBlack'>{sectionId}</Text>
      </View>
      <View className=''>
        <Image source={require('../../assets/images/dots-horizontal.png')} />
      </View>
    </View>
  );
};

export default ExerciseInfo;
