/**
 * This file contains the test suite for the CourseScreen component.
 * It imports the necessary dependencies and mocks the useNavigation hook from react-navigation/native.
 * The test suite includes three test cases:
 * 1. Test case to check if the CourseScreen component renders correctly when there are no courses.
 * 2. Test case to check if the CourseScreen component renders correctly when courses are loaded.
 * 3. Test case to check if the CourseScreen component navigates to the explorer screen when the explore button is pressed.
 */
import React from "react";
import renderer from "react-test-renderer";
import CourseScreen from "../../../screens/courses/CourseScreen";
import CourseCard from "../../../components/courses/courseCard/CourseCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

let navigated = false;
let mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
};

// Mocking the useNavigation hook from react-navigation/native
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    mockNavigation,
    navigate: jest.fn(() => { navigated = true }),
  }),
}));

/**
 * Test suite for the CourseScreen component.
 */
describe("CourseScreen", () => {
  let courseScreen;

  beforeEach(() => {
    navigated = false;
    AsyncStorage.clear();
    courseScreen = renderer.create(<CourseScreen />);
  });

  afterAll(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  /**
   * Test case to check if the CourseScreen component renders correctly when there are no courses.
   */
  it("renders CourseScreen correctly when theres no courses", async () => {
    expect(await courseScreen.toJSON()).toMatchSnapshot();
  });

  /**
   * Test case to check if the CourseScreen component renders correctly when courses are loaded.
   */
  it("renders CourseScreen with courses loaded", async () => {
    /**
     * Array of courses used for testing CourseScreen component.
     * @type {Array<Object>}
     */
    const courses = [
      {
        id: 1,
        title: "Course 1",
        category: "Category 1",
        duration: "Duration for course 1",
        image: "",
      },
      {
        id: 2,
        title: "Course 2",
        category: "Category 2",
        duration: "Duration for course 2",
        image: "",
      },
    ];
    const StorageService = require("../../../services/StorageService");
    jest.spyOn(StorageService, "getSubCourseList").mockResolvedValue(courses);

    await renderer.act(async () => {
      return courseScreen = renderer.create(<CourseScreen />);
    });

    expect(await courseScreen.toJSON()).toMatchSnapshot();
    expect(await courseScreen.root.findAllByType(CourseCard)).toHaveLength(2);
  });

  /**
   * Test case to check if the CourseScreen component navigates to the explorer screen when the explore button is pressed.
   */
  it('Navigate to explorer when pressing the explore button', async () => {
    const button = await courseScreen.root.findByProps({ testID: 'exploreButton' });
    button.props.onPress();
    expect(navigated).toBe(true);
  });
});