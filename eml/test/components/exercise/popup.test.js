import React from 'react';
import renderer from 'react-test-renderer';
import PopUp from '../../../components/gamification/PopUp';
import { generateSuccessPhrases, generateEncouragementPhrases } from '../../../constants/PopUpPhrases';

beforeEach(() => {
  jest.useFakeTimers();
});

const colors = {
  correctAnswer: '#00897B',
  wrongAnswer: '#CF6679', 
};

const renderPopUp = (correct, phrase) => {
  if (correct) {
    return renderer.create(
      <PopUp randomPhrase={phrase} xpAmount={100} isCorrectAnswer={true} />
    );
  } else {
    return renderer.create(
      <PopUp randomPhrase={phrase} xpAmount={0} isCorrectAnswer={false} />
    );
  }
};

describe('PopUp', () => {
  it('renders PopUp correctly for correct answer', () => {
    const popUp = renderPopUp(true, 'Test Phrase');
    expect(popUp.toJSON()).toMatchSnapshot();
  });

  it('renders PopUp correctly for incorrect answer', () => {
    const incorrectPopUp = renderPopUp(false, 'Test Phrase');
    expect(incorrectPopUp.toJSON()).toMatchSnapshot();
  });

  it('answered correct phrase', () => {
    const dummyName = 'Carlos';
    const successPhrases = generateSuccessPhrases(dummyName);
    const randomPhrase = successPhrases[Math.floor(Math.random() * successPhrases.length)];

    const popUp = renderPopUp(true, randomPhrase);

    const popUpPhrase = popUp.root.findByProps({ testID: 'Phrase' });
    expect(popUpPhrase.props.children).toBe(randomPhrase);
  });

  it('answered wrong phrase', () => {
    const dummyName = 'Carlos';
    const EncouragementPhrases = generateEncouragementPhrases(dummyName);
    const randomPhrase = EncouragementPhrases[Math.floor(Math.random() * EncouragementPhrases.length)];

    const popUp = renderPopUp(true, randomPhrase);

    const popUpPhrase = popUp.root.findByProps({ testID: 'Phrase' });
    expect(popUpPhrase.props.children).toBe(randomPhrase);
  });

});
