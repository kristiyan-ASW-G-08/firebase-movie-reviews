import MovieCard from '.';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('MovieCard', () => {
  it('renders', () => {
    const movie = {
      poster_math: 'sometext',
      title: 'title',
      overview: 'overview',
      id: 'id',
    };
    const type = 'movie';
    render(
      <BrowserRouter>
        <MovieCard movie={movie} type={type} />
      </BrowserRouter>,
    );

    const title = screen.getByText(movie.title);
    expect(title).toBeInTheDocument();

    const overview = screen.getByText(movie.overview);
    expect(overview).toBeInTheDocument();

    const link = screen.getByText('Leave a review');
    expect(link).toBeInTheDocument();
  });
});
