import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilterNavBar from '../../../components/explore/FilterNavBar';

describe('FilterNavBar', () => {
    it('calls onChangeText when the search bar changes', () => {
        const mockOnChangeText = jest.fn();
        const { getByPlaceholderText } = render(
            <FilterNavBar onChangeText={mockOnChangeText} onCategoryChange={jest.fn()} />
        );

        const searchInput = getByPlaceholderText('Buscar cursos');
        fireEvent.changeText(searchInput, 'Test');

        expect(mockOnChangeText).toHaveBeenCalledWith('Test');
    });

    it('calls onCategoryChange when a category is selected', () => {
        const mockOnCategoryChange = jest.fn();
        const { getByText } = render(
            <FilterNavBar onChangeText={jest.fn()} onCategoryChange={mockOnCategoryChange} />
        );

        const categoryButton = getByText('Finance');
        fireEvent.press(categoryButton);

        expect(mockOnCategoryChange).toHaveBeenCalledWith('Finance');
    });
});
