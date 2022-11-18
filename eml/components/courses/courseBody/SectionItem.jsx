import React from 'react'
import { Pressable, Text, View } from 'react-native'
import PropTypes from 'prop-types'

export default function SectionItem({ title, index }) {
  SectionItem.propTypes = {
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
  }

  return (
    <Pressable
      style={{ shadowColor: 'black', elevation: 10 }}
      className="w-max h-12 rounded-xl items-center bg-blue-300 m-1 flex-1 "
    >
      <View className="flex-row flex-1">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} className="rounded-xl bg-blue-200">
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