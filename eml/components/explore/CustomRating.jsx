import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomRating = ({ rating = 5 }) => {
  const [ratingIcons, setRatingIcons] = useState(Array(5).fill({ icon: 'star-outline', color: 'gray' }));

  useEffect(() => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    const newRatingIcons = ratingIcons.map((icon, index) => {
      if (index < fullStars) {
        return { icon: 'star', color: '#f1CC4f' };
      } else if (index === fullStars && halfStar) {
        return { icon: 'star-half-full', color: '#f1CC4f' };
      } else {
        return { icon: 'star-outline', color: 'gray' };
      }
    });

    setRatingIcons(newRatingIcons);
  }, [rating]);

  return (
    <View className="w-full flex-row items-start justify-start">
      {ratingIcons.map((icon, index) => (
        <MaterialCommunityIcons key={index} name={icon.icon} size={14} color={icon.color} />
      ))}
    </View>
  );
};

export default CustomRating;
