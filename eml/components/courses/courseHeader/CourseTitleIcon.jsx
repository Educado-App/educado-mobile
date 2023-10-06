import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Text from '../../general/Text';
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

  return (
    <View style={styles.container}>
      <View>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={{ fontSize: 30, fontFamily: 'VarelaRound_400Regular', color: 'rgb(75,85,99)' }}
        >
          {title}
        </Text>
      </View>
      <View style={{ padding: '5%' }}>
        {courseIcon !== undefined || courseIcon !== 'https://s3.eu-central-1.amazonaws.com/' || courseIcon !== null || courseIcon !== '' ?
          <Image source={{ uri: courseIcon }}
            style={{ width: 50, height: 50 }}
            className="rounded-xl"
          /> :
          <Image source={require('../../../assets/images/loadingImage.png')}
            style={{ width: 50, height: 50 }}
            className="rounded-xl"
          />
        }
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
})
