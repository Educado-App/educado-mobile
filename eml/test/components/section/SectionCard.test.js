/**
 * This file contains the test suite for the SectionCard component.
 * It imports React, render, fireEvent and renderer from testing-library/react-native.
 * It also imports the SectionCard component from the components/section directory.
 * The useNavigation hook is mocked using jest.mock.
 * A sample section object is created for testing purposes.
 * The test suite includes tests for rendering the component with provided data,
 * displaying the correct status based on progress, and expanding and collapsing the component.
 * @module SectionCard.test
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from "react-test-renderer";
import SectionCard from '../../../components/section/SectionCard';

// Mock the useNavigation hook outside the describe block
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: jest.fn(),
    }),
}));

let sectionCard;

// Sample section data for testing
const mockSection = {
    title: "Sample Section",
    description: "This is a sample section description.",
    total: 10
};

beforeEach(() => {
    sectionCard = renderer.create(<SectionCard section={mockSection} />);
});

describe('<SectionCard />', () => {
    it('Renders correctly with provided data', () => {
        const { getByText } = render(<SectionCard section={mockSection} />);

        // Check if title and description are displayed
        expect(getByText(mockSection.title)).toBeTruthy();
        expect(getByText(mockSection.description)).toBeTruthy();
    });

    it('Displays correct status based on progress', () => {
        const { queryByText } = render(<SectionCard section={mockSection} />);

        // Use a regular expression to match the 0/total pattern
        const pattern = new RegExp(`0/${mockSection.total}`);
        expect(queryByText(pattern)).toBeTruthy();
    });

    it('should expand and collapse when clicked', () => {
        /**
         * Represents a sample section.
         * @typedef {Object} Section
         * @property {string} title - The title of the section.
         * @property {string} description - The description of the section.
         * @property {number} total - The total number of items in the section.
         */

        /**
         * A sample section object.
         * @type {Section}
         */
        const section = {
            title: 'Sample Section',
            description: 'Sample section description',
            total: 10, // Update with the desired total
        };

        const { getByTestId } = render(<SectionCard section={section} />);

        const collapsibleButton = getByTestId('collapsible');

        // Ensure Collapsible content is initially hidden
        expect(getByTestId('chevron-down')).toBeTruthy();

        // Click the Collapsible button to expand it
        fireEvent.press(collapsibleButton);

        // Ensure Collapsible content is now visible
        expect(getByTestId('chevron-up')).toBeTruthy();

        // Click the Collapsible button to collapse it
        fireEvent.press(collapsibleButton);

        // Ensure Collapsible content is hidden again
        expect(getByTestId('chevron-down')).toBeTruthy();
    });
});