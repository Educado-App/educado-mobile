import React from 'react';
import { render } from '@testing-library/react-native';
import ProgressBar from '../../../components/progress/ProgressBar';

describe('<ProgressBar />', () => {
    it('Displays 50% for course type', () => {
        const { getByText } = render(<ProgressBar fracTop={50} fracBot={100} type="course" />);

        // Expect the progress to be 50%
        expect(getByText('50%')).toBeTruthy();
    });

    it('Displays 25% for section type', () => {
        const { getByText } = render(<ProgressBar fracTop={25} fracBot={100} type="section" />);

        // Expect the progress to be 25%
        expect(getByText('25%')).toBeTruthy();
    });

    it('Defaults to course type and displays 75%', () => {
        const { getByText } = render(<ProgressBar fracTop={75} fracBot={100} />);

        // Expect the progress to be 75%
        expect(getByText('75%')).toBeTruthy();
    });

    it('Displays 0% for no progress', () => {
        const { getByText } = render(<ProgressBar fracTop={0} fracBot={100} type="course" />);

        // Expect the progress to be 0%
        expect(getByText('0%')).toBeTruthy();
    });

    it('Displays 100% for full progress', () => {
        const { getByText } = render(<ProgressBar fracTop={100} fracBot={100} type="course" />);

        // Expect the progress to be 100%
        expect(getByText('100%')).toBeTruthy();
    });

    it('Limits display to 0% for negative progress', () => {
        const { getByText } = render(<ProgressBar fracTop={-50} fracBot={100} />);

        // Expect the progress to be 0%
        expect(getByText('0%')).toBeTruthy();
    });

    it('Limits display to 100% for excess progress', () => {
        const { getByText } = render(<ProgressBar fracTop={150} fracBot={100} />);

        // Expect the progress to be 100%
        expect(getByText('100%')).toBeTruthy();
    });
});