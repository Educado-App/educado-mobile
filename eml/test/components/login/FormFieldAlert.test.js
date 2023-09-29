import renderer from "react-test-renderer";
import FormFieldAlert from "../../../components/login/FormFieldAlert";

test("Ensure that the alert is rendered correctly", () => {
  const formAlert = renderer.create(<FormFieldAlert />);
  let tree = formAlert.toJSON();
  expect(tree).toMatchSnapshot();
});