import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Star from '../../gamificationElements/Star'
import PropTypes from 'prop-types'

export default function CourseProgress({ fracTop, fracBot }) {
  CourseProgress.propTypes = {
    fracTop: PropTypes.number.isRequired,
    fracBot: PropTypes.number.isRequired
  }
  return (
    <View style={styles.container}>
      <Text style={styles.fracStyle}>
        {fracTop}/{fracBot}
      </Text>
      <Star></Star>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    bottom: '5%',
    left: '1%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fracStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
