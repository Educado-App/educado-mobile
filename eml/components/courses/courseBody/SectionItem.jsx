// @flow
import React, {useState, useEffect} from 'react'
import { Pressable, Text, View, Alert } from 'react-native'
import PropTypes from 'prop-types'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {getNextExercise} from "../../../services/StorageService";

export default function SectionItem({ active, title, index, sectionId, courseId }) {

  SectionItem.propTypes = {
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    courseId: PropTypes.string.isRequired,
    sectionId: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
  }

  const [isComplete, setIsComplete] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const isSectionComplete = async () => {
    return await getNextExercise(sectionId);
  }

  useEffect(() => {
    isSectionComplete().then((exercise)=>{
      if(exercise === true){
        setIsComplete(exercise);
      }
    });
  },[isFocused]);

  if (active) {
    // if (true) {
    return (
      <Pressable
        style={{ shadowColor: 'black', elevation: 10 }}
        className="w-max h-12 rounded-xl bg-limeGreen m-1"
        onPress={() => {
          if (!isComplete){
            navigation.navigate('Exercise', {
              sectionId: sectionId,
              courseId: courseId
            })
          }else {
            Alert.alert('Section already completed!', 'Delete and re-download the course to try again.', [{
              text:'Close',
            }])
          }
        }}
      >
        {/* <View className="flex-row flex-1">

        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} className="rounded-xl bg-limeGreenDarker">
          <Text style={{ fontFamily: 'VarelaRound_400Regular', fontSize: 16 }}>
            {index}
          </Text>
        </View> */}
        <View className="flex-row pt-3">
          <Text style={{
            fontFamily: 'VarelaRound_400Regular',
            fontSize: 16,
            textShadowColor: 'rgba(0, 0, 0, 0.50)',
            textShadowOffset: { width: -1, height: 0 },
            textShadowRadius: 5
          }} className="pl-4 font-bold text-babyBlue">
            {index}
          </Text>
          {isComplete ?
          <Text className='pl-24'>Completed</Text>
          :
          <Text style={{
            fontFamily: 'VarelaRound_400Regular', fontSize: 16,
          }} ellipsizeMode={'tail'} numberOfLines={1} className="pl-10 pr-4 text-gray-600">
            {title}
          </Text> }

        </View>
      </Pressable>
    )
  } else { //This is the course style for when the course is not active
    return (

      <Pressable
        style={{ shadowColor: 'black', elevation: 10 }}
        className="w-max h-12 rounded-xl bg-gray-500 m-1"
        onPress={() => {
          Alert.alert("The Course is not downloaded")
        }}
      >
        <View className="flex-row pt-3">
          <Text style={{
            fontFamily: 'VarelaRound_400Regular',
            fontSize: 16,
            textShadowColor: 'rgba(0, 0, 0, 0.50)',
            textShadowOffset: { width: -1, height: 0 },
            textShadowRadius: 0
          }} className="pl-4 font-bold text-gray-800">
            {index}
          </Text>
          <Text style={{
            fontFamily: 'VarelaRound_400Regular', fontSize: 16,
          }} ellipsizeMode={'tail'} numberOfLines={1} className="pl-10 pr-4 text-gray-800">
            {title}
          </Text>
        </View>
      </Pressable>
    )
  }
}

