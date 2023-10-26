import React from 'react';
import { render } from '@testing-library/react-native';
import VideoLectureScreen from '../../../screens/lectures/VideoLectureScreen';
import { useNavigation } from '@react-navigation/native';


// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

// Mock CustomExpoVideoPlayer
jest.mock('../../../components/lectures/VideoPlayer', () => {
    return {
        __esModule: true,
        default: jest.fn().mockReturnValue(null),
    };
});

describe('VideoLectureScreen', () => {
    it('displays the correct course and lecture title', () => {
        // Setup mock
        useNavigation.mockReturnValue({ goBack: jest.fn() });

        const { getByText } = render(<VideoLectureScreen lecture={{ title: 'Test Lecture' }} course={{ title: 'Test Course' }} />);
        expect(getByText('Course Name: Test Course')).toBeTruthy();
        expect(getByText('Test Lecture')).toBeTruthy();
    });
});


