import { React } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import AddFriendButton from '../../components/profile/addFriendButton'
import ProfileImage from '../../components/profile/profileImage'
import ProfileName from '../../components/profile/profileName'
import ProfileSettings from '../../components/profile/profileSettings'

export default function ProfileComponent() {
  return (
    <SafeAreaView style={styles.container}> 
    <View>
      <View style={styles.topContainer}>
        <ProfileName 
        Name={"Jona"}
        UserName={"Jona109"}
        ></ProfileName>
        <ProfileSettings></ProfileSettings>
      </View>
      <ProfileImage></ProfileImage>
      <AddFriendButton></AddFriendButton>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  topContainer: {
    
    //magic flex alligmenet here
  }
})
