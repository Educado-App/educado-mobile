import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from '../general/Text';
import tailwindConfig from '../../tailwind.config';
import PropTypes from 'prop-types';

/**
 * CustomRating component displays a star rating based on a number
 * @param rating - Number between 0 and 5
 * @returns {JSX.Element} - Rendered component
 */
const CustomRating = ({ rating = 0 }) => {
	const [ratingIcons, setRatingIcons] = useState(Array(5).fill({ icon: 'star-outline', color: tailwindConfig.theme.colors.projectGray }));
	const [noRating, setNoRating] = useState(false);

	useEffect(() => {
		const fullStars = Math.floor(rating);
		const halfStar = rating % 1 !== 0;

		if (rating !== 0) {
			const newRatingIcons = ratingIcons.map((icon, index) => {
				if (index < fullStars) {
					return { icon: 'star', color: tailwindConfig.theme.colors.yellow };
				}
				else if (index === fullStars && halfStar) {
					return { icon: 'star-half-full', color: tailwindConfig.theme.colors.yellow };
				} else {
					return { icon: 'star-outline', color: tailwindConfig.theme.colors.projectGray };
				}
			});

			setRatingIcons(newRatingIcons);
		} else {
			setNoRating(true);
		}

	}, [rating]);

	return (
		noRating ? (
			<View className="w-full flex-row items-start justify-start">
				<Text className="pl-1 text-xs text-projectGray">ainda sem avaliações</Text>
			</View>
		) :
			<View className="w-full flex-row items-start justify-start">
				{ratingIcons.map((icon, index) => (
					<MaterialCommunityIcons key={index} name={icon.icon} size={14} color={icon.color} />
				))}
			</View>
	);
};

CustomRating.propTypes = {
	rating: PropTypes.number,
};

export default CustomRating;