import React from "react";
import renderer from "react-test-renderer";
import LeaveButton from "../../../components/exercise/LeaveButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

let navigated = false;

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(() => {
      navigated = true;
    }),
  }),
  useRoute: () => ({
    params: {}, // Add any route parameters your component relies on
  }),
}));

let LeaveButtonScreen;

beforeEach(() => {
  navigated = false;
  AsyncStorage.clear();
  LeaveButtonScreen = renderer.create(<LeaveButton />);
});

describe("LeaveButton", () => {
  it("renders LeaveButton correctly", () => {
    expect(LeaveButtonScreen.toJSON()).toMatchSnapshot();
  });
});
