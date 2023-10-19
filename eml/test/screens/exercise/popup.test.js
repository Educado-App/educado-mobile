import React from 'react';
import renderer from 'react-test-renderer';
import { PopUp } from '../../../components/gamification/PopUp';

let PopUpComponent;

beforeEach(() => {
  PopUpComponent = renderer.create(
    <PopUp randomPhrase="Test Phrase" xpAmount={100} isCorrectAnswer={true} />
  );
});

describe('PopUp', () => {
  it('renders PopUp correctly for correct answer', () => {
    expect(PopUpComponent.toJSON()).toMatchSnapshot();
  });

  it('renders PopUp correctly for incorrect answer', () => {
    const IncorrectPopUpComponent = renderer.create(
      <PopUp randomPhrase="Test Phrase" xpAmount={0} isCorrectAnswer={false} />
    );
    expect(IncorrectPopUpComponent.toJSON()).toMatchSnapshot();
  });
});
