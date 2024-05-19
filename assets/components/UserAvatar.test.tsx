import React from 'react';
import { render, screen } from '@testing-library/react';
import UserAvatar from './UserAvatar';
import UserData from '../src/UserData';

describe('<UserAvatar/>', () => {
    it('renders the avatar with the correct props', () => {
        render(<UserAvatar user={ UserData } />);
        const img = screen.getByRole('img');
        expect(img.getAttribute('src')).toBe(UserData.avatar_url);
        expect(img.getAttribute('alt')).toBe(UserData.login);
        expect(img.getAttribute('title')).toBe(UserData.login);
    });
});