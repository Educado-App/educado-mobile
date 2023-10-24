import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import Explore from '../../../screens/explore/Explore';
import { getCourseList } from '../../../services/StorageService';

jest.mock('../../../services/StorageService', () => ({
    getCourseList: jest.fn(() => Promise.resolve([
        { title: 'Course 1', category: 'Finance' },
        { title: 'Course 2', category: 'Art' }
    ])),
}));

describe('Explore', () => {
    beforeEach(() => {
        getCourseList.mockClear();
    });

    it('displays courses when component mounts', async () => {
        const { findAllByText } = render(<Explore />);

        await waitFor(() => {
            expect(findAllByText(/Course/)).resolves.toHaveLength(2);
        });
    });

    it('filters courses based on search text', async () => {
        const { getByPlaceholderText, findAllByText } = render(<Explore />);

        await waitFor(() => {
            fireEvent.changeText(getByPlaceholderText('Buscar cursos'), 'Course 1');
            expect(findAllByText(/Course 1/)).resolves.toHaveLength(1);
        });
    });

    it('filters courses based on selected category', async () => {
        const { getByText, findAllByText } = render(<Explore />);

        await waitFor(() => {
            fireEvent.press(getByText('Finance'));
            expect(findAllByText(/Course 1/)).resolves.toHaveLength(1);
        });
    });
});
