import renderer from "react-test-renderer";
import LogoBackButton from "../../../components/login/LogoBackButton";
import { useNavigation } from "@react-navigation/native";
import { fireEvent, render, screen } from "@testing-library/react-native";

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}))

test("Ensure that the field is rendered correctly without props", () => {
  const logoBackButton = renderer.create(<LogoBackButton />);
  let tree = logoBackButton.toJSON();
  expect(tree).toMatchSnapshot();
});
