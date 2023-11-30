import React from 'react';
import { TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

/**
 * This component is used to display a search bar.
 * @param searchText - The current search text.
 * @param onSearchChange - Callback function called when the search text changes. It receives the updated search text as an argument.
 * @param placeholder - The placeholder text for the search bar.
 * @returns {JSX.Element} - Returns a JSX element.
 */
function SearchBar({ onSearchChange, placeholder }) {
	return (
		<View className="flex-row items-center relative bg-projectWhite border-projectGray rounded-md pr-2.5 mb-2.5 mx-2.5">
			<TextInput
				placeholder={placeholder}
				onChangeText={onSearchChange}
				className="flex-1 px-2.5 py-3 pr-35"
			/>
			<MaterialCommunityIcons name="magnify" size={20} color="gray" />
		</View>
	);
}

SearchBar.propTypes = {
	onSearchChange: PropTypes.func,
	placeholder: PropTypes.string,
};

export default SearchBar;
