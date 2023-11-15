import React from 'react';
import { View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tailwindConfig from '../../tailwind.config';
import PropTypes from 'prop-types';

const ProgressTopBar = ({ lectureType, allLectures, currentLectureIndex = '' }) => {

  const navigator = useNavigation();


  const chevronColor = lectureType === 'video' ? tailwindConfig.theme.colors.projectWhite : tailwindConfig.theme.colors.projectBlack;

  const createCorrectIcon = (_index, _currentIndex) => {

    // if lecture is completed show check
    //if lecture is completed show check
    if (_index < _currentIndex || allLectures[_index].completed) {
      return (
        <View key={_index} className=" mx-1  w-5 h-5 rounded-full bg-primary flex-col justify-center items-center">
          <MaterialCommunityIcons name="check-bold" size={12} color={tailwindConfig.theme.colors.projectWhite} />
        </View>
      );
    }
    //if lecture is current indicate with circle
    else if (_index === _currentIndex) {
      return (
        <View key={_index} className=" mx-1  w-5 h-5 rounded-full bg-primary flex-col justify-center items-center opacity-50">
          {/* <MaterialCommunityIcons name={_index >= allLectures.length ? "check" : "check"} size={12} color={tailwindConfig.theme.colors.primary} /> */}
        </View>
      );
    }
    //if lecture is not current or completed show empty circle
    else if (_index > _currentIndex) {
      return (
        <View key={_index} className=" mx-1  w-5 h-5 rounded-full  bg-secondary flex-col justify-center items-center">
          <MaterialCommunityIcons name={_index >= allLectures.length ? 'check' : 'check'} size={12} color={tailwindConfig.theme.colors.secondary} />
        </View>
      );
    }

  };

  return (
    <View className="flex-row w-full items-center pt-[15%] relative px-4">
      <View className="relative flex-grow justify-center items-center flex-row">
        <Pressable onPress={() => navigator.goBack()} className="">
          <MaterialCommunityIcons name="chevron-left" size={28} color={chevronColor} />
        </Pressable>
        <View className=" flex-grow  flex-row justify-center items-center py-2">
          {allLectures.map((_lecture, _index) => (
            /* if lecture is completed show check, otherwise empty  */
            createCorrectIcon(_index, currentLectureIndex)

          ))}
        </View>
        <View className="opacity-0" >
          <MaterialCommunityIcons name="chevron-left" size={28} />
        </View>
      </View>
    </View>
  );
};

ProgressTopBar.propTypes = {
  lectureType: PropTypes.string,
  allLectures: PropTypes.array,
  currentLectureIndex: PropTypes.number,
  className: PropTypes.string,
};

export default ProgressTopBar;