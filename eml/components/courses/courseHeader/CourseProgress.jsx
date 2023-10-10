import React from 'react'
import { View } from 'react-native'
import Text from '../../../components/general/Text';

/**
 * Renders a course progress bar with the given fraction values.
 * @param {Object} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
export default function CourseProgress({ fracTop, fracBot }) {

  const progressWidth = (fracTop / fracBot)*100;

  return (
    <View className="flex-col h-[45%] bg-[#ccc] rounded-[10px] my-[10px] w-[100%] max-w-[65%] min-w-[65%]">
      <View className={'rounded-tl-[10px] rounded-bl-[10px] rounded-br-[8px] rounded-tr-[8px] h-[100%] bg-[#5ECCE9] opacity-[0.5] absolute min-w-[0%] w-[' + progressWidth.toString() + '%]'}/>
      <Text className="text-[15px] font-bold text-black absolute bottom-[-23%] right-[-22%]">
        {progressWidth}%
      </Text>
    </View> 
  )
}
