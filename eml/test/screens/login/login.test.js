import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../../../screens/login/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

let navigated = false;

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(() => { navigated = true; }),
  }),
}));

describe('Login screen', () => {

  let loginScreen;

  beforeEach(async () => {
    navigated = false;
    await AsyncStorage.clear();
    renderer.act(() => {
      loginScreen = renderer.create(<Login />);
    });
  });

  it('Login screen renders', () => {
    expect(loginScreen.toJSON()).toMatchSnapshot();
  });

  it('Pressing register new user navigates to the register page', async () => {
    const registerNav = loginScreen.root.findByProps({ testId: 'registerNav' });
    await renderer.act(() => {
      registerNav.props.onPress();
    });
    expect(navigated).toBe(true);
  });

  it('Check login when no valid token is stored', async () => {
    await renderer.act(() => {
      renderer.create(<Login />);
    });
    expect(navigated).toBe(false);
  });

  it('Check login when valid token stored', async () => {
    AsyncStorage.setItem('@loginToken', 'testToken');
    await renderer.act(() => {
      renderer.create(<Login />);
    });
    expect(navigated).toBe(true);
  });

  it('Check screen is scrollable with keyboard active', async () => {
    const scrollView = loginScreen.root.findByType(KeyboardAwareScrollView);
    expect(scrollView.props.scrollEnabled).toBeTruthy();
  });
});

/* TODO: Fix tests with AsyncStorage */ /*
test('Check login when valid token stored', async () => {
  const mockToken = "testToken";
  AsyncStorage.setItem("@loginToken", mockToken).then(async () => {
    await AsyncStorage.getItem("@loginToken");
    renderer.create(<Login />);
    expect(useNavigation().navigate).toHaveBeenCalledTimes(1);
  });
  
})*/