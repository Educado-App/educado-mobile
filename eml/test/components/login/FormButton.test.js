import renderer from "react-test-renderer";
import FormButton from "../../../components/login/FormButton";

test("Ensure that the button is rendered correctly", () => {
  const formButton = renderer.create(<FormButton />);
  let tree = formButton.toJSON();
  expect(tree).toMatchSnapshot();
});