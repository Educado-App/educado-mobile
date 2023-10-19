import React from 'react';
import renderer from 'react-test-renderer';
import { XpPopUp } from '../../../components/gamification/PopUp';

let XpPopUpComponent;

beforeEach(() => {
  XpPopUpComponent = renderer.create(
    <XpPopUp randomPhrase="Test Phrase" xpAmount={100} isCorrectAnswer={true} />
  );
});

describe('XpPopUp', () => {
  it('renders XpPopUp correctly for correct answer', () => {
    expect(XpPopUpComponent.toJSON()).toMatchSnapshot();
  });

  it('renders XpPopUp correctly for incorrect answer', () => {
    const IncorrectXpPopUpComponent = renderer.create(
      <XpPopUp randomPhrase="Test Phrase" xpAmount={0} isCorrectAnswer={false} />
    );
    expect(IncorrectXpPopUpComponent.toJSON()).toMatchSnapshot();
  });
});
