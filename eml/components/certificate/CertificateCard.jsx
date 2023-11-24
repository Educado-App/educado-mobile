import React from 'react';
import { View, Text } from 'react-native';
import CardLabel from '../explore/CardLabel';
import * as Utility from '../../services/utilityFunctions';
import PropTypes from 'prop-types';

/**
 * This component is used to display a certificate card.
 * @param certificate - The certificate object to be displayed.
 * @param previewOnPress - The function to be executed when the preview button is pressed.
 * @returns {JSX.Element|null} - Returns a JSX element.
 */
export default function CertificateCard({ certificate }) {
  return (
    <View className="bg-projectWhite rounded-lg shadow-2xl mb-4 mx-4 p-6 overflow-hidden">
      <View className="flex-col items-center">
        <View className="flex-row justify-between w-full items-center">
          <Text className="text-black font-medium text-lg">{certificate.courseName}</Text>
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
          </View>
        </View>
      </View>
    </View>
  );
}

CertificateCard.propTypes = {
  certificate: PropTypes.object,
};