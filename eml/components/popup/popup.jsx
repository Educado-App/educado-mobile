import React, { useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const Popup = ({ visible, children }) => {
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
      <View style={styles.overlay}>
        <PanGestureHandler onGestureEvent={handleGesture} onHandlerStateChange={handleStateChange}>
          <Animated.View  className="flex justify-between bg-secondary"style={[styles.popup, { transform: [{ translateY: slideAnim }] }]}>
            {children}
          </Animated.View>
        </PanGestureHandler>
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
    minHeight: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: 'relative',
  },
});

export default Popup;