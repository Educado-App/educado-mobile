import React from 'react';
import { render } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import LectureScreen from '../../../screens/lectures/LectureScreen';
import { waitFor } from '@testing-library/react-native';
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
});


describe('LectureScreen', () => {
    it("renders LectureScreen correctly when there are no lecture", async () => {
        const route = {
            params: {
                lectureId: 'mockLectureId',
                courseId: 'mockCourseId'
            }
        };
        // Mock that there are no courses
        const { toJSON } = render(<LectureScreen route={route} />);
        await waitFor(() => {
            expect(toJSON()).toMatchSnapshot();
        });
    });
    
    it("renders CourseScreen with courses loaded", async () => {
          const route = {
              params: {
                  lectureId: 'mockLectureId',
                  courseId: 'mockCourseId'
              }
          };
    
    
        const { toJSON } = render(<LectureScreen route={route}/>);
        await waitFor(() => {
          expect(toJSON()).toMatchSnapshot();
        });
      });
});