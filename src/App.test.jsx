import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App Component', () => {
  it('renders the LandingPage by default', () => {
    render(<App />);

    // Check if some text from LandingPage appears
    expect(screen.getByText(/Trivia Quiz/i)).toBeInTheDocument();
    expect(screen.getByText(/categories/i)).toBeInTheDocument();
    expect(screen.getByText(/difficulties/i)).toBeInTheDocument();
    expect(screen.getByText(/Number of Questions/i)).toBeInTheDocument();
  });
});
