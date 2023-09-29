import renderer from 'react-test-renderer';
import LoginForm from '../../../components/login/LoginForm';
import { render, fireEvent } from '@testing-library/react-native';


jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}))

jest.mock("../../../api/userApi");

test("Check LoginForm renders correctly", async () => {
  const loginForm = renderer.create(<LoginForm />);
  const tree = loginForm.toJSON();
  expect(tree).toMatchSnapshot();
});


it("should call the login function when the login button is pressed", () => {
  const { getByText, getByPlaceholderText } = render(<LoginForm />);

  // Import the loginUser function from the mocked userApi module
  const loginUser = require("../../../api/userApi").loginUser;

  // Mock the loginUser function to resolve with a dummy response
  loginUser.mockResolvedValue({ accessToken: "dummyToken" });

  // Fill in email and password
  const emailInput = getByPlaceholderText("user@email.com");
  const passwordInput = getByPlaceholderText("Digite sua senha");

  fireEvent.changeText(emailInput, "test@example.com");
  fireEvent.changeText(passwordInput, "password123");

  // Press the login button
  const loginButton = getByText("Entrar");
  fireEvent.press(loginButton);

  // Ensure that the login function was called with the correct arguments
  expect(loginUser).toHaveBeenCalledWith({
    email: "test@example.com",
    password: "password123",
  });
});
