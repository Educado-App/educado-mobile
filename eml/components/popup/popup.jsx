import React, { useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const Popup = ({ visible, onClose, title, message }) => {
  const slideAnim = useRef(new Animated.Value(height)).current;

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: slideAnim } }],
    { useNativeDriver: true }
  );

  const handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationY > 50) {
        onClose();
      }
    }
  };

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
      <TouchableOpacity style={styles.overlay} activeOpacity={1}>
        <PanGestureHandler onGestureEvent={handleGesture} onHandlerStateChange={handleStateChange}>
          <Animated.View style={[styles.popup, { transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name='keyboard-arrow-down' size={34} color='black' />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <Text>{message}</Text>
          </Animated.View>
        </PanGestureHandler>
      </TouchableOpacity>
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
    minHeight: 250,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Popup;