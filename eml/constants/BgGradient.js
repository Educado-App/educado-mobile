import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';

export function BgLinearGradient({ children }) {
  return (
    <LinearGradient colors={['#C9E5EC', '#FFFFFF']} start={{ x: 1, y: 0.2 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      {children}
    </LinearGradient>
  );
}

const TouchableBgLinearGradient = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
    <BgLinearGradient>
      {children}
    </BgLinearGradient>
  </TouchableOpacity>
);

export default TouchableBgLinearGradient;
