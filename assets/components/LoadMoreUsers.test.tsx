import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import LoadMoreUsers from "./LoadMoreUsers";

describe('<LoadMoreUsers/>', () => {
    it('renders the Load More Users button', () => {
        render(<LoadMoreUsers/>);
        expect(screen.getByText('Load More')).toBeInTheDocument();
    });
});