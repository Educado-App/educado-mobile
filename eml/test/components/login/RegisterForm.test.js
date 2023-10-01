import renderer from "react-test-renderer";
import RegisterForm from "../../../components/login/RegisterForm";

test("Ensure that the RegisterForm component renders correctly", () => {
  const tree = renderer.create(<RegisterForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Check that password visibility is toggled correctly", () => {
  const registerForm = renderer.create(<RegisterForm />);
  
  expect(registerForm.toJSON()).toMatchSnapshot();
  registerForm.root.findByProps({ testId: "passwordEye" }).props.toggleShowPassword();
  expect(registerForm.toJSON()).toMatchSnapshot();
});