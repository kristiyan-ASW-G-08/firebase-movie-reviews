import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import UserEvent from '@testing-library/user-event';
import Movie from '.';

const type = 'movie';
const id = 1;
const movie = {
  poster_path: '',
  overview: 'Overview',
  title: 'Title',
  tagline: 'Tagline',
  revenue: 1000,
  runtime: 'runtime',
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    type,
    id,
  }),
}));
jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
}));

//@ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(movie),
  }),
);
//@ts-ignore
describe('Movie', () => {
  jest.setTimeout(30000);
  afterAll(() => jest.restoreAllMocks());
  it('renders', async () => {
    render(<Movie />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[`/${type}/item/${1}`]}>
          {children}
        </MemoryRouter>
      ),
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_TMDB}`,
    );

    Object.values((value: string) => {
      const item = screen.getByText(value);
      expect(item).toBeInTheDocument();
    });
  });
});
