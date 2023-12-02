import React from 'react';
import { Icon } from '@rneui/themed';

export default function star() {
	return (
		<Icon
			style={{
				shadowOpacity: 0.8,
				shadowRadius: 2,
				shadowOffset: { width: 0, height: 0 },
				shadowColor: '#ffd633'
			}}
			size={30}
			name="star"
			type="material-community"
			color="#ffd633"
		/>
	);
}
