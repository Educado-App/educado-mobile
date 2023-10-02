import React from 'react'
import { StyleSheet, View, Text} from 'react-native'
import Star from '../../gamification/Star'
import PropTypes from 'prop-types'

export default function CourseProgress({ fracTop, fracBot }) {
  CourseProgress.propTypes = {
    fracTop: PropTypes.number.isRequired,
    fracBot: PropTypes.number.isRequired
  }
  return (
    <View style={[styles.container, {width: fracBot - 20 + '%'}]}>
      <View style={[styles.bar2, {width: fracTop + '%'}]}/>
      <Text style={styles.fracStyle}>
        {fracTop}/{fracBot}
      </Text>
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '7%',
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginVertical: 10,
  },
  bar: {
    height: 20,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  bar2: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: '100%',
    backgroundColor: '#89CFF0',
    opacity: 0.5,
    position: 'absolute'
  },
  fracStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    position: 'absolute',
    alignSelf: 'center',
    bottom: -3.8,
    right: -48,
  }
})
