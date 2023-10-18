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

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    mockNavigation,
    navigate: jest.fn (() => {navigated = true}),
  }),
}));

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

it("renders CourseScreen correctly when theres no courses", () => {
  expect(courseScreen.toJSON()).toMatchSnapshot();
});

it("renders CourseScreen with courses loaded", async () => {
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

  expect(courseScreen.toJSON()).toMatchSnapshot();
  expect(courseScreen.root.findAllByType(CourseCard)).toHaveLength(2);
});

it('Navigate to explorer when pressing the explore button', () => { 
  const button = courseScreen.root.findByProps({testID: 'exploreButton'});
  button.props.onPress();
  expect(navigated).toBe(true);
});
});