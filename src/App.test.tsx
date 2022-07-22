import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import getData from './utilities/getData';
import { BrowserRouter } from 'react-router-dom';

const getDataMock = getData as jest.MockedFunction<typeof getData>;
jest.mock('./utilities/getData');

describe('MovieCard', () => {
  it('renders', async () => {
    getDataMock.mockResolvedValue({
      results: [
        {
          poster_math: 'sometext',
          title: 'title',
          overview: 'overview',
          id: 123,
        },
      ],
    });
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    await waitFor( () => {
      const movie = screen.getByTestId(`id-123`);
      expect(movie).toBeInTheDocument();
    });
  });
});
