import React from 'react';
import { TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

/**
 * This component is used to display a search bar.
 * @param searchText - The current search text.
 * @param onSearchChange - Callback function called when the search text changes. It receives the updated search text as an argument.
 * @returns {JSX.Element} - Returns a JSX element.
 */
function SearchBar({ searchText, onSearchChange }) {
  return (
    <View className="flex-row items-center relative bg-white rounded-md pr-2.5 mb-2.5 mx-2.5">
      <TextInput
        placeholder="Buscar cursos"
        onChangeText={onSearchChange}
        className="flex-1 px-2.5 py-3 pr-35"
      />

      <MaterialCommunityIcons name="magnify" size={20} color="gray" />

    </View>
  );
}

export default SearchBar;
