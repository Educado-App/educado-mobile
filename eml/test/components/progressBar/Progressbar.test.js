import React from 'react';
import { render } from '@testing-library/react-native';
import CustomProgressBar from '../../../components/exercise/Progressbar';

describe('<CustomProgressBar />', () => {

    it('Displays 50%', () => {
        const { getByText } = render(<CustomProgressBar progress={50} width={100} height={10} />);
        expect(getByText('50%')).toBeTruthy();
    });

    it('Displays 25%', () => {
        const { getByText } = render(<CustomProgressBar progress={25} width={100} height={10} />);
        expect(getByText('25%')).toBeTruthy();
    });

    it('Displays 0% for no progress', () => {
        const { getByText } = render(<CustomProgressBar progress={0} width={100} height={10} />);
        expect(getByText('0%')).toBeTruthy();
    });

    it('Displays 100% for full progress', () => {
        const { getByText } = render(<CustomProgressBar progress={100} width={100} height={10} />);
        expect(getByText('100%')).toBeTruthy();
    });

    it('Limits display to 0% for negative progress', () => {
        const { getByText } = render(<CustomProgressBar progress={-50} width={100} height={10} />);
        expect(getByText('0%')).toBeTruthy();
    });

    it('Limits display to 100% for excess progress', () => {
        const { getByText } = render(<CustomProgressBar progress={150} width={100} height={10} />);
        expect(getByText('100%')).toBeTruthy();
    });
});
