import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import UserEvent from '@testing-library/user-event';
import SignUpPage from '.';
jest.mock('firebase/firestore');

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
}));
describe('SignUpPage', () => {
  jest.setTimeout(30000);
  afterAll(() => jest.restoreAllMocks());
  it('renders', async () => {
    const movieId = 100;
    const { getByText } = render(<SignUpPage />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    const username = 'username@somusername.com';
    // eslint-disable-next-line testing-library/no-node-access
    const usernameInput = screen.getByTestId('username').querySelector('input');
    //@ts-ignore
    UserEvent.type(usernameInput, username);

    const email = 'email@somemail.com';
    // eslint-disable-next-line testing-library/no-node-access
    const emailInput = screen.getByTestId('email').querySelector('input');
    //@ts-ignore
    UserEvent.type(emailInput, email);

    const password = 'password';
    // eslint-disable-next-line testing-library/no-node-access
    const passwordInput = screen.getByTestId('password').querySelector('input');
    //@ts-ignore
    UserEvent.type(passwordInput, password);

    const signUpBUtton = screen.getByText('Sign Up');

    UserEvent.click(signUpBUtton);

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });
  });
});
