import React from 'react'
import { View } from 'react-native'
import Text from '../../../components/general/Text';
import PropTypes from 'prop-types'

/**
 * Renders a course progress bar with the given fraction values.
 * @param {Object} props - The component props.
 * @param {number} props.fracTop - The numerator of the fraction.
 * @param {number} props.fracBot - The denominator of the fraction.
 * @returns {JSX.Element} - The rendered component.
 */
export default function CourseProgress({ fracTop, fracBot }) {
  CourseProgress.propTypes = {
    fracTop: PropTypes.number.isRequired,
    fracBot: PropTypes.number.isRequired
  }

  const progressWidth = (fracTop / fracBot)*100;

  return (
    <View className="flex-col h-[45%] bg-[#ccc] rounded-[10px] my-[10px] w-[100%] max-w-[65%] min-w-[65%]">
      <View className={'rounded-tl-[10px] rounded-bl-[10px] rounded-br-[8px] rounded-tr-[8px] h-[100%] bg-[#5ECCE9] opacity-[0.5] absolute min-w-[0%] w-[' + progressWidth.toString() + '%]'}/>
      <Text className="text-[13px] font-bold text-black absolute bottom-[0%] right-[-30%]">
        {fracTop} / {fracBot}
      </Text>
    </View> 
  )
}
