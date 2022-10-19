import React from 'react'
import { StyleSheet, Text, View } from "react-native";

const ProfileName = ({UserName, Name}) => {

    return (
      <View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {Name}
          </Text>
          <Text style={styles.profileUserName}>
            {UserName}
          </Text>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  profileInfo: {
    margin: 10
  },
  profileName: {
    fontSize: 40,
    textAlign: "center"
  },
  profileUserName: {
    fontSize: 20,
    textAlign: "center"
  }
});

export default ProfileName
