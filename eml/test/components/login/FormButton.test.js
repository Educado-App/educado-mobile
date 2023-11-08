import renderer from "react-test-renderer";
import React from "react";
import FormButton from "../../../components/login/FormButton";

test("Ensure that the button is rendered correctly", async () => {
  let formButton;
  await renderer.act(() => {
    formButton = renderer.create(<FormButton />);
  })
  let tree = formButton.toJSON();
  expect(tree).toMatchSnapshot();
});