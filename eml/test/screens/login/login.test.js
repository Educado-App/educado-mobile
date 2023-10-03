import React from "react";
import renderer from 'react-test-renderer';
import Login from "../../../screens/login/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";

let navigated = false;

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(() => { navigated = true }),
  }),
}))

let loginScreen;

beforeEach(() => {
  navigated = false;
  AsyncStorage.clear();
  loginScreen = renderer.create(<Login />);
});

test('Login screen renders', () => {
  expect(loginScreen.toJSON()).toMatchSnapshot();
});

test('Pressing register new user navigates to the register page', async () => {
  const registerNav = loginScreen.root.findByProps({ testId: "registerNav" });
  await renderer.act(() => {
    registerNav.props.onPress();
  });
  expect(navigated).toBe(true);
});

test('Check login when no valid token is stored', async () => {
  await renderer.act(() => {
    renderer.create(<Login />);
  });
  expect(navigated).toBe(false);
})

test('Check login when valid token stored', async () => {
  AsyncStorage.setItem("@loginToken", "testToken");
  await renderer.act(() => {
    renderer.create(<Login />);
  });
  expect(navigated).toBe(true);
})

/* TODO: Fix tests with AsyncStorage */ /*
test('Check login when valid token stored', async () => {
  const mockToken = "testToken";
  AsyncStorage.setItem("@loginToken", mockToken).then(async () => {
    await AsyncStorage.getItem("@loginToken");
    renderer.create(<Login />);
    expect(useNavigation().navigate).toHaveBeenCalledTimes(1);
  });
  
})*/