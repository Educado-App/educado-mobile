import renderer from "react-test-renderer";
import RegisterForm from "../../../components/login/RegisterForm";

let registerForm;

beforeEach(() => {
  registerForm = renderer.create(<RegisterForm />);
});

test("Ensure that the RegisterForm component renders correctly", () => {
  const tree = registerForm.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Check that password visibility is toggled correctly", async () => {
  const passwordEye = registerForm.root.findByProps({ testId: "passwordEye" });
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

test("Test of email validation", async () => {
  const emailInput = registerForm.root.findByProps({
    testId: "emailInput"
  });
  const emailAlert = registerForm.root.findByProps({
    testId: "emailAlert"
  });

  console.log(emailInput.props.onChangeText(""))
  await renderer.act(() => {
    emailInput.props.onChangeText("letters@letters.end")
  });

  expect(emailAlert.props.label)
    .toBe("");

  renderer.act(() => {
    emailInput.props.onChangeText("invalid email").then(() => {
      expect(emailAlert.props.label)
        .toBe(not(""));
    });
    emailInput.props.onChangeText("slightly@invalid.d").then(() => {
      expect(emailAlert.props.label)
        .toBe(not(""));
    });
    emailInput.props.onChangeText("also.invalid.com").then(() => {
      expect(emailAlert.props.label)
        .toBe(not(""));
    });
    emailInput.props.onChangeText("").then(() => {
      expect(emailAlert.props.label)
        .toBe(not(""));
    });
  });
});

test("Check that confirm password visibility is toggled correctly", async () => {
  const registerForm = renderer.create(<RegisterForm />);
  expect(registerForm.root.findByProps({ testId: "confirmPasswordEye" })
    .props.showPasswordIcon).toBe(false);
  await renderer.act(() => {
    registerForm.root.findByProps({ testId: "confirmPasswordEye" })
      .props.toggleShowPassword();
  })
  expect(registerForm.root.findByProps({ testId: "confirmPasswordEye" })
    .props.showPasswordIcon).toBe(true);
  await renderer.act(() => {
    registerForm.root.findByProps({ testId: "confirmPasswordEye" })
      .props.toggleShowPassword();
  })
  expect(registerForm.root.findByProps({ testId: "confirmPasswordEye" })
    .props.showPasswordIcon).toBe(false);
});

function testPasswordValidation() {
  registerForm = renderer.create(<RegisterForm />);
  const passwordInput = registerForm.root.findByProps({
    testId: "passwordInput"
  });
  const passwordLengthAlert = registerForm.root.findByProps({
    testId: "passwordLengthAlert"
  });

  const passwordLetterAlert = registerForm.root.findByProps({
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

  test("Test password length validation", async () => {
    renderer.act(() => {
      changePassword("12345678a").then(() => {
        expectClass(passwordLengthAlert, "text-xs font-montserrat text-gray");
      });
    });

    renderer.act(() => {
      changePassword("1278a").then(() => {
        expectClass(passwordLengthAlert, "text-xs font-montserrat text-error");
      });
    });
  });
  test("Test password letter inclusion validation", () => {
    renderer.act(() => {
      changePassword("testPassword").then(() => {
        expectClass(passwordLetterAlert, "text-xs font-montserrat text-gray");
      });
    });

    renderer.act(() => {
      changePassword("12783290189").then(() => {
        expectClass(passwordLengthAlert, "text-xs font-montserrat text-error");
      });
    });
  });
}

test("Test password letter inclusion validation", () => {
  const passwordInput = registerForm.root.findByProps({
    testId: "passwordInput"
  });
  const passwordLetterAlert = registerForm.root.findByProps({
    testId: "passwordLetterAlert"
  });

});

test("Test that the password input works correctly", async () => {
  const passwordInput = registerForm.root.findByProps({
    testId: "passwordInput"
  });
  renderer.act(() => {
    passwordInput.props.onChangeText("12345678a").then(() => {
      expect(passwordInput.props.value)
        .toBe("12345678a");
    });
  })
});

testPasswordValidation();