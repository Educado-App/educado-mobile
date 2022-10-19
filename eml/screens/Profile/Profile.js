import { React } from 'react'
import { StyleSheet, View, SafeAreaView, Platform } from 'react-native'
import AddFriendButton from '../../components/profile/addFriendButton'
import ProfileImage from '../../components/profile/profileImage'
import ProfileName from '../../components/profile/profileName'
import ProfileSettings from '../../components/profile/profileSettings'

export default function ProfileComponent() {
  return (
    <SafeAreaView style={styles.container}> 
    <View>
      <ProfileSettings style={styles.settings}></ProfileSettings>
        <ProfileName
        Name={"Jona"}
        UserName={"Jona109"}
        ></ProfileName>
        
      
      <ProfileImage></ProfileImage>
      <AddFriendButton></AddFriendButton>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  settings: {
    textAlign: "right"
  },
  container: {
    paddingTop: Platform.OS === 'android' ? 25 : 0
  }
})
