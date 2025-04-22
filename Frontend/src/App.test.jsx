import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('renders headline', () => {
        render(<App />);
        expect(screen.getByText('Vite + React')).toBeInTheDocument();
    });

    it('renders the count button', () => {
        render(<App />);
        expect(screen.getByRole('button', { name: /count is \d+/i })).toBeInTheDocument();
    });

    it('has working links to Vite and React websites', () => {
        render(<App />);

        const viteLink = screen.getByRole('link', { name: /vite logo/i });
        expect(viteLink).toHaveAttribute('href', 'https://vite.dev');

        const reactLink = screen.getByRole('link', { name: /react logo/i });
        expect(reactLink).toHaveAttribute('href', 'https://react.dev');
    });
});