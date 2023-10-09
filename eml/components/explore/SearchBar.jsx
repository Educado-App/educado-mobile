import React from 'react';
import { TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
