import React from 'react'
import {Pressable, Text, View} from 'react-native'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'

export default function SectionItem({title, index, courseId, sectionId}) {
    SectionItem.propTypes = {
        title: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        courseId: PropTypes.string.isRequired,
        sectionId: PropTypes.string.isRequired
      }

      const navigation = useNavigation()
    
    return (
        <Pressable
      style={{ shadowColor: 'black', elevation: 10 }}
      className="w-max h-12 rounded-xl items-center flex-col bg-cyan-100 m-1 "
      onPress={() => {
        navigation.navigate('Exercise', {
          sectionId: sectionId,
          courseId: courseId
        })
      }}
    >
    <View className="flex-row">
    <Text style={{ fontFamily: 'VarelaRound_400Regular' }} className="items-left">
        {index}
      </Text>
      <Text style={{ fontFamily: 'VarelaRound_400Regular' }}>
        {title}
      </Text>
      </View>
    </Pressable>

    )
}