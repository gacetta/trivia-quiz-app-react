import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App Component', () => {
  it('renders the LandingPage by default', () => {
    render(<App />);

    // Check if some text from LandingPage appears
    expect(screen.getByText(/Welcome to the Trivia Quiz/i)).toBeInTheDocument();
    expect(screen.getByText(/select categories/i)).toBeInTheDocument();
    expect(screen.getByText(/select difficulty/i)).toBeInTheDocument();
    expect(screen.getByText(/Number of Questions/i)).toBeInTheDocument();
  });
});
