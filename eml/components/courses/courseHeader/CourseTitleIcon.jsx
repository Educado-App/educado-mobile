import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Text from '../../general/Text';
import PropTypes from 'prop-types'
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/dev'
import CourseProgress from './CourseProgress'

export default function CourseTitleIcon({ title, courseIcon, category, progress }) {
  CourseTitleIcon.propTypes = {
    title: PropTypes.string.isRequired,
    courseIcon: PropTypes.string,
    category: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired
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
          style={{width: Dimensions.get('window').width*0.25, height: Dimensions.get('window').width*0.25 }}
          /> 
      </View>
      <View className="pt-1 pl-3 pr-3" style={{width: Dimensions.get('window').width*0.6}}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={{fontSize: 23, fontFamily: 'VarelaRound_400Regular', color: 'rgb(255,0,0)'}}
        >
          {title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={{fontSize: 16, fontFamily: 'VarelaRound_400Regular', color: 'rgb(0,0,0)'}}
        >
          {category}
        </Text>
        <CourseProgress fracBot={100} fracTop={50}>
        </CourseProgress>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width*0.85,
    height: Dimensions.get('window').width*0.32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255,255,255)',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden'
  },
})
