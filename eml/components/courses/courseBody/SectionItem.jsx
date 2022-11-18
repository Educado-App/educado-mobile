import React from 'react'
import {Pressable, Text, View} from 'react-native'
import PropTypes from 'prop-types'

export default function SectionItem({title, index}) {
    SectionItem.propTypes = {
        title: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired
      }
    
    return (
        <Pressable
      style={{ shadowColor: 'black', elevation: 10 }}
      className="w-max h-12 rounded-xl items-center flex-col bg-cyan-100 m-1 "
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