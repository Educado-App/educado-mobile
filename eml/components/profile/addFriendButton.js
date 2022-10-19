import React from 'react'
import { StyleSheet, Text, View } from "react-native";
import { Icon } from '@rneui/themed'

const AddFriendButton = () => {

    return (
      <View>
        <View style={styles.button}>
          <Text style={styles.text}>
            <Icon
            style={styles.icon}
            name="account-plus"
            type="material-community"
            color="#55747E"
            size={30}/> 
            Add Friends 
          </Text>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginLeft: 50,
    marginRight: 50
  },
  text: {
    fontSize: 30,
    color: "#55747E"
  },
  icon: {
    marginRight: 10
  }
});

export default AddFriendButton