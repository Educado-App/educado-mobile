import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from '../../../screens/welcome/Welcome';
import { renderHook } from '@testing-library/react-hooks';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWelcomeScreenLogic } from "../../../App"; // Update the import path as needed

let navigated = false;

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
      navigate: jest.fn(() => { navigated = true }),
    }),
  }));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: jest.fn(),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(),
}));

let welcomeScreen;

beforeEach(() => {
  navigated = false;
  AsyncStorage.clear();
  welcomeScreen = renderer.create(<WelcomeScreen />);
});


afterEach(() => {
  welcomeScreen.unmount();
});

describe('WelcomeScreen', () => {
  it('renders welcomeScreen correctly', () => {
    expect(welcomeScreen.toJSON()).toMatchSnapshot();
  });

  it('should set initialRoute to LoginStack when hasShownWelcome is true', async () => {
    // Mock AsyncStorage getItem to return 'true'
    jest.spyOn(AsyncStorage, 'getItem').mockResolvedValueOnce('true');

    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => useWelcomeScreenLogic(1));

    // Wait for the async operations to complete
    await waitForNextUpdate();

    // Verify the expected state values
    expect(result.current.initialRoute).toBe('LoginStack');
    expect(result.current.isLoading).toBe(false);
  });


  it('should set initialRoute to WelcomeStack when hasShownWelcome is false', async () => {
    // Mock AsyncStorage getItem to return 'false' or undefined (not set)
    jest.spyOn(AsyncStorage, 'getItem').mockResolvedValueOnce(false);

    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() => useWelcomeScreenLogic(1));

    // Wait for the async operations to complete
    await waitForNextUpdate();

    // Verify the expected state values
    expect(result.current.initialRoute).toBe('WelcomeStack');
    expect(result.current.isLoading).toBe(false);
  });
});