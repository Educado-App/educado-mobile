import renderer from "react-test-renderer";
import ResetPassword from "../../../components/login/ResetPassword"

test("Ensure that the reset password page is rendered correctly when not visible", async () => {
  let resetPassword;
  await renderer.act(() => {
    resetPassword = renderer.create(<ResetPassword modalVisible={false} onModalClose={() => {}} />);
  })
  let tree = resetPassword.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Ensure that the reset password page is rendered correctly when visible", async () => {
  let resetPassword;
  await renderer.act(() => {
    resetPassword = renderer.create(<ResetPassword modalVisible={true} onModalClose={() => {}} />);
  })
  let tree = resetPassword.toJSON();
  expect(tree).toMatchSnapshot();
});