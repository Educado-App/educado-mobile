import React from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text} from "react-native";
const VeryNiceButton = () => {

  const ChangeButtonStyle = () =>{
    Alert.alert("WARNING")
  }
    return (
      <TouchableOpacity style={styles.iceButton}>
        <Text>Press me</Text>
      </TouchableOpacity>
)
};
const styles = StyleSheet.create({
  iceButton:{
    backgroundColor: "#1E6738",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginBottom: 3,
    marginRight: 2,
    borderColor: "#FFFF00"
  }
  });

export default VeryNiceButton;