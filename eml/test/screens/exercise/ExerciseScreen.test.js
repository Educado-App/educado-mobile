import React from "react";
import renderer from "react-test-renderer";
import ExerciseScreen from "../../../screens/excercise/ExerciseScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { act } from "react-test-renderer";
import { Alert } from "react-native";
import { exerciseScreenMock } from "../../mockData/exerciseScreenMock";

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

describe("ExerciseScreen", () => {
  beforeEach(() => {
    navigated = false;
    AsyncStorage.clear();
  });

  let exerciseScreen;

  it("renders ExerciseScreen with data loaded", async () => {
    //mockData
    const mockData = exerciseScreenMock();

    const api = require("../../../api/api");
    jest.spyOn(api, "getExerciseByid").mockResolvedValue(mockData.exerciseData);
    jest.spyOn(api, "getSectionByid").mockResolvedValue(mockData.sectionData);
    jest.spyOn(api, "getCourseByid").mockResolvedValue(mockData.courseData);

    await renderer.act(async () => {
      return (exerciseScreen = renderer.create(<ExerciseScreen />));
    });

    await new Promise((r) => setTimeout(r, 0));

    // Find the element with the testID "exerciseQuestion"
    // This means that the screen has data, else it would be false
    const exerciseQuestion = exerciseScreen.root.findByProps({
      testID: "exerciseQuestion",
    });

    // Check if the element with testID "radioButton" exists
    expect(exerciseQuestion).toBeTruthy();

    expect(await exerciseScreen.toJSON()).toMatchSnapshot();
  });
});
