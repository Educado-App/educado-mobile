import React from 'react';
import {StyleSheet, TouchableOpacity} from "react-native";
const AnswerButton = ({icon, }) => {

    return (
      <TouchableOpacity style={styles.iceButton}>
        {icon}
      </TouchableOpacity>
)
};
const styles = StyleSheet.create({
  iceButton:{
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
  });

export default AnswerButton;