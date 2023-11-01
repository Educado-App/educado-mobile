import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import tailwindConfig from '../tailwind.config.js';

export function BgLinearGradient({ children }) {

  BgLinearGradient.propTypes = {
    children: PropTypes.object.isRequired, 
  };

  const projectColors = tailwindConfig.theme.colors;

  const gradientColors = [
    projectColors.bgPrimary,
    projectColors.projectWhite,
  ];

  return (
    <LinearGradient colors={ gradientColors } start={{ x: 1, y: 0.2 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      {children}
    </LinearGradient>
  );
}