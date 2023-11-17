import React from 'react';
import renderer from 'react-test-renderer';
import Register from '../../../screens/register/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';

let navigated = false;
const mockToken = 'testToken';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(() => { navigated = true; }),
  }),
}));

describe('Register screen', () => {

  let registerScreen;

  beforeEach(() => {
    navigated = false;
    AsyncStorage.clear();
    registerScreen = renderer.create(<Register />);
  });

  it('Login screen renders', () => {
    expect(registerScreen.toJSON()).toMatchSnapshot();
  });

  it('Pressing register new user navigates to the register page', async () => {
    const loginNav = registerScreen.root.findByProps({ testId: 'loginNav' });
    await renderer.act(() => {
      loginNav.props.onPress();
    });
    expect(navigated).toBe(true);
  });


  it('Check register when no valid token is stored', async () => {
    await renderer.act(() => {
      renderer.create(<Register />);
    });
    expect(navigated).toBe(false);
  });


  it('Check register when valid token stored', async () => {
    AsyncStorage.setItem('@loginToken', mockToken).then(async () => {
      await renderer.act(() => {
        renderer.create(<Register />);
      });
      expect(navigated).toBe(true);
    });
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