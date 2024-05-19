import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import DeleteUserButton from './DeleteUserButton';
import UserData from '../src/UserData';

describe('<DeleteUserButton/>', () => {
    it('renders the Delete User button', () => {
        render(<DeleteUserButton user={ UserData } />);
        expect(screen.getByText('Delete user')).toBeInTheDocument();
    });
});