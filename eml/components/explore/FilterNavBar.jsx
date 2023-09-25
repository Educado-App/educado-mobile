import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import SearchBar from './SearchBar'; // Import the SearchBar component

const categories = [
  { key: 'category1', label: 'All' },
  { key: 'category2', label: 'Finance' },
  { key: 'category3', label: 'Category' },
  { key: 'category4', label: 'Category' },
  { key: 'category5', label: 'Category' },
  { key: 'category6', label: 'Category' },
  { key: 'category7', label: 'Category' },
];

function FilterNavBar() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Add your filtering logic here based on the selected category
  };

  const handleSearchInputChange = (text) => {
    setSearchText(text);
    // Add your search logic here based on the input text
  };

  return (
    <View>
      {/* Search Bar */}
      <View style={{ elevation: 15, zIndex: 15 }} className="pl-2 pr-2">
      <SearchBar  searchText={searchText} onSearchChange={handleSearchInputChange} />
      </View>
      {/* Categories */}
      <View style={{ elevation: 15, zIndex: 15 }} className="pl-2 pr-2 pb-4">
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories
              .filter((category) => category.label.includes(searchText)) // Filter categories based on the search text
              .map((category) => (
                <TouchableOpacity
                  key={category.key}
                  onPress={() => handleCategorySelect(category.key)}
                  style={{
                    backgroundColor: selectedCategory === category.key ? '#5fcce9' : 'transparent',
                    paddingHorizontal: 8,
                    paddingVertical: 7,
                    borderRadius: 8,
                    marginRight: 10,
                    borderColor: 'gray',
                    borderWidth: selectedCategory === category.key ? 0 : 1,
                    opacity: selectedCategory === category.key ? 1 : 0.5,
                  }}
                >
                  <Text style={{ 
                    color: selectedCategory === category.key ? 'white' : 'gray',
                    fontWeight: selectedCategory === category.key ? 'bold' : 'normal',
                    fontSize: 13,
                
                }}>{category.label}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default FilterNavBar;
