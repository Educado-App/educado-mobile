import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardLabel from '../explore/CardLabel';
import * as Utility from '../../services/utilityFunctions';
import PropTypes from 'prop-types';

/**
 * This component is used to display a certificate card.
 * @param certificate - The certificate object to be displayed.
 * @returns {JSX.Element|null} - Returns a JSX element.
 */
export default function CertificateCard({ certificate }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Pressable
      className="bg-projectWhite rounded-lg shadow-2xl mb-4 mx-4 p-6 overflow-hidden"
      onPress={() => setIsCollapsed(!isCollapsed)}
    >
      <View className="flex-col items-center">
        <View className="flex-row justify-between w-full items-center">
          <Text className="text-black font-medium text-lg">{certificate.courseName}</Text>
          <MaterialCommunityIcons
            name={isCollapsed ? 'chevron-down' : 'chevron-up'}
            size={25}
            color="gray"
          />
        </View>

        <View className="h-1 border-b-[1px] w-full border-gray opacity-50 pt-2"></View>

        <View className="w-full h-[0.5] bg-gray-500 opacity-50 pt-2" />
        <View className="flex-row justify-between w-full items-start">
          <View className="flex-col items-start justify-between">
            <View className="flex-row items-center justify-start pb-2 flex-wrap">
              <CardLabel
                title={Utility.determineCategory(certificate.courseCategory)}
                icon={Utility.determineIcon(certificate.courseCategory)}
              />
              <View className="w-2.5" />
              <CardLabel
                title={Utility.formatHours(certificate.estimatedCourseDuration)}
                icon={'clock-outline'}
              />
              <View className="w-2.5" />
              <CardLabel
                title={certificate.dateOfCompletion}
                icon={'calendar-check'} />
            </View>
            <View className="h-1.25 opacity-50" />

          </View>

        </View>

      </View>


      <Collapsible className="w-full" collapsed={isCollapsed}>
        <View className="py-7 flex-row items-center justify-between px-1">
          <Text className="text-black text-m">{certificate.courseName}</Text>
        </View>

      </Collapsible>
    </Pressable>
  );
}

CertificateCard.propTypes = {
  certificate: PropTypes.object,
};