import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import NavBar from './NavBar';
import { waitFor } from '@testing-library/react-native';


describe('NavBar', () => {
  it('renders the navigation bar', () => {
    const { debug } = render(
      <NavigationContainer>
        <NavBar />
      </NavigationContainer>
    );

    // Log the rendered output to the console
    debug();
  });


  it('renders the home screen by default', () => {
    const { getByText } = render(
      <NavigationContainer>
        <NavBar />
      </NavigationContainer>
    );
    const homeScreen = getByText('Central');
    expect(homeScreen).toBeTruthy();
  });

  it('renders the explore screen', () => {
    const { getByText } = render(
      <NavigationContainer>
        <NavBar />
      </NavigationContainer>
    );
    const exploreScreen = getByText('Explorar');
    expect(exploreScreen).toBeTruthy();
  });
});
