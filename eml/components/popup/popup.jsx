import React, { useState, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const Popup = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(height)).current;

  if (visible) {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.overlay}>
        <Animated.View style={[styles.popup, { transform: [{ translateY: slideAnim }] }]}>
          <Text>This is a popup!</Text>
          <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  popup: {
    height: 200,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});

export default Popup;