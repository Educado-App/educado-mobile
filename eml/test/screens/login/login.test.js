import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../../../screens/login/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

let navigated = false;

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(() => {
      navigated = true;
    }),
  }),
}));

// Mock StorageService functions used in Login component
jest.mock('../../../services/StorageService', () => ({
  isLoginTokenValid: jest.fn(() => Promise.resolve(false)), // Mocking token validity check
  updateStoredCourses: jest.fn(), // Mocking function calls
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
    await renderer.act(async () => {
      await registerNav.props.onPress();
    });
    expect(navigated).toBe(true);
  });

  it('Check screen is scrollable with keyboard active', async () => {
    const scrollView = loginScreen.root.findByType(KeyboardAwareScrollView);
    expect(scrollView.props.scrollEnabled).toBeTruthy();
  });

  it('Check login when no valid token is stored', async () => {
    // Here, modify the test case to reflect the new behavior
    expect(await AsyncStorage.getItem('@loginToken')).toBeNull();
    expect(navigated).toBe(false);
  });
});
