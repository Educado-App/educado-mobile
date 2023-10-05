import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import CourseScreen from '../../../screens/courses/CourseScreen'; // Adjust the import path

describe('CourseScreen', () => {
  it('should render the loading screen when fonts are not loaded', () => {
    const { getByText } = render(<CourseScreen />);

    const loadingText = getByText('Loading...'); // Replace with your loading text

    expect(loadingText).toBeTruthy();
  });

  it('should render the course cards when fonts are loaded and courses are available', async () => {
    const mockCourseData = [
      // Mock your course data as needed
    ];

    jest.mock('../../../services/StorageService', () => ({
      getSubCourseList: jest.fn(() => mockCourseData),
    }));

    const { getByText } = render(<CourseScreen />);
    await waitFor(() => {
      const courseTitle = getByText('Course Title'); // Replace with your course title
      expect(courseTitle).toBeTruthy();
    });
  });

  it('should navigate to SectionScreen when a course is pressed', async () => {
    const mockCourseData = [
      // Mock your course data as needed
    ];

    jest.mock('../../../services/StorageService', () => ({
      getSubCourseList: jest.fn(() => mockCourseData),
    }));

    const { getByText } = render(<CourseScreen />);
    await waitFor(() => {
      const courseCard = getByText('Course Title'); // Replace with your course title
      fireEvent.press(courseCard);
      // Assert navigation here
    });
  });

  it('should render the empty course list message when fonts are loaded and no courses are available', async () => {
    const mockCourseData = []; // No courses available

    jest.mock('../../../services/StorageService', () => ({
      getSubCourseList: jest.fn(() => mockCourseData),
    }));

    const { getByText } = render(<CourseScreen />);
    await waitFor(() => {
      const emptyMessage = getByText('No courses available'); // Replace with your empty message
      expect(emptyMessage).toBeTruthy();
    });
  });
});