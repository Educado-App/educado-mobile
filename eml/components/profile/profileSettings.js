import React from 'react'
import { StyleSheet, Text, View } from "react-native"
import { Icon } from '@rneui/themed';

const ProfileSettings = () => {

    return (
      <View style={styles.container}>
        <Icon
            style={styles.icon}
            name="cog"
            type="material-community"
            color="#1C1E1E"
            size={30}/> 
      </View>
    );
}
const styles = StyleSheet.create({
  icon: {

  },
  container: {
    justifyContent: "center",
    marginBottom: 20
  }
});

export default ProfileSettings
