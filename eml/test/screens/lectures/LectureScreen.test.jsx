import React from 'react';
import { render } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import LectureScreen from '../../../screens/lectures/LectureScreen';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

describe('LectureScreen', () => {
    it('shows loading when lecture and course are not available', () => {
        // Setup mock
        useNavigation.mockReturnValue({ goBack: jest.fn() });

        const route = {
            params: {
                lectureId: 'mockLectureId',
                courseId: 'mockCourseId'
            }
        };

        const { getByText } = render(<LectureScreen route={route} />);
        expect(getByText('loading...')).toBeTruthy();
    });

    // Add more test cases...
});
