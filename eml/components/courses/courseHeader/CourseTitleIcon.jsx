import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Text } from '@ui-kitten/components';

import HeaderIcon from '../../exercise/headerIcon'
import PropTypes from 'prop-types'

export default function CourseTitleIcon({ title }) {
  CourseTitleIcon.propTypes = {
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
      <View style={{ padding: '5%' }}>
        <HeaderIcon
          name='circle'
          type='entypo'>
        </HeaderIcon>
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
