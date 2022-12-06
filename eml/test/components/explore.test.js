import React from "react"
import { render, screen } from "@testing-library/react-native"
import Explore from "../../screens/explore/Explore"
import ExerciseScreen from "../../screens/excercise/ExerciseScreen"
import { expect, test } from "@jest/globals"
import { useNavigation } from "@react-navigation/native"
import { useRoute } from "@react-navigation/native"
import sum from "./sum"

import { Animated } from 'react-native';

jest.useRealTimers()
test('Summing two values', () => {
    expect(sum(1, 2)).toBe(3);
})
const mockPlatform = OS => {
    jest.resetModules();
    jest.doMock("react-native/Libraries/Utilities/Platform", () => ({ OS, select: objs => objs[OS] }));
};
it("my test on Android", () => {
    mockPlatform("android");
});
test('Testing if Explore renders', () => {
    render(<Explore />);
    expect(screen.toJSON()).toMatchSnapshot();
});
// mock useNavigate
const mockedUsedNavigate = jest.fn();
const mockedUseRoute = jest.fn();
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => mockedUsedNavigate,
    useRoute: () => mockedUseRoute,
    params: {
        sectionId: '0',
        courseId: '0',
    }
}))

// Does'nt work cause of route.params

// test('Testing if ExerciseScreen renders', () => {
//     render(<ExerciseScreen sectionId={0} />);
//     expect(screen.toJSON()).toMatchSnapshot();
// });
