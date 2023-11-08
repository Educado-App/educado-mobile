import renderer from 'react-test-renderer';
import React from 'react';
import LogoBackButton from '../../../components/login/LogoBackButton';
import { useNavigation } from '@react-navigation/native';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

test('Ensure that the field is rendered correctly without props', async () => {
  let logoBackButton;
  await renderer.act(() => {
    logoBackButton = renderer.create(<LogoBackButton />);
  });
  let tree = logoBackButton.toJSON();
  expect(tree).toMatchSnapshot();
});
