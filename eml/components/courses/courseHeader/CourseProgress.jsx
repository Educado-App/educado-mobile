import React from 'react'
import { View} from 'react-native'
import Text from '../../../components/general/Text';
import PropTypes from 'prop-types'

export default function CourseProgress({ fracTop, fracBot }) {
  CourseProgress.propTypes = {
    fracTop: PropTypes.number.isRequired,
    fracBot: PropTypes.number.isRequired
  }

  const className = ((fracTop/fracBot)*100)

  return (
    <View className="flex-col h-[45%] bg-[#ccc] rounded-[10px] my-[10px] w-[100%] max-w-[71%] min-w-[71%]">
      <View className={"rounded-tl-[10px] rounded-bl-[10px] rounded-br-[8px] rounded-tr-[8px] h-[100%] bg-[#5ECCE9] opacity-[0.5] absolute min-w-[0%] w-[" + className + "%]"}/>
      <Text className="text-[13px] font-bold text-black absolute bottom-[0%] right-[-28%]">
        {fracTop} / {fracBot}
      </Text>
    </View> 
  )
}
