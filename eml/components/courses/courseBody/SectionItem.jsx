import React from 'react'
import { Pressable, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'

export default function SectionItem({ title, index, courseId, sectionId }) {
    SectionItem.propTypes = {
        title: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        courseId: PropTypes.number.isRequired,
        sectionId: PropTypes.number.isRequired
      }

      const navigation = useNavigation()
    
    return (

        <Pressable
      style={{ shadowColor: 'black', elevation: 10 }}
      className="w-max h-12 rounded-xl items-center bg-limeGreen m-1 flex-1 "
      onPress={() => {
        navigation.navigate('Exercise', {
          sectionId: sectionId,
          courseId: courseId
        })
      }}
    >
      <View className="flex-row flex-1">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} className="rounded-xl bg-limeGreenDarker">
          <Text style={{ fontFamily: 'VarelaRound_400Regular', fontSize: 16 }}>
            {index}
      </Text>
      </View>
        <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'VarelaRound_400Regular', fontSize: 16 }} ellipsizeMode={'clip'} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </View>
    </Pressable >
    )
}