import React from 'react';
import { TextInput, View } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons'; // Import MaterialIcons from react-native-vector-icons

function SearchBar({ searchText, onSearchChange }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
      <TextInput
        placeholder="Buscar cursos"
        //value={searchText}
        onChangeText={onSearchChange}
        style={{
          flex: 1, // This allows the TextInput to expand to fill available space
          backgroundColor: '#ffffff',
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 5,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
        }}
      />
      <MaterialIcons style={{ position: 'absolute', right: 18, top: 5, opacity: 0.5, }} name="search" size={24} color="gray" />
    </View>
  );
}

export default SearchBar;
