import React from "react";
import renderer from "react-test-renderer";
import ExerciseScreen from "../../../screens/excercise/ExerciseScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

let excerciseScreen;

describe("ExerciseScreen", () => {
  beforeEach(() => {
    navigated = false;
    AsyncStorage.clear();
    excerciseScreen = renderer.create(<ExerciseScreen />);
  });

  it("renders ExerciseScreen correctly", () => {
    expect(excerciseScreen.toJSON()).toMatchSnapshot();
  });
});
