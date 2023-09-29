import renderer from 'react-test-renderer';
import EnterNewPasswordLayout from "../../../components/login/EnterNewPasswordScreen";

test("Enter new password screen renders correctly", () => {
  const newPasswordLayout = renderer.create(<EnterNewPasswordLayout />);
  
  const tree = newPasswordLayout.toJSON();
  expect(tree).toMatchSnapshot();
});

test("toggleShowPassword toggles password visibility correctly", async () => {
  const newPasswordLayout = renderer.create(<EnterNewPasswordLayout />);
  const textField = newPasswordLayout.root.findByProps({ label: "Nova senha" });
  const button = newPasswordLayout.root.findByProps({ id: "showPasswordEye" });

  expect(textField.props.secureTextEntry).toBeTruthy();
  renderer.act(() => {
    button.props.toggleShowPassword();
  });
  expect(textField.props.secureTextEntry).toBeFalsy();
});