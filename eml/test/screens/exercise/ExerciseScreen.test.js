import React from "react";
import renderer from "react-test-renderer";
import ExerciseScreen from "../../../screens/excercise/ExerciseScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { act } from "react-test-renderer"; // Import act for async testing

let navigated = false;

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(() => {
      navigated = true;
    }),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

// Mock your asynchronous functions here
jest.mock("../../../api/api", () => ({
  getExercise: jest.fn().mockResolvedValue("65181a4f4c78b45368126ed7"),
  getSection: jest.fn().mockResolvedValue({
    exercises: ["65181a4f4c78b45368126ed7", "6527e20b5897d93ea8914010"],
    components: [],
    _id: "6526528fc808771dd861fbec",
    parentCourse: "651e987f8999e62500457097",
    title: "Test X",
    description: "Hello",
    dateCreated: "2023-10-11T07:45:19.135Z",
    dateUpdated: "2023-10-11T07:45:19.135Z",
    __v: 37,
    lectures: [],
    createdAt: "2023-10-19T10:54:26.299Z",
    modifiedAt: "2023-10-19T10:54:26.299Z",
  }),
  getCourse: jest.fn().mockResolvedValue({
    rating: 2,
    status: "draft",
    numOfSubscriptions: 0,
    sections: [
      "651e99608999e625004570a8",
      "6526528fc808771dd861fbec",
      "6527f7da1877373c3c653dc8",
    ],
    _id: "651e987f8999e62500457097",
    title: "VirtualTurtor Group",
    category: "Finanças pessoais",
    level: "Iniciante",
    description: "Silke var her",
    dateCreated: "2023-10-05T11:05:35.251Z",
    dateUpdated: "2023-10-05T11:05:35.251Z",
    __v: 11,
    published: false,
    estimatedHours: 1,
  }),
}));

describe("ExerciseScreen", () => {
  beforeEach(() => {
    navigated = false;
    AsyncStorage.clear();
  });

  it("renders ExerciseScreen correctly", async () => {
    let tree;

    // Wrap the rendering inside act for async testing
    await act(async () => {
      tree = renderer.create(<ExerciseScreen />);
    });

    // Use toTree to get the rendered tree
    expect(tree.toTree()).toMatchSnapshot();
  });
});
