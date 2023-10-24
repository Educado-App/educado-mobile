import React, { useState } from 'react';
import SearchBar from './SearchBar'; 
import { View, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const categories = [
  { key: 'category0', label: "Todos"},
  { key: 'category1', label: "Finanças pessoais" },
  { key: 'category2', label: "Saúde e segurança no trabalho" },
  { key: 'category3', label: "Costura" },
  { key: 'category4', label: "Eletrônica" },
  { key: 'category5', label: "Outro" },
];

function FilterNavBar({ onChangeText, onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handleSearchInputChange = (text) => {
    setSearchText(text);
    onChangeText(text);
  };

  return (
    <View>
      <View className="z-10 p-2">
        <SearchBar searchText={searchText} onSearchChange={handleSearchInputChange} />
      </View>

      <View className=" z-10 pl-2 pr-2 pb-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex items-center p-2 ">
          <View className="flex-row overflow-x-auto">
            {categories
              .filter((category) => category.label.toLowerCase().includes(searchText.toLowerCase()))
              .map((category) => (
                <Pressable
                  key={category.label}
                  onPress={() => handleCategorySelect(category.label)}
                  className={`${
                    selectedCategory === category.label
                      ? 'bg-primary border-primary text-white'
                      : 'border-2 border-gray text-gray'
                    } px-2 py-2 rounded-lg border-[1px] mr-2 items-center justify-center`}
                >
                  <Text
                    className={`${
                      selectedCategory === category.label
                        ? 'text-white font-bold'
                        : 'text-gray'
                      }`}
                  >{category.label}</Text>
                </Pressable>
              ))}
          </View>
        </View>
        </ScrollView>
      </View>
      
    </View>
  );
}

export default FilterNavBar;
