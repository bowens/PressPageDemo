import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import UserName from './UserName';
import UserData from '../src/UserData';

describe('<UserName/>', () => {
    it('renders the card with the correct props', () => {
        render(<UserName user={ UserData } />);
        expect(screen.getByText(UserData.login)).toBeInTheDocument();

        const anchor = screen.getByRole('link');
        expect(anchor.getAttribute('href')).toBe(UserData.html_url);
        expect(anchor.getAttribute('title')).toBe("View " + UserData.login + " on GitHub");
    });
});