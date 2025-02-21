import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

describe('LandingPage Component', () => {
  it('renders a header', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Welcome to the Trivia Quiz/i)).toBeInTheDocument();
  });

  it('renders categories correctly', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/select categories/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /music/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /sport & leisure/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /film & tv/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /arts & literature/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /history/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /society & culture/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /science/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /geography/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /general knowledge/i })).toBeInTheDocument();
  });

  it('renders a start button', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /Start New Game/i })).toBeInTheDocument();
  });
});
