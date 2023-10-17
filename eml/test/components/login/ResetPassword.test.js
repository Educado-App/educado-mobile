import renderer from "react-test-renderer";
import ResetPassword from "../../../components/login/ResetPassword"
import { sendResetPasswordEmail, validateResetPasswordCode } from "../../../api/userApi";

jest.mock("../../../api/userApi", () => ({
  sendResetPasswordEmail: jest.fn(async ({ email, attempts }) => {
    if (email !== "test@test.dk") {
      return Promise.reject({ error: { code: 'E0401' } }); // No user exists with this email!
    } else if (attempts > 2) {
      return Promise.reject({ error: { code: 'E0406' } }); // Too many resend attempts!
    } else {
      return Promise.resolve({ data: "Email sent" });
    }
  }),
  validateResetPasswordCode: jest.fn(async ({ email, token }) => {
    if (email !== "test@test.dk" && token !== "1234") {
      return Promise.reject({ error: { code: 'E0401' } }); // No user exists with this email!
    } else if (email === "test@test.dk" && token !== "1234") { }
  }),
}));


jest.mock('react-native-keyboard-aware-scroll-view', () => {
  return {
    KeyboardAwareScrollView: jest.fn().mockImplementation(({ children }) => children),
  };
});

describe("ResetPassword", () => {

  describe("Test modal open and close", () => {

    let resetPassword;

    it("Ensure that the reset password page is rendered correctly when not visible", async () => {
      await renderer.act(() => {
        resetPassword = renderer.create(<ResetPassword modalVisible={false} onModalClose={() => { }} />);
      })
      let tree = resetPassword.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("Ensure that the reset password page is rendered correctly when visible", async () => {
      await renderer.act(() => {
        resetPassword = renderer.create(<ResetPassword modalVisible={true} onModalClose={() => { }} />);
      })
      let tree = resetPassword.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("Test errors and validation", () => {

    let resetPassword;

    beforeEach(async () => {
      await renderer.act(async () => {
        resetPassword = renderer.create(<ResetPassword />);
      });
    });

    afterEach(() => {
      resetPassword = null;
    });

    it('Error if email does not exist', async () => {
      const emailInput = resetPassword.root.findByProps({ testId: "emailInput" });
      const resetPasswordButton = resetPassword.root.findByProps({ testId: "resetPasswordButton" });
      const emailAlert = resetPassword.root.findByProps({ testId: "emailAlert" });

      await renderer.act(async () => {
        await emailInput.props.onChangeText("test@test.com");
        await resetPasswordButton.props.onPress();
      }).then(() => {
        expect(emailAlert.props.label).toBeDefined();
      });
    });

    it('Error message with too many attempts', async () => {
      attempts = 3; // Set attempts to 3 to trigger error
      const emailInput = resetPassword.root.findByProps({ testId: "emailInput" });
      const resetPasswordButton = resetPassword.root.findByProps({ testId: "resetPasswordButton" });
      const emailAlert = resetPassword.root.findByProps({ testId: "emailAlert" });

      await renderer.act(async () => {
        await emailInput.props.onChangeText("test@test.dk");
        await resetPasswordButton.props.onPress();
      }).then(() => {
        expect(emailAlert.props.label).toBeDefined();
      });
    });

    it('')
  })
});
