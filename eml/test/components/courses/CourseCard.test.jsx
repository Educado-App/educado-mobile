import React from "react";
import renderer from "react-test-renderer";
import CourseCard from "../../../components/courses/courseCard/CourseCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

let navigated = false;

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
      navigate: jest.fn (() => {navigated = true}),
    }),
  }));
  
    let courseCard;

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

    beforeEach(() => {
        navigated = false;
        AsyncStorage.clear();
        courseCard = renderer.create(<CourseCard course={courses} />);
    });

    afterAll(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    test("renders CourseCard correctly", () => {
        expect(courseCard.toJSON()).toMatchSnapshot();
    });

    test('Navigate to section when pressing the course card', () => { 
        const button = courseCard.root.findByProps({testID: 'courseCard'});
        button.props.onPress();
        expect(navigated).toBe(true);
    });

