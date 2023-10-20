/**
 * This file contains the test suite for the CourseCard component.
 * It imports the necessary dependencies and mocks the useNavigation hook from @react-navigation/native.
 * It defines an array of course objects and tests the rendering of the CourseCard component.
 * It also tests the navigation functionality of the CourseCard component.
 * @module CourseCardTest
 */

import React from "react";
import renderer from "react-test-renderer";
import CourseCard from "../../../components/courses/courseCard/CourseCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockDataAsyncStorage } from "../../mockData/mockDataAsyncStorage";

let navigated = false;

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(() => { navigated = true }),
  }),
}));

const mockData = mockDataAsyncStorage();

describe("CourseCard", () => {
  let courseCard;

  /**
   * An array of course objects used for testing CourseCard component.
   * @typedef {Object} Course
   * @property {number} id - The ID of the course.
   * @property {string} title - The title of the course.
   * @property {string} category - The category of the course.
   * @property {string} duration - The duration of the course.
   * @property {string} image - The image of the course.
   */

  /** 
   * An array of course objects.
   * @type {Course[]}
   */

  beforeEach(async () => {
    navigated = false;
    await AsyncStorage.clear();
    courseCard = renderer.create(<CourseCard course={mockData.allCourses} />);
  });

  afterAll(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  /**
   * Tests if the CourseCard component renders correctly.
   */
  it("renders CourseCard correctly", async () => {
    expect(await courseCard.toJSON()).toMatchSnapshot();
  });

  /**
   * Tests if the CourseCard component navigates to the correct section when pressed.
   */
  it('Navigate to section when pressing the course card', async () => {
    /**
     * Finds the button element in the CourseCard component using the testID prop.
     * @param {ReactWrapper} courseCard - The CourseCard component wrapper.
     * @returns {ReactWrapper} - The button element wrapper.
     */
    const button = courseCard.root.findByProps({ testID: 'courseCard' });
    await button.props.onPress();
    expect(navigated).toBe(true);
  });
});
