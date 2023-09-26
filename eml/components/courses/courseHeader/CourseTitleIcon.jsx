import React from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
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
      <View>
        {/*Right now image is hardcoded but could be made into a switch statement determining image based on category. 
        This is due to the require function not being able to use variables as input */}
          <Image source={require('../../../assets/icon.png')}
          style={{width: Dimensions.get('window').width*0.2, height: Dimensions.get('window').width*0.2 }}
          /> 
      </View>
      <View className="pt-1 pl-3" style={{width: Dimensions.get('window').width*0.6}}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={{fontSize: 23, fontFamily: 'VarelaRound_400Regular', color: 'rgb(255,0,0)'}}
        >
          {title}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width*0.85,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 20,
    overflow: 'hidden'
  },
})
