import React from 'react';
import renderer from 'react-test-renderer';
import EnterNewPasswordScreen from "../../../components/login/EnterNewPasswordScreen";

jest.mock("../../../api/userApi", () => ({
  enterNewPassword: jest.fn(async ({ email, token }) => {
    if (email !== "test@test.dk") {
      return Promise.reject({ error: { code: 'E0401' } }); // No user exists with this email!
    } else if (email === "test@test.dk" && token !== "1234") {
      return Promise.reject({ error: { code: 'E0405' } }); // Invalid token!
    } else if (email === "expired@test.dk") {
      return Promise.reject({ error: { code: 'E0404' } }); // Code expired!
    } else {
      return Promise.resolve({ data: "Password changed" });
    }
  }),
}));


let newPasswordScreen;

beforeEach(async () => {
  await renderer.act(() => {
    newPasswordScreen = renderer.create(<EnterNewPasswordScreen />);
  });
});

describe("EnterNewPasswordScreen", () => {

  describe("Enter new password screen renders correctly", () => {
    it("Enter new password screen renders correctly", async () => {
      const tree = newPasswordScreen.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("Password fields", () => {
    newPasswordScreen = renderer.create(<EnterNewPasswordScreen />);
    const passwordInput = newPasswordScreen.root.findByProps({
      testId: "passwordInput"
    });
    const passwordLengthAlert = newPasswordScreen.root.findByProps({
      testId: "passwordLengthAlert"
    });

    const passwordLetterAlert = newPasswordScreen.root.findByProps({
      testId: "passwordLetterAlert"
    });

    const changePassword = async (password) => {
      await renderer.act(() => {
        passwordInput.props.onChangeText(password);
      });
    }

    const expectClass = (element, className) => {
      expect(element.props.className).toBe(className);
    }

    it("Test password length validation", async () => {
      await renderer.act(() => {
        changePassword("12345678a").then(() => {
          expectClass(passwordLengthAlert, "text-xs font-montserrat text-gray");
        });
      });

      await renderer.act(() => {
        changePassword("1278a").then(() => {
          expectClass(passwordLengthAlert, "text-xs font-montserrat text-error");
        });
      });
    });

    it("Test password letter inclusion validation", async () => {
      await renderer.act(() => {
        changePassword("testPassword").then(() => {
          expectClass(passwordLetterAlert, "text-xs font-montserrat text-gray");
        });
      });

      await renderer.act(() => {
        changePassword("12783290189").then(() => {
          expectClass(passwordLengthAlert, "text-xs font-montserrat text-error");
        });
      });
    });

    it("toggleShowPassword toggles password visibility correctly", async () => {
      const textField = newPasswordScreen.root.findByProps({ label: "Nova senha" });
      const button = newPasswordScreen.root.findByProps({ id: "showPasswordEye" });

      expect(textField.props.secureTextEntry).toBeTruthy();
      await renderer.act(() => {
        button.props.toggleShowPassword();
      });
      expect(textField.props.secureTextEntry).toBeFalsy();
    });

    it("Test that the password input works correctly", async () => {
      const passwordInput = newPasswordScreen.root.findByProps({
        testId: "passwordInput"
      });

      const confirmPasswordInput = newPasswordScreen.root.findByProps({
        testId: "confirmPasswordInput"
      });
      renderer.act(() => {
        passwordInput.props.onChangeText("12345678a")
        confirmPasswordInput.props.onChangeText("12345678a")
      }).then(() => {
        expect(passwordInput.props.value).toBe("12345678a");
        expect(confirmPasswordInput.props.value).toBe("12345678a");
      });
    });

    it("Check that reset password button is disabled when password and confirm password is not the same", async () => {
      // Test that the register button is disabled when the password and confirm password fields are not equal
      const passwordInput = newPasswordScreen.root.findByProps({
        testId: "passwordInput"
      });
      const confirmPasswordInput = newPasswordScreen.root.findByProps({
        testId: "confirmPasswordInput"
      });

      const resetPasswordButton = newPasswordScreen.root.findByProps({
        testId: "resetPasswordButton"
      });

      await renderer.act(() => {
        passwordInput.props.onChangeText("testing123");
        confirmPasswordInput.props.onChangeText("not the same password");
      }).then(() => {
        expect(resetPasswordButton.props.disabled).toBe(true);
      });
    });

    it("Password fields filters out emojis", async () => {
      const passwordInput = newPasswordScreen.root.findByProps({ testId: "passwordInput" });
      const confirmPasswordInput = newPasswordScreen.root.findByProps({ testId: "confirmPasswordInput" });

      // reset text value before test
      await renderer.act(() => {
        passwordInput.props.onChangeText("");
        confirmPasswordInput.props.onChangeText("");
      });

      await renderer.act(() => {
        passwordInput.props.onChangeText("testing123");
        confirmPasswordInput.props.onChangeText("testing123");
      });
      expect(passwordInput.props.value).toBe("testing123");
      expect(confirmPasswordInput.props.value).toBe("testing123");

      await renderer.act(() => {
        passwordInput.props.onChangeText("testing123🤔");
        confirmPasswordInput.props.onChangeText("testing123🤔");
      });
      expect(passwordInput.props.value).toBe("testing123");
      expect(confirmPasswordInput.props.value).toBe("testing123");
    });
  });
});


