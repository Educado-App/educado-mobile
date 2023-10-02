import renderer from 'react-test-renderer';
import LoginForm from '../../../components/login/LoginForm';

let loginForm;

beforeEach(() => {
  loginForm = renderer.create(<LoginForm />);
});

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}))

jest.mock("../../../api/userApi", () => ({
  loginUser: jest.fn(async ({ email, password }) => {
    if (email === "is@user.com" && password === "password123") {
      return Promise.resolve({ test: "token" });
    } else if (email !== "is@user.com") {
      return Promise.reject({ response: { status: 404 } });

    } else if (password !== "password123") {
      return Promise.reject({ response: { status: 401 } });
    }
  })
}));

test("Check LoginForm renders correctly", async () => {
  const loginForm = renderer.create(<LoginForm />);
  const tree = loginForm.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Login function when the login button is pressed", async () => {

  // Import the loginUser function from the mocked userApi module
  const loginUser = require("../../../api/userApi").loginUser;

  // Mock the loginUser function to resolve with a dummy response
  //loginUser.mockResolvedValue({ accessToken: "dummyToken" });


  const emailInput = loginForm.root.findByProps({ testId: "emailInput" });
  const passwordInput = loginForm.root.findByProps({ testId: "passwordInput" });
  const loginButton = loginForm.root.findByProps({ testId: "loginButton" });

  // Fill in email and password and press the login button
  await renderer.act(() => {
    emailInput.props.onChangeText("test@example.com");
    passwordInput.props.onChangeText("password123")
  });

  renderer.act(() => {
    loginButton.props.onPress();
  });

  // Ensure login api function was called with the correct arguments
  expect(loginUser).toHaveBeenCalledWith({
    email: "test@example.com",
    password: "password123",
  });
});

test("Test email alert", async () => {
  const emailInput = loginForm.root.findByProps({ testId: "emailInput" });
  const emailAlert = loginForm.root.findByProps({ testId: "emailAlert" });
  const loginButton = loginForm.root.findByProps({ testId: "loginButton" });

  await renderer.act(() => {
    emailInput.props.onChangeText("not@user.com");
  });
  await renderer.act(() => {
    loginButton.props.onPress();
  });

  expect(emailAlert.props.label)
      .not.toBe((""));
});



test("Test password alert", async () => {
  const passwordInput = loginForm.root.findByProps({ testId: "passwordInput" });
  const passwordAlert = loginForm.root.findByProps({ testId: "passwordAlert" });
  const loginButton = loginForm.root.findByProps({ testId: "loginButton" });

  await renderer.act(() => {
    emailInput.props.onChangeText("not@user.com");
  });
  await renderer.act(() => {
    loginButton.props.onPress();
  });

  expect(emailAlert.props.label)
      .not.toBe((""));
});

test("Check that password visibility is toggled correctly", async () => {
  const passwordEye = loginForm.root.findByProps({ testId: "passwordEye" });
  expect(passwordEye.props.showPasswordIcon).toBe(false);
  await renderer.act(() => {
    passwordEye.props.toggleShowPassword();
  })
  expect(passwordEye.props.showPasswordIcon).toBe(true);
  await renderer.act(() => {
    passwordEye.props.toggleShowPassword();
  })
  expect(passwordEye.props.showPasswordIcon).toBe(false);
});
