import React from 'react'
import { View } from 'react-native'
import Text from '../general/Text';
import PropTypes from 'prop-types'

/**
 * Renders a section progress bar with the given fraction values.
 * @param {Object} props - The component props.
 * @param {number} props.fracTop - The numerator of the fraction.
 * @param {number} props.fracBot - The denominator of the fraction.
 * @returns {JSX.Element} - The rendered component.
 */
export default function SectionProgress({ fracTop, fracBot }) {
  SectionProgress.propTypes = {
    fracTop: PropTypes.number.isRequired,
    fracBot: PropTypes.number.isRequired
  }

  const progressWidthSec = (fracTop / fracBot)*100;

  return (
    <View className="self-start ml-[7.5%] h-[3%] bg-[#ccc] rounded-[10px] mb-[5%] w-[100%] max-w-[73%] min-w-[73%]">
        {/* Nativewind does not work correctly with variables as parameters for width, so we have to use style instead */}
      <View className={'rounded-tl-[10px] rounded-bl-[10px] rounded-br-[8px] rounded-tr-[8px] h-[100%] bg-[#5ECCE9] opacity-[0.5] absolute min-w-[0%]'}
      style={{width: progressWidthSec + "%"}}/>
      <Text className="text-[15px] font-bold text-black right-[-16%] bottom-[0%] self-end absolute">
        {progressWidthSec}%
      </Text>
    </View> 
  )
}
