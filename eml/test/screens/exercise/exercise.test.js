import React from 'react';
import renderer from 'react-test-renderer';
import ExerciseScreen from '../../../screens/excercise/ExerciseScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";

let navigated = false;

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
      navigate: jest.fn(() => { navigated = true }),
    }),
    useRoute: () => ({
      params: {}, // Add any route parameters your component relies on
    }),
  }));

let excerciseScreen;

beforeEach(() => {
  navigated = false;
  AsyncStorage.clear();
  excerciseScreen = renderer.create(<ExerciseScreen />);
});

describe('ExerciseScreen', () => {
  it('renders ExerciseScreen correctly', () => {
    expect(excerciseScreen.toJSON()).toMatchSnapshot();
  });


//Answer Selection Test: 
//Write a test to simulate the selection of an answer. 
//Check if the `handleAnswerSelect` function updates the `selectedAnswer` state correctly when a radio button is pressed.

//Rendering Exercise Content Test: 
//Ensure that the exercise content, including the question and answer options, is rendered correctly based on the `dummyExerciseData`.


//Review Answer Test: 
//If the "Review answer" feature is important, write tests to simulate the review action and verify the expected behavior when the review button is pressed.

});
