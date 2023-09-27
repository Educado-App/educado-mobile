import React from 'react'
import { StyleSheet, View, Text, Animated } from 'react-native'
import Star from '../../gamification/Star'
import PropTypes from 'prop-types'

export default function CourseProgress({ fracTop, fracBot }) {
  CourseProgress.propTypes = {
    fracTop: PropTypes.number.isRequired,
    fracBot: PropTypes.number.isRequired
  }
  return (
    <View style={[styles.container, {width: fracBot * 1.6}]}>
      <Animated.View style={[styles.bar, {width: fracTop * 1.6}]}/>
      <Text style={styles.fracStyle}>
        {fracTop}/{fracBot}
      </Text>
      {/*<Star></Star>*/}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginVertical: 10,
  },
  bar: {
    height: 20,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  fracStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  }
})
