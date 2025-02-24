import { render, screen, waitFor } from '@testing-library/react';
import GamePage from './GamePage';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

// Mock the fetch function with Vitest
vi.mock('global', async () => ({
  fetch: vi.fn(),
}));

describe('GamePage Component', () => {
  it('renders game page correctly after successful fetch', async () => {
    const mockQuestions = [
      {
        id: 1,
        question: 'What is 2 + 2?',
        correct_answer: '4',
        answers: ['1', '2', '3', '4'],
      },
      {
        id: 2,
        question: 'What is the capital of France?',
        correct_answer: 'Paris',
        answers: ['Berlin', 'Paris', 'London', 'Madrid'],
      },
    ];

    // Make the fetch mock resolve with mock data
    vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockQuestions),
    });

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/game',
            state: {
              categories: ['Science', 'History'],
              difficulty: ['easy'],
              numQuestions: 10,
            },
          },
        ]}
      >
        <Routes>
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the fetch to complete and the content to be rendered
    await waitFor(() => {
      expect(screen.getByText(/score/i)).toBeInTheDocument();
    });
  });
});
