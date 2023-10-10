import React, { useState } from 'react';
import { View, Text, Image, Pressable, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppLoading } from 'expo-app-loading';
import CourseProgress from '../../../components/progress/CourseProgress';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CourseCard from '../../../components/courses/courseCard/CourseCard'; // Import your component
import { render, fireEvent } from '@testing-library/react-native';

// Mocking the dependencies like useNavigation and useFonts
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('@expo-google-fonts/dev', () => ({
  useFonts: () => [true, null],
}));

describe('CourseCard', () => {
  const course = {
    title: 'Test Course',
    category: 'Test Category',
    duration: '1 hour',
    courseId: 1,
  };

  it('renders course card with provided data', () => {
    const { getByText, getByTestId } = render(<CourseCard course={course} />);
    
    expect(getByText(course.title)).toBeInTheDocument();
    expect(getByText(course.category)).toBeInTheDocument();
    expect(getByText(course.duration)).toBeInTheDocument();
    expect(getByTestId('play-button')).toBeInTheDocument();
  });

  it('navigates to the section when play button is pressed', () => {
    const { getByTestId } = render(<CourseCard course={course} />);
    const playButton = getByTestId('play-button');
    
    fireEvent.press(playButton);
    
    // Check if the navigate function was called with the correct arguments
    expect(navigate).toHaveBeenCalledWith('Section', { courseId: course.courseId });
  });
});
