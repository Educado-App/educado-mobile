import React from 'react';
import { render } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import TextImageLectureScreen from '../../../screens/lectures/TextImageLectureScreen'; // update this import to your file structure

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

describe('TextImageLectureScreen', () => {
    it('displays the correct text and course title', () => {
        // Setup mock
        useNavigation.mockReturnValue({ goBack: jest.fn() });

        const { getByText } = render(<TextImageLectureScreen lecture={{ description: 'Test Description' }} course={{ title: 'Test Course' }} />);
        expect(getByText('Test Description')).toBeTruthy();
        expect(getByText('Course Name: Test Course')).toBeTruthy();
    });

    // Add more test cases...
});
