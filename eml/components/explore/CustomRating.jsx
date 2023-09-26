import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CustomRating = ({ rating = 5 }) => {
  const [ratingIcons, setRatingIcons] = useState(Array(5).fill({ icon: 'star-border', color: 'gray' }));

  useEffect(() => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    const newRatingIcons = ratingIcons.map((icon, index) => {
      if (index < fullStars) {
        return { icon: 'favorite', color: '#ff6767' };
      } else if (index === fullStars && halfStar) {
        return { icon: 'favorite', color: '#ff6767' };
      } else {
        return { icon: 'favorite-border', color: 'gray' };
      }
    });

    setRatingIcons(newRatingIcons);
  }, [rating]);

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'start',
      }}
    >
      {ratingIcons.map((icon, index) => (
        <MaterialIcons key={index} name={icon.icon} size={18} color={icon.color} />
      ))}
    </View>
  );
};

export default CustomRating;
