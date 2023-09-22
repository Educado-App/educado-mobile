import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Text } from '@ui-kitten/components'
import PropTypes from 'prop-types'
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'

export default function CourseTitleIcon({ title, courseIcon }) {
  CourseTitleIcon.propTypes = {
    title: PropTypes.string.isRequired,
    courseIcon: PropTypes.string
  }

  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular
  })
  let courseIconPath = courseIcon;
  console.log(courseIconPath);
  return (
    <View style={styles.container}>
      <View style={{ padding: '5%' }}>
        {/*Right now image is hardcoded but could be made into a switch statement determining image based on category */}
          <Image source={require('../../../assets/icon.png')}
            style={{ width: 75, height: 75 }}
            className="rounded-full"
          /> 
      </View>
    <View>
      <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={{ fontSize: 30, fontFamily: 'VarelaRound_400Regular', color: 'rgb(255,0,0)' }}
        >
          {title}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
