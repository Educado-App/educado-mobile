import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';

export function BgLinearGradient({ children }) {
	const tailwindConfig = require('../tailwind.config.js');
	const projectColors = tailwindConfig.theme.colors;

	const gradientColors = [
		projectColors.bgprimary_custom,
		projectColors.projectWhite,
	];

	return (
		<LinearGradient colors={ gradientColors } start={{ x: 1, y: 0.2 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
			{children}
		</LinearGradient>
	);
}

BgLinearGradient.propTypes = {
	children: PropTypes.object.isRequired, 
};