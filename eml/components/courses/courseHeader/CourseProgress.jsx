import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'
import { Icon } from '@rneui/themed'
import Star from '../../gamificationElements/Star'
import PropTypes from 'prop-types'

export default function CourseProgress({ fracTop, fracBot }) {
  CourseProgress.propTypes = {
    fracTop: PropTypes.number.isRequired,
    fracBot: PropTypes.number.isRequired
  }
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.fracStyle}>
          {fracTop}/{fracBot}
        </Text>
      </SafeAreaView>
      <SafeAreaView>
        <Star></Star>
      </SafeAreaView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
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
