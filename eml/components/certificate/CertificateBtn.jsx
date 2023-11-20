import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

/**
 * AccessCourseButton component displays a button to access a course
 * @param course - Course object containing course details
 * @returns {JSX.Element} - Rendered component
 */
export default function CertificateBtn({ buttonText }) {

  const navigation = useNavigation();

  return (
    <View className="">
      <Pressable
        className="w-full flex items-center justify-center rounded-lg bg-primary p-2"
      >
        <Text className="text-projectWhite py-1 font-bold px-2">
          {buttonText}
        </Text>
      </Pressable>
    </View>
  );
};

CertificateBtn.propTypes = {
  buttonText: PropTypes.string,
};

