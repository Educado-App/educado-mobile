import React from "react";
import renderer from 'react-test-renderer';
import SubscriptionCancel from "../../../components/section/CancelSubscriptionButton";

describe('<SubscriptionCancel />', () => {

let pressed = false;

const mockOnPress = () => {
  pressed = true;
};

let subscriptionCancel;

beforeEach(() => {
  pressed = false;
  subscriptionCancel = renderer.create(<SubscriptionCancel onPress={mockOnPress} />);
});

afterAll(() => {
  jest.resetModules();
  jest.restoreAllMocks();
});

it('SubscriptionCancel button renders', () => {
  expect(subscriptionCancel.toJSON()).toMatchSnapshot();
});

it('Pressing SubscriptionCancel button calls onPress function', async () => {
  const subscriptionCancelButton = subscriptionCancel.root.findByProps({ testID: "subscriptionCancelButton" });
  await renderer.act(() => {
    return subscriptionCancelButton.props.onPress();
  });
  expect(pressed).toBe(true);
});
});