import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import HeaderIcon from '../../sessions/headerIcon'
import PropTypes from 'prop-types'

export default function CourseTitleIcon({ color, name, type, title }) {
  CourseTitleIcon.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }

  return (
    <View style={styles.container}>
      <View>
        <Text
          numberOfLines={1}
          ellipsizeMode={'clip'}
          style={styles.titlestyle}
        >
          {title}
        </Text>
      </View>
      <View style={{ bottom: '5%' }}>
        <HeaderIcon color={color} name={name} type={type}></HeaderIcon>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '75%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titlestyle: {
    top: '20%',
    fontSize: 30,
    fontWeight: 'bold',
    overflow: 'visible'
  }
})
