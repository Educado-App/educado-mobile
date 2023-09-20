import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export function BgLinearGradient({ children }) {
  const tailwindConfig = require('../tailwind.config.js');

  const projectColors = tailwindConfig.theme.colors;

  const gradientColors = [
    projectColors.secondary,
    projectColors.projectWhite,
  ];

  return (
    <LinearGradient colors={ gradientColors } start={{ x: 1, y: 0.2 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      {children}
    </LinearGradient>
  );
}