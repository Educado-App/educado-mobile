import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CourseScreen from './CourseScreen';

describe('CourseScreen', () => {
  it('renders the welcome message', () => {
    const { getByText } = render(<CourseScreen />);
    const welcomeMessage = getByText('Bem Vindo!');
    expect(welcomeMessage).toBeTruthy();
  });

  it('navigates to the section screen when a course is pressed', () => {
    const navigation = { navigate: jest.fn() };
    const { getAllByTestId } = render(<CourseScreen navigation={navigation} />);
    const courseCards = getAllByTestId('course-card');
    fireEvent.press(courseCards[0]);
    expect(navigation.navigate).toHaveBeenCalledWith('Section', { courseId: 'course-1' });
  });
});