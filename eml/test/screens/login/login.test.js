import React from "react";
import renderer from 'react-test-renderer';
import Login from "../../../screens/login/Login";
import checkLoginToken from "../../../screens/login/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}))

test('Login screen renders', () => {
  const loginScreenTree = renderer.create(<Login />).toJSON();
  expect(loginScreenTree).toMatchSnapshot();
});

test('Check login when invalid token stored', async () => {
  const mockToken = null
  AsyncStorage.setItem(mockToken);
  renderer.create(<Login />);
  expect(useNavigation().navigate).toHaveBeenCalledTimes(0);
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

test('Pressing register new user navigates to the register page', async () => {
  const loginScreen = renderer.create(<Login />);
  const registerNav = loginScreen.root.findByProps({ testId: "registerNav" });
  await renderer.act(() => {
    registerNav.onPress();
  });

});