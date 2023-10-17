import renderer from "react-test-renderer";
import ResetPassword from "../../../components/login/ResetPassword"

jest.mock("../../../api/userApi", () => ({
  sendResetPasswordEmail: jest.fn(async ({ email }) => {
    if (email !== "test@test.dk") {
      return Promise.reject({ error: { code: 'E0401' } }); // No user exists with this email!
    } else if (email !== "resend@test.dk") {
      return Promise.reject({ error: { code: 'E0406' } }); // Too many resend attempts!
    } else {
      return Promise.resolve({ data: "Email sent" });
    }
  }),
  validateResetPasswordCode: jest.fn(async ({ email, token }) => {
    if (email !== "test@test.dk" && email !== "expired@test.dk") {
      return Promise.reject({ error: { code: 'E0401' } }); // No user exists with this email!
    } else if (email === "test@test.dk" && token !== "1234") {
      return Promise.reject({ error: { code: 'E0405' } }); // Invalid token!
    } else if (email === "expired@test.dk") {
      return Promise.reject({ error: { code: 'E0404' } }); // Code expired!
    } else {
      return Promise.resolve({ data: "Code validated" });
    }
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
        expect(emailAlert.props.label).not.toBe("");
      });
    });

    it('Error message with too many attempts', async () => {
      const emailInput = resetPassword.root.findByProps({ testId: "emailInput" });
      const resetPasswordButton = resetPassword.root.findByProps({ testId: "resetPasswordButton" });
      const emailAlert = resetPassword.root.findByProps({ testId: "emailAlert" });

      await renderer.act(async () => {
        await emailInput.props.onChangeText("resend@test.dk");
        await resetPasswordButton.props.onPress();
      }).then(() => {
        expect(emailAlert.props.label).not.toBe("");
      });
    });

    it('Error message with invalid token', async () => {
      const emailInput = resetPassword.root.findByProps({ testId: "emailInput" });
      const resetPasswordButton = resetPassword.root.findByProps({ testId: "resetPasswordButton" });

      await renderer.act(async () => {
        await emailInput.props.onChangeText("test@test.dk");
        await resetPasswordButton.props.onPress();

        // initialize after rendering new page, by pressing resetPasswordButton
        const tokenInput = resetPassword.root.findByProps({ testId: "tokenInput" });
        const validateCodeBtn = resetPassword.root.findByProps({ testId: "validateCodeBtn" });
        await tokenInput.props.onChangeText("1337");
        await validateCodeBtn.props.onPress();
      }).then(() => {
        const tokenAlert = resetPassword.root.findByProps({ testId: "tokenAlert" });
        expect(tokenAlert.props.label).not.toBe("");
      })
    });

    it('Error message with expired token', async () => {
      const emailInput = resetPassword.root.findByProps({ testId: "emailInput" });
      const resetPasswordButton = resetPassword.root.findByProps({ testId: "resetPasswordButton" });

      await renderer.act(async () => {
        await emailInput.props.onChangeText("expired@test.dk");
        await resetPasswordButton.props.onPress();

        // initialize after rendering new page, by pressing resetPasswordButton
        const tokenInput = resetPassword.root.findByProps({ testId: "tokenInput" });
        const validateCodeBtn = resetPassword.root.findByProps({ testId: "validateCodeBtn" });
        await tokenInput.props.onChangeText("1337");
        await validateCodeBtn.props.onPress();
      }).then(() => {
        const tokenAlert = resetPassword.root.findByProps({ testId: "tokenAlert" });
        expect(tokenAlert.props.label).not.toBe("");
      })
    });
  });
});
