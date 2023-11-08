import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CourseScreen from '../../../screens/courses/CourseScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockDataAsyncStorage } from '../../mockData/mockDataAsyncStorage';

// Mock the useNavigation hook and the navigate function
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    addListener: jest.fn(), // Mock the addListener function as well
  }),
}));

// Mock the StorageService
jest.mock('../../../services/StorageService', () => ({
  getSubCourseList: jest.fn(),
}));

jest.mock('../../../components/general/BaseScreen', () => {
  return jest.fn().mockImplementation(({ children }) => children);
});

// Mock the ToastNotification
jest.mock("../../../components/general/ToastNotification", () => {
  return jest.fn().mockImplementation(({ children }) => children);
});

const mockData = mockDataAsyncStorage();

describe('CourseScreen', () => {
  afterEach(() => {
    AsyncStorage.clear();
  });

  it('renders CourseScreen correctly when there are no courses', async () => {
    // Mock that there are no courses
    require('../../../services/StorageService').getSubCourseList.mockResolvedValue([]);

    const { toJSON } = render(<CourseScreen />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('renders CourseScreen with courses loaded', async () => {

    // Mock that courses are loaded
    require('../../../services/StorageService').getSubCourseList.mockResolvedValue(mockData.allCourses);

    const { toJSON } = render(<CourseScreen />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('navigates to the explorer screen when explore button is pressed', async () => {
    const { getByTestId } = render(<CourseScreen />);
    const exploreButton = getByTestId('exploreButton');

    fireEvent.press(exploreButton);

    expect(mockNavigate).toHaveBeenCalledWith('Explorar');
  });
});
