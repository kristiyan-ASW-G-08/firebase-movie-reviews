import Review from '.';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Review', () => {
  it('renders', () => {
    const review = {
      content: 'Content',
      authorName: 'Username',
    };
    render(
      <BrowserRouter>
        <Review review={review} />
      </BrowserRouter>,
    );

    const content = screen.getByText(review.content);
    expect(content).toBeInTheDocument();

    const authorName = screen.getByText(review.authorName);
    expect(authorName).toBeInTheDocument();

    const link = screen.getByText('Leave a review');
    expect(link).toBeInTheDocument();
  });
});
