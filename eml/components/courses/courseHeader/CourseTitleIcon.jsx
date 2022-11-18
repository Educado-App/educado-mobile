import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

import { Text } from '@ui-kitten/components'
import PropTypes from 'prop-types'

export default function CourseTitleIcon({ title, courseIcon }) {
  CourseTitleIcon.propTypes = {
    title: PropTypes.string.isRequired,
    courseIcon: PropTypes.string.isRequired
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
        <Image source={{ uri: courseIcon}}
        style={{width: 50, height: 50}}
        className="rounded-xl"
        ></Image>
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
